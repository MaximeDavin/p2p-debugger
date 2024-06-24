import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

import { NetworkIdentity, Peer, Version } from "@/client";
import { useAllNetworkIdentity } from "@/hooks/useAllNetworkIdentity";
import { useAllPeers } from "@/hooks/useAllPeers";
import { useAllVersion } from "@/hooks/useAllVersion";
import { BeaconNode, Client, NodePeer } from "@/types";

const buildNodePeer = ({
  direction,
  enr,
  last_seen_p2p_address,
  peer_id,
  state,
}: Peer): NodePeer => ({
  peerId: peer_id ?? "",
  enr: enr ?? "",
  lastSeenP2pAddress: last_seen_p2p_address ?? "",
  state: state ?? "disconnected",
  direction: direction ?? "inbound",
});

const buildNode = (
  { name, url }: Client,
  { peer_id, enr, p2p_addresses, discovery_addresses }: NetworkIdentity,
  versionData: Version,
  peerData: Peer[]
): BeaconNode => ({
  name,
  url,
  peerId: peer_id ?? "",
  enr: enr ?? "",
  p2pAddresses: p2p_addresses ?? [],
  discoveryAddresses: discovery_addresses ?? [],
  version: versionData,
  peers: peerData.map((p) => buildNodePeer(p)),
});

export function useAllData(clients: Client[], refresh_interval = 0) {
  const {
    data: identityData,
    isLoading: identityIsLoading,
    error: identityError,
  } = useAllNetworkIdentity(clients, refresh_interval);

  const {
    data: peerData,
    isLoading: peerIsLoading,
    error: peerError,
  } = useAllPeers(clients, refresh_interval);

  const {
    data: versionData,
    isLoading: versionIsLoading,
    error: versionError,
  } = useAllVersion(clients, refresh_interval);

  const isLoading = identityIsLoading || peerIsLoading || versionIsLoading;
  const error = identityError || peerError || versionError;

  const [nodes, setNodes] = useState<BeaconNode[]>([]);
  useEffect(() => {
    if (identityData && versionData && peerData) {
      const nodes: BeaconNode[] = [];
      clients.forEach((client, index) => {
        if (
          identityData[index].status === "fulfilled" &&
          versionData[index].status === "fulfilled" &&
          peerData[index].status === "fulfilled"
        ) {
          const identity = identityData[index].value;
          const version = versionData[index].value?.version;
          const peers = peerData[index].value;
          if (identity && version && peers) {
            const node = buildNode(client, identity, version, peers);
            nodes.push(node);
          }
        } else {
          notifications.show({
            id: `${index}`,
            title: "Error while fetching data",
            message: `Cannot fetch data for node ${client.name}`,
            color: "red",
          });
        }
      });
      setNodes(nodes);
    }
  }, [identityData, peerData, versionData, clients]);

  return {
    nodes,
    isLoading,
    error,
  };
}
