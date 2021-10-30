import path from "path";

import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackTagsPlugin from "html-webpack-tags-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";

import {
  Configuration,
  DefinePlugin,
  DllReferencePlugin,
  WebpackPluginInstance,
} from "webpack";

import { name, version } from "./package.json";
import { getCssRules } from "./webpack.styles";
import { getIsProd, getVendorRules } from "./webpack.vendors";

export default function getConfig(
  env: Partial<Record<string, string>>,
  arg: { mode: string }
): Configuration {
  const isProd = getIsProd(arg.mode);

  const port = Number(env.PORT) || Number(process.env.PORT) || 443;
  const publicPath = (env.PUBLIC_PATH || process.env.PUBLIC_PATH || name)
    .replace(/^\/*/, "/")
    .replace(/\/*$/, "/");

  return {
    entry: "./src",
    mode: isProd ? "production" : "development",
    module: {
      rules: [
        ...getVendorRules(isProd),
        {
          test: /\.s?css$/,
          use: [
            isProd
              ? {
                  loader: MiniCssExtractPlugin.loader,
                }
              : "style-loader",
          ],
        },
        ...getCssRules(isProd),
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: "@svgr/webpack",
        },
      ],
    },
    optimization: {
      minimize: isProd,
      minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
      splitChunks: {
        chunks: "async",
      },
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath,
    },
    plugins: [
      new DefinePlugin({
        "process.env.PUBLIC_PATH": JSON.stringify(publicPath),
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          enabled: true,
          files: ["src/**/*.{ts,tsx}"],
          options: {
            overrideConfig: {
              ignorePatterns: [
                "**/*.scss.d.ts",
                "**/*.stories.ts",
                "**/*.stories.tsx",
                "**/*.test.ts",
                "**/*.test.tsx",
              ],
            },
          },
        },
        logger: {
          devServer: false,
        },
        typescript: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
          configOverwrite: {
            include: ["./src/**/*", "./src/**/*.json"],
            exclude: [
              "**/*.stories.ts",
              "**/*.stories.tsx",
              "**/*.test.ts",
              "**/*.test.tsx",
            ],
          },
        },
      }),
      new HtmlWebpackPlugin({
        minify: isProd,
        scriptLoading: "defer",
        template: "./src/index.html",
        title: name,
        version,
      }),
      isProd &&
        new HtmlWebpackPlugin({
          filename: "404.html",
          minify: false,
          publicPath,
          scriptLoading: "defer",
          template: "./src/redirect.html",
          title: name,
          version,
        }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
          chunkFilename: "[name].[contenthash].css",
        }),
      !isProd &&
        // because the `vendors.js` artifact is built separately, HtmlWebpackPlugin doesn't know about it
        // HtmlWebpackTagsPlugin manually injects a <script src="/vendors.js"> tag into the index.html artifact
        new HtmlWebpackTagsPlugin({
          tags: ["./.dev/vendors.js"],
          append: false,
        }),
      !isProd &&
        new DllReferencePlugin({
          context: __dirname,
          manifest: require("./public/.dev/vendors-manifest.json"),
        }),
    ].filter(Boolean) as WebpackPluginInstance[],
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".mjs", ".js", ".json"],
      plugins: [
        new TsconfigPathsWebpackPlugin({
          configFile: path.resolve(__dirname, "tsconfig.json"),
        }),
      ],
    },
    devServer: {
      compress: true,
      historyApiFallback: {
        index: publicPath,
      },
      https: true,
      open: publicPath,
      port,
      static: {
        publicPath,
      },
      watchFiles: "src/**/*",
    },
  };
}
