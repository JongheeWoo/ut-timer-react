import React, { Component } from "react";
import "./Controls.css";
import "../Buttons.css";

class Controls extends Component {
  render() {
    const { isRunning, isSaved, start, restart, stop, time, save } = this.props;

    var saveBtn;
    if (!isRunning && time === 0) {
      saveBtn = (
        <button className="LongBtn LocalBtn SaveBtn SaveBtnDisabled">
          Save
        </button>
      );
    } else if (!isSaved && time !== 0) {
      saveBtn = (
        <button
          onClick={save}
          className="LongBtn LocalBtn SaveBtn SaveBtnDefault"
        >
          Save
        </button>
      );
    } else if (isSaved && time !== 0) {
      saveBtn = (
        <button
          onClick={save}
          className="LongBtn LocalBtn SaveBtn SaveBtnSaved"
        >
          Saved!
        </button>
      );
    }

    return (
      <div className="Controls">
        {!isRunning && time === 0 ? (
          <button onClick={start} className="LongBtn LocalBtn">
            Start
          </button>
        ) : null}
        {!isRunning && time !== 0 ? (
          <button onClick={restart} className="LongBtn LocalBtn">
            Resume
          </button>
        ) : null}
        {isRunning ? (
          <button onClick={stop} className="LongBtn LocalBtn Stop">
            Pause
          </button>
        ) : null}
        {saveBtn}
      </div>
    );
  }
}

export default Controls;
