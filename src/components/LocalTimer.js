import React, { Component } from "react";
import Controls from "./Controls";

let s = 0;
class LocalTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRunning: false
    };
  }

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
    console.log(this.props.time);
  };

  reset = () => {
    this.setState({ time: 0, isRunning: false });
    s = 0;
  };

  render() {
    return (
      <div>
        <div className="localHeader">
          <h3>Task {this.props.taskNum}</h3>
          <p>Global Time: {this.props.time}</p>
        </div>
        <p>{this.props.taskDescription}</p>
        <h4>Time: {this.state.time}</h4>
        <Controls
          isRunning={this.state.isRunning}
          start={() => this.start()}
          stop={() => {
            this.stop();
            this.save();
          }}
          reset={() => this.reset()}
        />{" "}
      </div>
    );
  }
}

export default LocalTimer;
