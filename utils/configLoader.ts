import ems from "enhanced-ms";

import { Config, UnverifiedConfig } from "@/types";

export const defaultConfig: Config = {
  chain_name: "MainNet",
  reload_interval: 10000,
  clients: [],
};

export const verifyConfig = (unverifiedConfig: UnverifiedConfig): Config => {
  if (!unverifiedConfig) {
    throw new Error("Configuration: config file empty");
  }
  const config = { ...defaultConfig };

  if (unverifiedConfig.chain_name)
    config.chain_name = unverifiedConfig.chain_name;

  if (unverifiedConfig.reload_interval)
    config.reload_interval = ems(unverifiedConfig.reload_interval);

  if (!unverifiedConfig.clients) {
    throw new Error("Configuration: clients array is empty or not defined.");
  }
  unverifiedConfig.clients.forEach((client, index) => {
    if (!client.name || !client.url) {
      throw new Error(
        `Configuration: client invalid at index ${index} (must have 'name' and 'url').`
      );
    }
  });
  config.clients = unverifiedConfig.clients;
  return config;
};
