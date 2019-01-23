import React, { Component } from "react";
import Controls from "./Controls";

let s = 0;
class LocalTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      gtime: 0,
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
      console.log(this.state.time);
    }
  };

  save = () => {
    this.setState({ gtime: this.props.time });
  };

  reset = () => {
    this.setState({ time: 0, isRunning: false });
    s = 0;
  };

  render() {
    return (
      <div className="LocalTimer">
        <div className="localHeader">
          <h3>Task {this.props.taskNum}</h3>
          <p className="GlobalTimeNum"> {this.state.gtime} </p>
        </div>
        <div className="localBody">
          <p>{this.props.taskDescription}</p>
          <h4 className="LocalTimeNum">{this.state.time} ms</h4>
        </div>
        <div className="LocalControl">
          <Controls
            isRunning={this.state.isRunning}
            start={() => {
              this.reset();
              this.start();
              this.save();
            }}
            stop={() => {
              this.stop();
            }}
            reset={() => this.reset()}
          />
        </div>
      </div>
    );
  }
}

export default LocalTimer;
