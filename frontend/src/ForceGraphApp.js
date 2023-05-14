import React from "react";
import data from "./data/data.json";
import { ForceGraph } from "./components/forceGraph";

function ForceGraphApp() {
  return (
    <div className="App">
      <header className="App-header">Force Graph Example</header>
      <section className="Main">
        <ForceGraph linksData={data.links} nodesData={data.nodes} />
      </section>
    </div>
  );
}

export default ForceGraphApp;
