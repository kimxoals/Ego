import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Graph = () => {
  const svgRef = useRef(null);
  const nodes = [];
  const links = [];

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Add the nodes
    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "blue")
      .call(drag());

    // Add the edges
    const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "gray")
      .attr("stroke-width", 2);
    let selectedNode = null;

    // Add a click handler to add new nodes
    svg.on("click", (event) => {
      console.log("Clicked on SVG");

      const newNode = {
        id: nodes.length + 1,
        x: event.offsetX,
        y: event.offsetY,
      };
      nodes.push(newNode);
      node
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("fill", "blue")
        .call(drag());
      if (event.target.nodeName === "circle") {
        const clickedNode = d3.select(event.target);
        if (!selectedNode) {
          selectedNode = clickedNode;
        } else {
          const newLink = {
            source: selectedNode.data()[0].id,
            target: clickedNode.data()[0].id,
          };
          links.push(newLink);
          link
            .data(links)
            .enter()
            .append("line")
            .attr("stroke", "gray")
            .attr("stroke-width", 2);
          selectedNode = null;
        }
      } else {
        selectedNode = null;
      }
    });

    // Add a click handler to add new edges
    // Define the drag behavior for the nodes
    function drag() {
      function dragstarted(event, d) {
        d3.select(this).raise().classed("active", true);
      }

      function dragged(event, d) {
        d.x = event.x;
        d.y = event.y;
        d3.select(this).attr("cx", d.x).attr("cy", d.y);
        link
          .filter((l) => l.source === d.id)
          .attr("x1", d.x)
          .attr("y1", d.y);
        link
          .filter((l) => l.target === d.id)
          .attr("x2", d.x)
          .attr("y2", d.y);
      }

      function dragended(event, d) {
        d3.select(this).classed("active", false);
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      style={{ display: "block" }}
    >
      <rect width="100%" height="100%" fill="grey" />
    </svg>
  );
};

export default Graph;
