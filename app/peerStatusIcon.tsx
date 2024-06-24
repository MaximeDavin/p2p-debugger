import { rem } from "@mantine/core";
import { IconPlugConnected, IconPlugOff } from "@tabler/icons-react";

import { NodePeer } from "@/types";

interface PeerStatusIconProps {
  status: NodePeer["state"];
}

export default function PeerStatusIcon({ status }: PeerStatusIconProps) {
  if (status === "connected" || status === "connecting")
    return (
      <IconPlugConnected
        title={status}
        style={{
          color: `var(--mantine-color-${
            status === "connected" ? "green" : "orange"
          }-6`,
          width: rem(20),
          height: rem(20),
        }}
      />
    );
  if (status === "disconnected" || status === "disconnecting")
    return (
      <IconPlugOff
        title={status}
        style={{
          color: `var(--mantine-color-${
            status === "disconnected" ? "red" : "orange"
          }-6`,
          width: rem(20),
          height: rem(20),
        }}
      />
    );
}
