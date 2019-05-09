import React from "react";

class Nav extends React.Component {
  constructor() { 
    super()
    this.state = {
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    };
  }

  render() {

    return (
      <nav>
        <div className="nav-wrapper green">
          <a href="/" className="brand-logo green">Webb's Health & Homecare</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="signup.html">Sign Up</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="schedule.html">Schedule</a></li>
          </ul>
        </div>
      </nav>
    ) 
  };
}




export default Nav;