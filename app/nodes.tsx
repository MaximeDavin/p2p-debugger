import { SimpleGrid } from "@mantine/core";

import { BeaconNode } from "@/types";

import Node from "./node";

interface NodesProbs {
  nodes: BeaconNode[];
}

export default function Nodes({ nodes }: NodesProbs) {
  return (
    <SimpleGrid cols={{ xs: 1, md: 2, xl: 3 }}>
      {nodes.map((node) => (
        <Node node={node} key={node.peerId} />
      ))}
    </SimpleGrid>
  );
}
