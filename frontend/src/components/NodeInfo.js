import React from "react";
import Curve from "./Curve";
function NodeInfo(nodes, selectedNodes) {
  // props = node
  const nodeSelected = { id: 1, priceSensitivity: 0.7, x: 123.123, y: 321.321 };

  return (
    <div className="node-info">
      <h2>Node Information</h2>
      <div class="panel">
        <div class="data-column">
          <p>
            <strong>ID:</strong> ${nodeSelected.id}
          </p>
          <p>
            <strong>Price Sensitivity:</strong> ${nodeSelected.priceSensitivity}
          </p>
          <p>
            <strong>Location:</strong>
          </p>
          <ul>
            <li>
              <strong>X:</strong> ${nodeSelected.x}
            </li>
            <li>
              <strong>Y:</strong> ${nodeSelected.y}
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
  );
}

export default NodeInfo;
