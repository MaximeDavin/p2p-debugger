import { Group, rem, Table, TableTbody, TableTd, TableTr } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconPlugConnected,
  IconPlugOff,
} from "@tabler/icons-react";
import { useMemo } from "react";

import { NodePeer } from "@/types";

interface PeersCount {
  connected?: number;
  connecting?: number;
  disconnected?: number;
  disconnecting?: number;
}

interface PerDirectionPeersCounterProps {
  direction: NodePeer["direction"];
  peersCount: PeersCount;
}

function PerDirectionPeersCounter({
  direction,
  peersCount: { connected, connecting, disconnected, disconnecting },
}: PerDirectionPeersCounterProps) {
  return (
    <TableTr>
      <TableTd>
        {direction === "inbound" ? (
          <IconArrowDown
            title={direction}
            style={{
              color: "var(--mantine-color-blue-6",
              width: rem(20),
              height: rem(20),
            }}
          />
        ) : (
          <IconArrowUp
            title={direction}
            style={{
              color: "var(--mantine-color-blue-6",
              width: rem(20),
              height: rem(20),
            }}
          />
        )}
      </TableTd>
      <TableTd>
        <Group wrap="nowrap" gap={"xs"}>
          <IconPlugConnected
            title="Connected"
            style={{
              color: "var(--mantine-color-green-6",
              width: rem(20),
              height: rem(20),
            }}
          />
          {connected ?? "-"}
        </Group>
      </TableTd>
      <TableTd>
        <Group wrap="nowrap">
          <IconPlugConnected
            title="Connecting"
            style={{
              color: "var(--mantine-color-orange-6",
              width: rem(20),
              height: rem(20),
            }}
          />
          {connecting ?? "-"}
        </Group>
      </TableTd>
      <TableTd>
        <Group wrap="nowrap">
          <IconPlugOff
            title="Disconnecting"
            style={{
              color: "var(--mantine-color-orange-6",
              width: rem(20),
              height: rem(20),
            }}
          />
          {disconnecting ?? "-"}
        </Group>
      </TableTd>
      <TableTd>
        <Group wrap="nowrap">
          <IconPlugOff
            title="Disconnected"
            style={{
              color: "var(--mantine-color-red-6",
              width: rem(20),
              height: rem(20),
            }}
          />
          {disconnected ?? "-"}
        </Group>
      </TableTd>
    </TableTr>
  );
}

interface PeersCounterProps {
  peers: NodePeer[];
}

export default function PeersCounter({ peers }: PeersCounterProps) {
  const { inbound, outbound } = useMemo(() => {
    const {
      inbound_connected,
      inbound_connecting,
      inbound_disconnected,
      inbound_disconnecting,
      outbound_connected,
      outbound_connecting,
      outbound_disconnected,
      outbound_disconnecting,
    } = Object.groupBy(
      peers,
      ({ direction, state }) => `${direction}_${state}`
    );
    return {
      inbound: {
        connected: inbound_connected?.length,
        connecting: inbound_connecting?.length,
        disconnected: inbound_disconnected?.length,
        disconnecting: inbound_disconnecting?.length,
      },
      outbound: {
        connected: outbound_connected?.length,
        connecting: outbound_connecting?.length,
        disconnected: outbound_disconnected?.length,
        disconnecting: outbound_disconnecting?.length,
      },
    };
  }, [peers]);

  return (
    <Table horizontalSpacing="xs" style={{ width: "0%" }}>
      <TableTbody>
        <PerDirectionPeersCounter
          direction="inbound"
          peersCount={inbound}
          key="inbound"
        />
        <PerDirectionPeersCounter
          direction="outbound"
          peersCount={outbound}
          key="outbound"
        />
      </TableTbody>
    </Table>
  );
}
