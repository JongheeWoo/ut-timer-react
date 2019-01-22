import React, { Component } from "react";

class SelectUser extends Component {
  render() {
    return (
      <div>
        <select>
          <option>Select User</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
          <option value="4">User 4</option>
          <option value="5">User 5</option>
          <option value="6">User 6</option>
          <option value="7">User 7</option>
        </select>
      </div>
    );
  }
}

export default SelectUser;
