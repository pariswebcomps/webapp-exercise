"use strict";

import React from "react";
import { render } from "react-dom";

import { Router, Route, IndexRoute, browserHistory } from "react-router";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import reducers from "./reducers/reducers.js";

import App from "./components/App.js";
import UserList from "./components/user/UserList.js";

const store = createStore(
  combineReducers(Object.assign({}, reducers, {
    routing: routerReducer
  }))
);

const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history} >
      <Route path="/" component={App} >
        <IndexRoute component={UserList} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
