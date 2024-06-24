import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Group,
  Stack,
  Title,
} from "@mantine/core";

import { NodePeer } from "@/types";

import Field from "./field";
import PeerDirectionIcon from "./peerDirectionIcon";
import PeerStatusIcon from "./peerStatusIcon";

interface PeerProps {
  peer: NodePeer;
}

function Peer({
  peer: { peerId, lastSeenP2pAddress, state, direction },
}: PeerProps) {
  return (
    <Group wrap="nowrap">
      <Group wrap="nowrap">
        <PeerDirectionIcon direction={direction} />
        <PeerStatusIcon status={state} />
      </Group>
      {/* minWidth prevent flexbox to be larger than its parent */}
      <Stack gap={0} styles={{ root: { minWidth: 0 } }}>
        <Field value={peerId} />
        <Field value={lastSeenP2pAddress} />
      </Stack>
    </Group>
  );
}

interface PeersProps {
  peers: NodePeer[];
}

export default function Peers({ peers }: PeersProps) {
  return (
    <Accordion chevronPosition="left">
      <AccordionItem value="peers">
        <AccordionControl>
          <Group justify="space-between">
            <Title order={6} fw={600}>
              Peers
            </Title>
          </Group>
        </AccordionControl>
        <AccordionPanel styles={{ content: { padding: 0 } }}>
          {/* <Table horizontalSpacing="xs" layout="auto" w={"10%"}> */}
          {/* <TableTbody> */}
          <Stack>
            {peers.map((peer) => (
              <Peer peer={peer} key={peer.peerId} />
            ))}
          </Stack>
          {/* </TableTbody> */}
          {/* </Table> */}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
