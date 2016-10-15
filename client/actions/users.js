"use strict";

import { fetchUsers } from "../api/users.js";

function getUsers () {
  return (dispatch) => {
    fetchUsers().then(users => {
      dispatch({
        type: "GET_USERS",
        users
      });
    });
  }
}

function filterUsers (searchKey) {
  return (dispatch) => {
    dispatch({
      type: "FILTER_USERS",
      searchKey
    });
  };
}

function deleteUser (userId) {
  return (dispatch) => {
    dispatch({
      type: "DELETE_USER",
      userId
    });
  }
}

export { getUsers, filterUsers, deleteUser };
