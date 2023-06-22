import React from "react";
import { useState } from "react";
import "./App.css";
import data from "./data/data_new.json";

import Graph from "./components/Graph";
import NodeItem from "./components/NodeItem";
import NodeInfo from "./components/NodeInfo";

export default function App() {
  const [nodes, setNodes] = useState([...data.nodes]);
  const [links, setLinks] = useState([...data.links]);
  const [selectedNode, setSelectedNode] = useState(null);
  function deleteNode(id) {
    const remainingNodes = nodes.filter((node) => id !== node.id);
    setNodes(remainingNodes);
    deleteLink(id);
  }
  function deleteLink(id) {
    const remainingLinks = links.filter(
      (link) => ![link.source.id, link.target.id].includes(id)
    );
    setLinks(remainingLinks);
  }

  // console.log(nodes);

  const nodeList = nodes.map((node) => (
    <NodeItem
      id={node.id}
      name={node.id}
      deleteNode={deleteNode}
      deleteLinks={deleteLink}
      setSelectedNode={setSelectedNode}
    />
  ));

  // console.log(nodes);
  // const links = linksData.map((d) => Object.assign({}, d));
  // const nodes = nodesData.map((d) => Object.assign({}, d));

  return (
    <div className="App">
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
      <div className="column right wrapper">
        <h2>Plant Information</h2>
        Stuff
      </div>
    </div>
  );
}
