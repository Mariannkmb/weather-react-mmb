import React from "react";
import Weather from "./Weather";
import "./App.css";

function App() {
  return (
    <div className="App container">
      <Weather defaultCity="Lima" />
    </div>
  );
}

export default App;
