import React, { Component } from "react";

class Movie extends Component {
  render() {
    return (
      <div>
        <h1>Here is your movies!!</h1>
        <p>{this.props.title}</p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Movie;
