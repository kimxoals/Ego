import React from "react";
import { useMemo, useState } from "react";
import "./App.css";
import NodeInfo from "./components/NodeInfo";
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
        <div className="node-info">
          <h2>Node Information</h2>
          <div class="panel">
            <div class="data-column">
              <p>
                <strong>ID:</strong> node1
              </p>
              <p>
                <strong>Price Sensitivity:</strong> 0.87
              </p>
              <p>
                <strong>Location:</strong>
              </p>
              <ul>
                <li>
                  <strong>X:</strong> 123
                </li>
                <li>
                  <strong>Y:</strong> 199
                </li>
              </ul>
            </div>
            <div class="usage-column">
              <p>
                <strong>Current:</strong> 17 watts
              </p>
              <p>
                <strong>Daily Average:</strong> 8 kWh
              </p>
              <p>
                <strong>Distribution:</strong>
              </p>
              <Curve />
            </div>
          </div>
        </div>
      </div>
      <div className="plant-info">
        <h2>Plant Information</h2>
      </div>
    </div>
  );
}
