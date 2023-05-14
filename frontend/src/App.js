import React from "react";
// import data from "./data/data.json";
import Graph from "./components/Graph";
import * as d3 from "d3";
import { useMemo, useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Graph />
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="313" height="305">
        <path d="m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47" />
      </svg> */}
    </div>
  );
}
