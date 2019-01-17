import React, { Component } from "react";
import totalTimer from "./TotalTimer";

class TotalTime extends Component {
  render() {
    // const { totalTime } = this.props;
    return (
      <div>
        <div>Total Time here</div>
        <div>{this.props.TotalTime}</div>
      </div>
    );

    //<div>{this.props.totalTime}</div>;
  }
}

export default TotalTime;
