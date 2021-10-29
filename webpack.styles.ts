import { promises as fsPromises } from "fs";
import path from "path";

import glob from "glob";
import { Compilation, Compiler } from "webpack";

export class OnShouldEmitPlugin {
  constructor(private fn: (compilation: Compilation) => boolean) {}

  apply(compiler: Compiler) {
    compiler.hooks.shouldEmit.tap(this.constructor.name, this.fn);
  }
}

export function getCssRules(
  isProd: boolean,
  exportOnlyLocals: boolean = false
) {
  return [
    {
      test: /\.s?css$/,
      use: {
        loader: "css-loader",
        options: {
          sourceMap: isProd,
          modules: {
            localIdentContext: path.resolve(__dirname, "src"),
            localIdentName: isProd
              ? "[local]__[contenthash:base64:5]"
              : "[path][name]_[local]",
            exportLocalsConvention: "camelCase",
            exportOnlyLocals,
          },
        },
      },
    },
    {
      test: /\.scss$/,
      use: {
        loader: "sass-loader",
        options: {
          sourceMap: isProd,
          sassOptions: {
            fiber:
              Number(process.versions.node.split(".")[0]) >= 16
                ? false
                : // this option does not support `true` as a value
                  undefined,
            includePaths: ["./"],
          },
        },
      },
    },
  ];
}

export default {
  entry: glob.sync("./src/**/*.{css,scss}"),
  mode: "none",
  plugins: [
    new OnShouldEmitPlugin((compilation: Compilation) => {
      // write the s?css type files
      Array.from(compilation.modules)
        .filter((mod: any) => mod._source?._value)
        .map((mod: any) =>
          fsPromises.writeFile(`${mod.resource}.d.ts`, mod._source._value)
        );

      // prevent output of default js assets
      return false;
    }),
  ],
  stats: {
    cached: false,
    cachedAssets: false,
    children: false,
  },
  module: {
    rules: getCssRules(false, true),
  },
};
