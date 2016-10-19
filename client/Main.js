"use strict";

import React from "react";
import { render } from "react-dom";

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";

import reducers from "./reducers/reducers.js";

import App from "./components/App.js";
import Users from "./pages/Users.js";
import UserDetail from "./pages/UserDetail.js";
import UserForm from "./components/user/UserForm.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(Object.assign({}, reducers, {
    routing: routerReducer
  })),
  composeEnhancers(applyMiddleware(thunk))
);

const history = syncHistoryWithStore(hashHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history} >
      <Route path="/" component={App} >
        <IndexRoute component={Users} />
        <Route path="user/edit/:userId" component={UserForm} />
        <Route path="user/new" component={UserForm} />
        <Route path="user/detail/:userId" component={UserDetail} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('app'));
