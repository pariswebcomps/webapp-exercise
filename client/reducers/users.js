"use strict";

import { createStore } from "redux";

const INITIAL_STATE = {
  users: [],
  searchKey: "",
  userDetail: {}
};

function deleteUser(userId, users) {
  return users.filter(user => user.id !== userId);
}

function usersUpdate (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_USERS':
      return Object.assign({}, state, {users: action.users});
    case 'GET_USER_DETAIL':
      return Object.assign({}, state, {userDetail: action.user});
    case 'FILTER_USERS':
      return Object.assign({}, state, {searchKey: action.searchKey});
    case 'DELETE_USER':
      return Object.assign({}, state, {users: deleteUser(action.userId, state.users)});
    case 'CREATE_USER':
      return Object.assign({}, state, {users: state.users.concat([action.createdUser])});
    default:
      return state;
  }
}

export default usersUpdate;
