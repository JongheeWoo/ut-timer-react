import React, { Component } from "react";
import "./App.css";
import GlobalTimeView from "./components/GlobalTimeView";
import Controls from "./components/Controls";
import SelectUser from "./components/SelectUser";
import LocalTimer from "./components/LocalTimer";

let s = 0;

class App extends Component {
  state = {
    time: 0,
    isRunning: false
  };
  start = () => {
    console.log("Start Clicked");
    if (this.state.isRunning === false) {
      this.setState({ time: this.state.time, isRunning: true });
      this.timer = setInterval(() => {
        this.setState({ time: s++ });
      }, 100);
    }
  };

  stop = () => {
    if (this.state.isRunning === true) {
      clearInterval(this.timer);
      this.setState({ isRunning: false });
    }
  };

  save = () => {
    console.log(this.state.time);
  };

  reset = () => {
    this.setState({ time: 0, isRunning: false });
    s = 0;
  };

  render() {
    return (
      <div className="App">
        <header className="">
          AVN UT TIMER
          <SelectUser />
        </header>
        <div className="GlobalTime">
          <GlobalTimeView time={this.state.time} />
          <Controls
            isRunning={this.state.isRunning}
            start={() => this.start()}
            stop={() => this.stop()}
            reset={() => this.reset()}
          />
        </div>
        <div className="LocalTimer">
          <LocalTimer time={this.state.time} />
        </div>
      </div>
    );
  }
}

export default App;
