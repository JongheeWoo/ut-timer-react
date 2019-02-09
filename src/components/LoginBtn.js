import React, { Component } from "react";

class LoginBtn extends Component {
  render() {
    return (
      <div>
        <button className="LoginBtn" onClick={this.handleAuthClick}>Login</button>
      </div>
    );
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick = event => {
    window.gapi.auth2.getAuthInstance().signIn();
  };
}

export default LoginBtn;
