import React, { Component } from "react";

class Controls extends Component {
  render() {
    const { isRunning, start, stop, reset } = this.props;
    return (
      <div className="Control_Btns">
        {!isRunning ? (
          <button onClick={start} className="Controls_Start">
            Start
          </button>
        ) : null}
        {isRunning ? (
          <button onClick={stop} className="Controls_Stop">
            Stop
          </button>
        ) : null}
        <button onClick={reset} className="Conrols_Reset">
          Reset
        </button>
      </div>
    );
  }
}

export default Controls;
