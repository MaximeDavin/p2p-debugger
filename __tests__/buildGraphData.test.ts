import { BeaconNode, GraphData } from "@/types";
import { buildGraphData } from "@/utils/buildGraphData";

test("build empty graph when no nodes", () => {
  expect(buildGraphData([])).toHaveLength(0);
});

test("build simple graph", () => {
  const nodes: BeaconNode[] = [
    {
      name: "node 1",
      url: "url 1",
      peerId: "id 1",
      enr: "enr 1",
      p2pAddresses: ["p2paddr 1"],
      discoveryAddresses: ["discaddr 1"],
      version: "v1",
      peers: [
        {
          direction: "inbound",
          state: "connected",
          enr: "enr peer 1",
          lastSeenP2pAddress: "addr peer 1",
          peerId: "id peer 1",
        },
        {
          direction: "outbound",
          state: "disconnected",
          enr: "enr peer 2",
          lastSeenP2pAddress: "addr peer 2",
          peerId: "id peer 2",
        },
      ],
    },
    {
      name: "node 2",
      url: "url 2",
      peerId: "id 2",
      enr: "enr 2",
      p2pAddresses: ["p2paddr 2"],
      discoveryAddresses: ["discaddr 2"],
      version: "v2",
      peers: [
        {
          direction: "inbound",
          state: "connecting",
          enr: "enr peer 3",
          lastSeenP2pAddress: "addr peer 3",
          peerId: "id peer 3",
        },
        {
          direction: "outbound",
          state: "disconnecting",
          enr: "enr peer 4",
          lastSeenP2pAddress: "addr peer 4",
          peerId: "id peer 4",
        },
      ],
    },
  ];

  const expectedResult: GraphData = [
    { data: { id: "id 1", name: "node 1" } },
    { data: { id: "id peer 1", name: "" } },
    { data: { id: "id peer 2", name: "" } },
    { data: { id: "id 2", name: "node 2" } },
    { data: { id: "id peer 3", name: "" } },
    { data: { id: "id peer 4", name: "" } },
    {
      data: { source: "id 1", target: "id peer 1" },
      classes: "connected inbound",
    },
    {
      data: { source: "id 1", target: "id peer 2" },
      classes: "disconnected outbound",
    },
    {
      data: { source: "id 2", target: "id peer 3" },
      classes: "connecting inbound",
    },
    {
      data: { source: "id 2", target: "id peer 4" },
      classes: "disconnecting outbound",
    },
  ];

  const result = buildGraphData(nodes);

  expect(result).toStrictEqual(expectedResult);
});
