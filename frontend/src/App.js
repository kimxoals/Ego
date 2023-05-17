import React from "react";
// import data from "./data/data.json";
import Graph from "./components/Graph";
import * as d3 from "d3";
import { useMemo, useState } from "react";
import "./App.css";
import NodeInfo from "./components/NodeInfo";
import Curve from "./components/Curve";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  return (
    <div className="App">
      <Graph nodes={nodes} links={links} />
      {/* <NodeInfo nodes={nodes} selectedNodes={selectedNodes} /> */}
      {/* <Curve /> */}
      {/* {console.log(nodes, links)} */}
    </div>
  );
}
