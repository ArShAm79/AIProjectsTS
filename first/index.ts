import { readFileSync } from "fs";

type Edge = {
  src: number;
  dest: number;
};

type Graph = {
  length: number;
  edges: number[][];
};

const createGraph = (length: number, edges: Edge[]): Graph => {
  const graph: Graph = {
    length,
    edges: Array(length).fill([]),
  };

  for (let i = 0; i < edges.length; i++) {
    const element = edges[i];
    graph.edges[element.src] = [...graph.edges[element.src], element.dest];
    graph.edges[element.dest] = [...graph.edges[element.dest], element.src];
  }

  return graph;
};

const isBipartite = (graph: Graph) => {
  const visited = Array(graph.length).fill(null);

  const color = Array(graph.length).fill(0);

  let src = 0;
  let numbers: number[] = [];
  visited[src] = true;
  color[src] = false;

  numbers.push(src);
  while (numbers.length) {
    src = numbers.pop()!;

    for (let i = 0; i < graph.edges[src].length; i++) {
      const element = graph.edges[src][i];

      if (!visited[element]) {
        visited[element] = true;

        color[element] = color[src] + 1;

        numbers = [element, ...numbers];
      } else if (color[src] == color[element]) {
        return false;
      }
    }
  }
  return true;
};

const readFile = (address: string) => {
  const data = readFileSync("mockData/" + address, "utf8");
  const nodes = data.split("\n").map((item) => {
    const nodes = item.split(" ");
    return { src: parseInt(nodes[0]), dest: parseInt(nodes[1]) };
  });

  return nodes;
};

const Index = async () => {
  [
    "graph1.edgelist",
    "graph2.edgelist",
    "graph3.edgelist",
    "graph4.edgelist",
    "graph5.edgelist",
  ].forEach((item) => {
    const edges = readFile(item);

    const n = edges.length + 1;

    const graph = createGraph(n, edges);
    if (isBipartite(graph)) {
      console.log("Graph is Bipartite");
    } else {
      console.log("Graph is not Bipartite");
    }
  });
};
Index();
