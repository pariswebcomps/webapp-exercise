"use strict";

import React from "react";
import { render } from "react-dom";

import Nav from "./nav/Nav.js";
import UserList from "./user/UserList.js";

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <UserList />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
