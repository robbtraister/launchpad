#!/usr/bin/env npx ts-node

import https from "https";
import path from "path";

import compression from "compression";
import express from "express";

import { createApp } from "./app";
import { createCertificate } from "./cert";

function createServer(port = Number(process.env.PORT) || 8080) {
  const app = express();

  app.disable("x-powered-by");

  app.use(compression());

  app.get("/health-check", (req, res) => {
    res.send(`{"status":"healthy"}`);
  });

  app.use(express.static(path.resolve(__dirname, "..", "..", "docs")));
  app.use(express.static(path.resolve(__dirname, "..", "..", "public")));

  app.use(createApp());

  // serve the index page to any other request (to enable client-side routing)
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "..", "docs", "index.html"));
  });

  const tokens = createCertificate();
  const key = tokens.private + tokens.cert;

  return https.createServer({ key, cert: key }, app).listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port: ${port}`);
  });
}

if (module === require.main) {
  createServer();
}
