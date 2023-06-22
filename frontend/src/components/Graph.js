import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import SVGImage from "../assets/house.svg";

const width = 800;
const height = 600;
const ImgHeight = 40;
const ImgWidth = 40;

const Graph = ({ nodes, setNodes, links, setLinks, selectedNode }) => {
  const svgRef = useRef(null);
  const simulationRef = useRef(null);
  const [selectedNodes, setSelectedNodes] = useState([]);

  useEffect(() => {
    // const width = svgRef?.current?.clientWidth;
    // const height = svgRef?.current?.clientHeight;
    // create a D3 simulation with a force-directed layout
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
          .strength(0)
      )
      .force("charge", d3.forceManyBody().distanceMax(200).strength(0))
      .force("collide", d3.forceCollide(20).iterations(10))
      // forceCollide(radius).iteration(increase to reduce jitter)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", () => {
        // update the positions of the nodes and links on each tick of the simulation
        nodesSelection.attr("x", (d) => d.x).attr("y", (d) => d.y);

        linksSelection
          .attr("x1", (d) => d.source.x + ImgWidth / 2)
          .attr("y1", (d) => d.source.y + ImgWidth / 2)
          .attr("x2", (d) => d.target.x + ImgHeight / 2)
          .attr("y2", (d) => d.target.y + ImgHeight / 2);
      });

    // save the simulation to a ref for later use
    simulationRef.current = simulation;

    // create a D3 selection for the nodes and links
    const svg = d3.select(svgRef.current);
    const linksSelection = svg
      .select(".links")
      .selectAll(".link")
      .data(links)
      .join("line")
      .attr("class", "link")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    const nodesSelection = svg
      .select(".nodes")
      .selectAll(".node")
      .data(nodes, (node) => node.id)
      .enter()
      .append("image")
      .attr("xlink:href", SVGImage)
      // .append("circle")
      // .join("circle")
      .attr("class", "node")
      .attr("id", (d) => d.id)
      .call(drag(simulation));

    nodesSelection.on("mouseover", (event) => {
      d3.select(event.target).style("fill", "red");
    });

    nodesSelection.on("mouseout", (event) => {
      d3.select(event.target).style("fill", "blue");
    });

    svg.on("click", (event) => {
      const targetNode = d3.select(event.target).node();

      if (targetNode.nodeName === "svg") {
        // Clicked on empty space

        const point = d3.pointer(event);
        const id = `node${nodes.length + 1}`;
        const newNode = {
          id: id,
          x: point[0] - ImgHeight / 2,
          y: point[1] - ImgWidth / 2,
          ped: Math.floor(Math.random() * 1000) / 1000,
        };
        setNodes([...nodes, newNode]);
        setSelectedNodes([]);
      } else if (targetNode.classList.contains("node")) {
        // Clicked on a node
        const nodeId = targetNode.id;

        if (selectedNodes.length === 0) {
          // First node selected
          setSelectedNodes([nodeId]);
        } else if (selectedNodes.length === 1 && selectedNodes[0] !== nodeId) {
          // Second node selected, create link if it doesn't exist
          const linkExists = links.some((link) => {
            return (
              (link.source.id === selectedNodes[0] &&
                link.target.id === nodeId) ||
              (link.source.id === nodeId && link.target.id === selectedNodes[0])
            );
          });

          if (!linkExists) {
            const newLink = { source: selectedNodes[0], target: nodeId };
            setLinks([...links, newLink]);
          }

          setSelectedNodes([]);
        } else {
          // Clicked on the same node again, reset selection
          setSelectedNodes([]);
        }
      }
    });

    // define a D3 drag behavior
    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        // Calculate the new coordinates based on the drag event
        // Confine the new coordinates within SVG size
        const newX = Math.max(0, Math.min(width - ImgWidth, d.x + event.dx));
        const newY = Math.max(0, Math.min(height - ImgHeight, d.y + event.dy));

        // Update the node's position
        d.fx = newX;
        d.fy = newY;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => {
      // stop the simulation and remove the nodes and links when the component unmounts
      simulation.stop();
      nodesSelection.remove();
      linksSelection.remove();
    };
  }, [nodes, links, selectedNodes, selectedNode]);

  return (
    <svg className="graph" ref={svgRef} width={width} height={height}>
      <g className="links"></g>
      <g className="nodes"></g>
    </svg>
  );
};

export default Graph;
