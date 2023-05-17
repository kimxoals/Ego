import React from "react";

function NodeInfo(nodes, selectedNodes) {
  // props = node
  const nodeSelected = { id: 1, priceSensitivity: 0.7, x: 123.123, y: 321.321 };

  return (
    <div class="NodeInfo">
      <p>Node Info Panel</p>
      <pre>
        {`
          Selected node: ${nodeSelected.id}
          Price Sensitivity: ${nodeSelected.priceSensitivity}
          Location X: ${nodeSelected.x}
          Location Y: ${nodeSelected.y}
      `}
      </pre>
    </div>
  );
}

export default NodeInfo;
