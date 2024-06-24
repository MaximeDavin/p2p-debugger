import { Client } from "./client";

export interface Config {
  reload_interval: number;
  // Shown in the document title, if specified
  chain_name: string;
  clients: Client[];
}

export interface UnverifiedConfig {
  reload_interval: string;
  chain_name: string;
  clients: Client[];
}
