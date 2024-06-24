import useSWR from "swr";

import { NodeService } from "@/client";
import { Client } from "@/types";

const getNetworkIdentityFetcher = ({ url }: Client) =>
  NodeService.getNetworkIdentity({
    baseUrl: url,
  }).then((r) => r.data?.data);

const getAllNetworkIdentityFetcher = (clients: Client[]) => {
  return Promise.allSettled(
    clients.map((client) => getNetworkIdentityFetcher(client))
  );
};

export function useAllNetworkIdentity(
  clients: Client[],
  refreshInterval: number
) {
  const { data, error, isLoading } = useSWR(
    ["networkIdentity", ...clients],
    () => getAllNetworkIdentityFetcher(clients),
    { revalidateOnFocus: true, revalidateIfStale: false, refreshInterval }
  );
  return {
    data,
    error,
    isLoading,
  };
}
