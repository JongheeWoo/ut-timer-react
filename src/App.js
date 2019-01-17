import React, { Component } from "react";
import "./App.css";
import TotalTimer from "./components/TotalTimer";
import TotalTime from "./components/TotalTime";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="">AVN UT TIMER</header>
        <TotalTimer />
        <TotalTime />
      </div>
    );
  }
}

export default App;
