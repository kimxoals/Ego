import React from "react";
import { useMemo, useState } from "react";
import "./App.css";
import data from "./data/data_new.json";

import Graph from "./components/Graph";
import Curve from "./components/Curve";

export default function App() {
  const [nodes, setNodes] = useState([...data.nodes]);
  const [links, setLinks] = useState([...data.links]);

  console.log(nodes);
  // const links = linksData.map((d) => Object.assign({}, d));
  // const nodes = nodesData.map((d) => Object.assign({}, d));

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
        <div className="node-info">
          <h2>Node Information</h2>
          <Curve />
        </div>
      </div>
      <div className="plant-info">
        <h2>Plant Information</h2>
      </div>
    </div>
  );
}
