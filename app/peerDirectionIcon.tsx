import { rem } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

import { NodePeer } from "@/types";

interface PeerDirectionIconProps {
  direction: NodePeer["direction"];
}

export default function PeerDirectionIcon({
  direction,
}: PeerDirectionIconProps) {
  if (direction === "inbound")
    return (
      <IconArrowDown
        title={direction}
        style={{
          color: "var(--mantine-color-blue-6",
          width: rem(20),
          height: rem(20),
        }}
      />
    );
  else
    return (
      <IconArrowUp
        title={direction}
        style={{
          color: "var(--mantine-color-blue-6",
          width: rem(20),
          height: rem(20),
        }}
      />
    );
}
