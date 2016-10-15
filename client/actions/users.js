"use strict";

import { fetchUsers, fetchDetailUser, putUserModifications } from "../api/users.js";

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

function getUserDetail (userId) {
  return (dispatch) => {
    fetchDetailUser(userId).then(user => {
      dispatch({
        type: "GET_USER_DETAIL",
        user
      });
    });
  }
}

function modifyUser (user) {
  return (dispatch) => {
    putUserModifications(user).then(() => {
      dispatch({
        type: "MODIFY_USER",
        user
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

export { getUsers, filterUsers, deleteUser, getUserDetail, modifyUser };
