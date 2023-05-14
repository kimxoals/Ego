//https://www.youtube.com/watch?v=y7DxbW9nwmo
// https://github.com/d3/d3/blob/main/API.md#forces-d3-force
import React, { useState } from "react";
import * as d3 from "d3";

export function GraphPractice(props) {
  const nodes = [{ id: "Alice" }, { id: "Bob" }, { id: "Carol" }];
  const links = [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
  ];

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
    .attr("r", radius);

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

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody().strength(-150))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .call(
      d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform);
      })
    );

  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value));

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 12)
    .attr("fill", color)
    .call(drag(simulation));

  const label = svg
    .append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("class", (d) => `fa ${getClass(d)}`)
    .text((d) => {
      return icon(d);
    })
    .call(drag(simulation));

  label
    .on("mouseover", (d) => {
      addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
    })
    .on("mouseout", () => {
      removeTooltip();
    });

  simulation.on("tick", () => {
    //update link positions
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    // update node positions
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    // update label positions
    label
      .attr("x", (d) => {
        return d.x;
      })
      .attr("y", (d) => {
        return d.y;
      });
  });

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    },
  };
}
