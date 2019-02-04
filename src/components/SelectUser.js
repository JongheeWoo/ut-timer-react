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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="0">Select User</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
        </select>

        <input type="submit" value="Apply" />
      </form>
    );
  }
}

export default SelectUser;
