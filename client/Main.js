"use strict";

import React from "react";
import { render } from "react-dom";

import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./components/App.js";
import UserList from "./components/user/UserList.js";


const router = (
  <Router history={browserHistory} >
    <Route path="/" component={App} >
      <IndexRoute component={UserList} />
    </Route>
  </Router>
);

render(router, document.getElementById('app'));
