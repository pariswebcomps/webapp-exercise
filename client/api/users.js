"use strict";

import axios from "axios";

function fetchUsers () {
  return axios.get('/api/peoples').then((response) => response.data);
}

function fetchDetailUser (userId) {
  return axios.get(`/api/peoples/${userId}`).then(response => response.data);
}

function putUserModifications (user) {
  return axios.put(`/api/peoples/${user.id}`, user);
}

export { fetchUsers, fetchDetailUser, putUserModifications };
