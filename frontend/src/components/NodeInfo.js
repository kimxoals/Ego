import React from "react";
import Curve from "./Curve";
function NodeInfo({ nodes, selectedNode }) {
  // const nodeSelected = { id: 1, priceSensitivity: 0.7, x: 123.123, y: 321.321 };

  const currentNode = nodes.find((node) => selectedNode === node.id);
  const nodeView = (
    <div className="node-info">
      <h2>Node Information</h2>
      <div className="panel">
        <div className="data-column">
          <p>
            <strong>ID:</strong> {selectedNode ? currentNode.id : "n/a"}
          </p>
          <p>
            <strong>Price Sensitivity:</strong>{" "}
            {selectedNode ? currentNode.ped : "n/a"}
          </p>
          <p>
            <strong>Location:</strong>
          </p>
          <ul>
            <li>
              <strong>X:</strong> {selectedNode ? currentNode.x : "n/a"}
            </li>
            <li>
              <strong>Y:</strong> {selectedNode ? currentNode.y : "n/a"}
            </li>
          </ul>
        </div>
        <div className="usage-column">
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
  );
  return nodeView;
}

export default NodeInfo;
