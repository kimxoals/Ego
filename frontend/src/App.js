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
      <div className="row">
        <div className="columm left">
          <div className="wrapper">
            <h2>Interactive Graph</h2>
            <div className="row">
              <div className="column left">
                <Graph
                  nodes={nodes}
                  setNodes={setNodes}
                  links={links}
                  setLinks={setLinks}
                  selectedNode={selectedNode}
                />
              </div>
              <div className="column right">{nodeList}</div>
            </div>
          </div>

          <NodeInfo nodes={nodes} selectedNode={selectedNode} />
        </div>
        <div className="column right">
          <div className="wrapper">
            <h2>Plant Information</h2>
            Stuff
          </div>
        </div>
      </div>
    </div>
  );
}
