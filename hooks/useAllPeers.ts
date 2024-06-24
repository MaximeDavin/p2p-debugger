import useSWR from "swr";

import { NodeService } from "@/client";
import { Client } from "@/types";

const getPeersFetcher = ({ url }: Client) =>
  NodeService.getPeers({
    baseUrl: url,
  }).then((r) => r.data?.data);

const getAllPeersFetcher = (clients: Client[]) => {
  return Promise.allSettled(clients.map((client) => getPeersFetcher(client)));
};

export function useAllPeers(clients: Client[], refreshInterval: number) {
  const { data, error, isLoading } = useSWR(
    ["peers", ...clients],
    () => getAllPeersFetcher(clients),
    { revalidateOnFocus: true, revalidateIfStale: false, refreshInterval }
  );
  return {
    data,
    error,
    isLoading,
  };
}
