import { BeaconNode, GraphData, GraphLink, GraphNode } from "@/types";

export const buildGraphData = (nodes: BeaconNode[]): GraphData => {
  const graphNodes: GraphNode[] = [];
  const graphLinks: GraphLink[] = [];
  nodes.forEach(({ peerId: id, peers, name }) => {
    graphNodes.push({ data: { id, name } });
    peers.forEach(({ peerId, direction, state }) => {
      graphNodes.push({
        data: { id: peerId, name: "" }, // TODO: find a good short value for name
      });
      graphLinks.push({
        data: {
          source: id,
          target: peerId,
        },
        classes: `${state} ${direction}`,
      });
    });
  });
  return [...graphNodes, ...graphLinks];
};
