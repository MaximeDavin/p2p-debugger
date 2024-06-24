import useSWR from "swr";

import { NodeService } from "@/client";
import { Client } from "@/types";

const getVersionFetcher = ({ url }: Client) =>
  NodeService.getNodeVersion({
    baseUrl: url,
  }).then((r) => r.data?.data);

const getAllVersionFetcher = (clients: Client[]) => {
  return Promise.allSettled(clients.map((client) => getVersionFetcher(client)));
};

export function useAllVersion(clients: Client[], refreshInterval: number) {
  const { data, error, isLoading } = useSWR(
    ["version", ...clients],
    () => getAllVersionFetcher(clients),
    { revalidateOnFocus: true, revalidateIfStale: false, refreshInterval }
  );
  return {
    data,
    error,
    isLoading,
  };
}
