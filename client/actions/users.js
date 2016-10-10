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

export { getUsers };
