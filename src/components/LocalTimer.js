import React, { Component } from "react";
import Controls from "./Controls";
import "./LocalTimer.css";

let s = 0;

const formattedSeconds = sec =>
  ("0" + Math.floor(sec / 60)).slice(-2) + ":" + ("0" + (sec % 60)).slice(-2);

class LocalTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      gtime: "",
      isRunning: false,
      isSaved: false
    };
  }

  dataSubmit = () => {
    this.props.onUpdate(
      {
        user: this.props.user,
        carType: this.props.car,
        taskNum: this.props.taskNum,
        localTime: this.state.time,
        globalTime: formattedSeconds(this.state.gtime)
      },
      this.props.index
    );
  };

  start = () => {
    console.log("Start Clicked");
    if (this.state.isRunning === false) {
      this.setState({
        gtime: this.props.time,
        time: this.state.time,
        isRunning: true
      });
      this.timer = setInterval(() => {
        this.setState({ time: (s = s + 0.1) });
      }, 100);
    }
  };

  restart = () => {
    let rs = Number(this.state.time);
    this.setState({ time: this.state.time, isRunning: true, isSaved: false });
    this.timer = setInterval(() => {
      this.setState({ time: (rs = rs + 0.1) });
    }, 100);
  };

  stop = () => {
    if (this.state.isRunning === true) {
      clearInterval(this.timer);
      this.setState({ isRunning: false });
      console.log(this.state.time);
    }
  };

  save = () => {
    this.setState({ isSaved: true });
  };

  reset = () => {
    this.stop();
    this.setState({ time: 0.0, isRunning: false, isSaved: false, gtime: "" });
    s = 0.1;
  };
  render() {
    return (
      <div
        className={
          !this.state.isRunning && this.state.time !== 0 && this.state.isSaved
            ? "LocalTimerDone"
            : "LocalTimer"
        }
      >
        <div className="LocalTimerHeader">
          <div className="LocalTimerTitle">
            <h2>Task {this.props.taskNum}</h2>
            <p className="GlobalTimeAtLocal">
              {formattedSeconds(this.state.gtime)}
            </p>
          </div>
          <button className="ResetBtnLocal" onClick={this.reset} />
        </div>
        <div className="LocalTimerDescription">
          <p>{this.props.taskDescription}</p>
        </div>
        <h1>{Number(this.state.time).toFixed(1)}</h1>

        <div className="LocalControl">
          <Controls
            isRunning={this.state.isRunning}
            isSaved={this.state.isSaved}
            time={this.state.time}
            restart={() => this.restart()}
            start={() => {
              this.reset();
              this.start();
            }}
            stop={() => {
              this.stop();
            }}
            save={() => {
              this.stop();
              this.save();
              this.dataSubmit();
            }}
            reset={() => {
              this.stop();
              this.reset();
            }}
          />
        </div>
      </div>
    );
  }
}

export default LocalTimer;
