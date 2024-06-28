import ems from "enhanced-ms";
import { parse } from "yaml";

import { Config, UnverifiedConfig } from "@/types";

export const defaultConfig: Config = {
  chain_name: "MainNet",
  reload_interval: 10000,
  clients: [],
};

export const parseConfig = (configData: string): Config => {
  try {
    const yamlData = parse(configData);
    const config = yamlData as UnverifiedConfig;
    return verifyConfig(config);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const verifyConfig = (unverifiedConfig: UnverifiedConfig): Config => {
  if (!unverifiedConfig) {
    throw new Error("Configuration error: config file empty");
  }
  const config = { ...defaultConfig };

  if (unverifiedConfig.chain_name)
    config.chain_name = unverifiedConfig.chain_name;

  if (unverifiedConfig.reload_interval)
    config.reload_interval = ems(unverifiedConfig.reload_interval);

  if (!Array.isArray(unverifiedConfig.clients)) {
    throw new Error("Configuration error: clients must be an array.");
  }

  if (!unverifiedConfig.clients) {
    throw new Error(
      "Configuration error: clients array is empty or not defined."
    );
  }
  unverifiedConfig.clients.forEach((client, index) => {
    if (!client.name || !client.url) {
      throw new Error(
        `Configuration error: client invalid at index ${index} (must have 'name' and 'url').`
      );
    }
  });
  config.clients = unverifiedConfig.clients;
  return config;
};
