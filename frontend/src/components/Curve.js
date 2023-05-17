import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Curve() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svg.attr("width");
    const height = svg.attr("height");
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const curveColor = "steelblue";
    const xScale = d3
      .scaleLinear()
      .domain([0, 24])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 15])
      .range([height - margin.bottom, margin.top]);

    const lineGenerator = d3
      .line()
      .x((d, i) => xScale(i * 0.1))
      .y((d) => yScale(d));

    const curveData = d3
      .range(-120, 120, 1)
      .map(
        (d) =>
          (0.01 + Math.exp((-0.1 * d * d) / 100) / Math.sqrt(100 * Math.PI)) *
          170
      );

    svg
      .append("path")
      .datum(curveData)
      .attr("fill", "none")
      .attr("stroke", curveColor)
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);

    // X-axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .text("Time / hour");

    // Y-axis label
    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("kiloWatts-hour");

    // X-axis ticks and tick labels
    const xAxis = d3.axisBottom(xScale);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    // Y-axis ticks and tick labels
    const yAxis = d3.axisLeft(yScale);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);
  }, []);

  return <svg ref={svgRef} width={500} height={300}></svg>;
}

export default Curve;
