import * as d3 from "d3";
const nodes = [{ id: "Alice" }, { id: "Bob" }, { id: "Carol" }];
const links = [
  { source: 0, target: 1 },
  { source: 1, target: 2 },
];
function GraphPractice() {
  const svg = d3.select("#container");
  //   const width = +svg.attr("width");
  //   const height = +svg.attr("height");
  const centerX = 400;
  const centerY = 400;

  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(links))
    .force("center", d3.forceCenter(centerX, centerY));

  const circles = svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 20);

  simulation.on("tick", () => {
    circles.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
  });
}

export default GraphPractice;
