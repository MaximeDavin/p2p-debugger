"use client";
import { Paper } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import cytoscape from "cytoscape";
// @ts-ignore
import avsdf from "cytoscape-avsdf";
import { useMemo } from "react";
import CytoscapeComponent from "react-cytoscapejs";

import { BeaconNode, GraphData } from "@/types";
import { buildGraphData } from "@/utils/buildGraphData";

// Load layout extension
cytoscape.use(avsdf);

interface GraphProbs {
  nodes: BeaconNode[];
}

export default function Graph({ nodes }: GraphProbs) {
  const graphData: GraphData = useMemo(() => buildGraphData(nodes), [nodes]);

  const { width } = useViewportSize();

  return (
    <Paper shadow="xs" withBorder p="xl">
      <CytoscapeComponent
        cy={(cy) => {
          cy.layout({ name: "avsdf" }).run();
        }}
        wheelSensitivity={0.4}
        elements={graphData}
        style={{ width: width - 80, height: 800 }}
        stylesheet={[
          {
            selector: "node",
            style: {
              width: 10,
              height: 10,
              label: "data(name)",
            },
          },
          {
            selector: ".outbound",
            style: {
              "mid-target-arrow-shape": "chevron",
            },
          },
          {
            selector: ".inbound",
            style: {
              "mid-source-arrow-shape": "chevron",
            },
          },
          {
            selector: "edge",
            style: {
              width: 2,
              "curve-style": "bezier",
            },
          },
          {
            selector: ".connected",
            style: {
              "line-color": "green",
              "line-style": "solid",
              "mid-target-arrow-color": "green",
              "mid-source-arrow-color": "green",
            },
          },
          {
            selector: ".connecting",
            style: {
              "line-color": "green",
              "line-style": "dashed",
              "mid-target-arrow-color": "green",
              "mid-source-arrow-color": "green",
            },
          },
          {
            selector: ".disconnected",
            style: {
              "line-color": "red",
              "line-style": "solid",
              "mid-target-arrow-color": "red",
              "mid-source-arrow-color": "red",
            },
          },
          {
            selector: ".disconnecting",
            style: {
              "line-color": "red",
              "line-style": "dashed",
              "mid-target-arrow-color": "red",
              "mid-source-arrow-color": "red",
            },
          },
        ]}
      />
    </Paper>
  );
}
