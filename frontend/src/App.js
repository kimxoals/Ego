import React from "react";
import { useState } from "react";
import "./App.css";
import Graph from "./components/Graph";
import NodeItem from "./components/NodeItem";
import NodeInfo from "./components/NodeInfo";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  function deleteNode(id) {
    const remainingNodes = nodes.filter((node) => id !== node.id);
    setNodes(remainingNodes);
  }

  // console.log(nodes);

  const nodeList = nodes.map((node) => (
    <NodeItem
      id={node.id}
      name={node.id}
      deleteNode={deleteNode}
      setSelectedNode={setSelectedNode}
    />
  ));

  return (
    <div className="App">
      <div className="main">
        <h2>Interactive Graph</h2>

        <div className="graph">
          <Graph
            nodes={nodes}
            setNodes={setNodes}
            links={links}
            setLinks={setLinks}
            selectedNode={selectedNode}
          />
          <div className="stack-big">{nodeList}</div>
        </div>
        <NodeInfo nodes={nodes} selectedNode={selectedNode} />
      </div>
      <div className="plant-info">
        <h2>Plant Information</h2>
      </div>
    </div>
  );
}
