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

  return (
    <div className="App">
      <Graph
        nodes={nodes}
        setNodes={setNodes}
        links={links}
        setLinks={setLinks}
      />
      {console.log(nodes, links)}
    </div>
  );
}
