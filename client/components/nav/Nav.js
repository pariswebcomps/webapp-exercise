"use strict";

import React from "react";
import { Link } from "react-router";

class Nav extends React.Component {
  render() {
    return (
      <nav className="light-blue darken-4">
        <div className="nav-wrapper">
          <Link to="/">
            <img className="logo" src="static/images/logo-people.svg" />
          </Link>
        </div>
      </nav>
    );
  }
}

export default Nav;
