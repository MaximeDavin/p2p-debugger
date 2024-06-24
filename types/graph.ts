export type GraphNode = { data: { id: string; name: string } };

export type GraphLink = {
  data: {
    source: string;
    target: string;
  };
  classes: string;
};

export type GraphData = (GraphNode | GraphLink)[];
