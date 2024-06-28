import { UnverifiedConfig } from "@/types";
import { parseConfig, defaultConfig } from "@/utils/configLoader";
import useSWR from "swr";

export const fetchConfig = async () => {
  const data = await fetch("config.yaml", { method: "GET" });
  if (!data.ok) throw Error(`Configuration error: ${data.statusText}`);
  const configData = await data.text();
  return parseConfig(configData);
};

export function useConfig() {
  const { data, error } = useSWR("config", fetchConfig);
  return { config: data ? data : defaultConfig, isLoading: !data, error };
}
