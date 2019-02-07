import React, { Component } from "react";

class SelectUser extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "0" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onCreate(this.state.value);
    console.log(this.state.value);
  }
  BuildOptions() {
    var arr = [];
    for (let i = 1; i <= 24; i++) {
      arr.push(<option key={i} value={`User ${i}`}>{`User ${i}`}</option>);
    }
    return arr;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="No User Selected">Select User</option>
          <option value="Test">Test</option>
          {this.BuildOptions()}
        </select>

        <input type="submit" value="Apply" />
      </form>
    );
  }
}

export default SelectUser;
