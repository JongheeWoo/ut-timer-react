import React from "react";
import Controls from "./Controls";

let s = 0;

const Timer = (time, isRunning, start, stop, save, reset) => {
  start = () => {
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

  return (
    <div>
      <p>Total Time: {this.state.time} ms</p>
      {/* this.state.time을 props로 보내서 다른 컴포넌트로 옮기는 방법? */}

      <Controls
        isRunning={isRunning}
        start={() => this.start()}
        stop={() => {
          this.stop();
          this.save();
        }}
        reset={() => this.reset()}
      />
    </div>
  );
};

export default Timer;
