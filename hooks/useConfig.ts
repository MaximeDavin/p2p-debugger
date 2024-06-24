import { UnverifiedConfig } from "@/types";
import { verifyConfig, defaultConfig } from "@/utils/configLoader";
import useSWR from "swr";

export const fetchConfig = async () => {
  const data = await fetch("config.json", { method: "GET" });
  const jsonData = await data.json();
  const config = jsonData as UnverifiedConfig;
  return verifyConfig(config);
};

export function useConfig() {
  const { data } = useSWR("config", fetchConfig);

  return { config: data ? data : defaultConfig, isLoading: !data };
}
