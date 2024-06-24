import { Card, CardSection, Group, Stack, Title } from "@mantine/core";

import { BeaconNode } from "@/types";

import Field from "./field";
import Peers from "./peers";
import PeersCounter from "./peersCounter";

export interface Client {
  CLName: string;
  CLUrl: string;
}

interface NodeProps {
  node: BeaconNode;
}

export default function Node({
  node: {
    name,
    url,
    discoveryAddresses,
    enr,
    p2pAddresses,
    peerId,
    version,
    peers,
  },
}: NodeProps) {
  return (
    <Card withBorder shadow="sm" radius="md">
      <CardSection withBorder inheritPadding py="xs">
        <Group justify="space-between" wrap="nowrap">
          <Stack gap={"xs"}>
            <Title order={4} fw={700}>
              {name}
            </Title>
            <Title order={5} fw={400} c="dimmed">
              {url}
            </Title>
          </Stack>
          <PeersCounter peers={peers} />
        </Group>
      </CardSection>
      <CardSection withBorder inheritPadding py="xs">
        <Field name="Version" value={version} />
        <Field name="PeerID" value={peerId} />
        <Field name="ENR" value={enr} />
        <Field name="Discovery addresses" valueList={discoveryAddresses} />
        <Field name="P2P addresses" valueList={p2pAddresses} />
      </CardSection>
      <CardSection withBorder inheritPadding py="xs">
        <Peers peers={peers} />
      </CardSection>
    </Card>
  );
}
