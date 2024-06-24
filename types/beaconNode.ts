import { NodePeer } from "./nodePeer";

export interface BeaconNode {
  name: string;
  url: string;
  peerId: string;
  enr: string;
  p2pAddresses: string[];
  discoveryAddresses: string[];
  version: string;
  peers: NodePeer[];
}
