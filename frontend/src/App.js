import React from "react";
import { useState } from "react";
import "./App.css";
import NodeInfo from "./components/NodeInfo";
import Graph from "./components/Graph";

import Graph from "./components/Graph";
import Curve from "./components/Curve";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  return (
    <div className="App">
      <div className="main">
        <div className="graph">
          <h2>Interactive Graph</h2>
          <Graph
            nodes={nodes}
            setNodes={setNodes}
            links={links}
            setLinks={setLinks}
          />
        </div>
        <NodeInfo />
      </div>
      <div className="plant-info">
        <h2>Plant Information</h2>
      </div>
    </div>
  );
}
