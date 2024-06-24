import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "./beacon-node-oapi.yaml",
  output: {
    format: "prettier",
    lint: "eslint",
    path: "./client",
  },
  services: {
    asClass: true,
  },
});
