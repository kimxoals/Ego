//https://www.youtube.com/watch?v=y7DxbW9nwmo
// https://github.com/d3/d3/blob/main/API.md#forces-d3-force

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
    .attr("r", 10);

  const lines = svg
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke", "black");

  simulation.on("tick", () => {
    circles.attr("cx", (node) => node.x).attr("cy", (node) => node.y);
    lines.attr("x1", (link) => link.source.x);
    lines.attr("y1", (link) => link.source.y);
    lines.attr("x2", (link) => link.target.x);
    lines.attr("y2", (link) => link.target.y);
  });
}

export default GraphPractice;
