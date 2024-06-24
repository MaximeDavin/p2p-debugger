export interface NodePeer {
  peerId: string;
  enr: string;
  lastSeenP2pAddress: string;
  state: "disconnected" | "connecting" | "connected" | "disconnecting";
  direction: "inbound" | "outbound";
}
