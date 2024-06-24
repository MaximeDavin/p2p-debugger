"use client";

import { LoadingOverlay } from "@mantine/core";

import { useAllData, useConfig } from "@/hooks";

import Graph from "./graph";
import Nodes from "./nodes";

export default function MainContainer() {
  const {
    config: { clients, reload_interval },
    isLoading,
  } = useConfig();

  const { nodes } = useAllData(clients, reload_interval);

  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Nodes nodes={nodes} />
      <Graph nodes={nodes} />
    </>
  );
}
