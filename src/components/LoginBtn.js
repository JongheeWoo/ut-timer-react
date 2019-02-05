import React, { Component } from "react";

class LoginBtn extends Component {
  render() {
    return (
      <div>
        <button onClick={this.handleAuthClick}>인증따리인증따</button>
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