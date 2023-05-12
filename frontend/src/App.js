import "./App.css";
import Graph from "./components/Graph";
import GraphPractice from "./components/GraphPractice";

function App() {
  return (
    <div>
      <svg id="container" width="800" height="800"></svg>
      <GraphPractice />
    </div>
  );
}

export default App;
