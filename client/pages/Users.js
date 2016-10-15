"use strict";

import React from "react";

import UserList from "../components/user/UserList.js";

import SearchBar from "../components/search/SearchBar.js";

class Users extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <UserList />
      </div>
    )
  }
}

export default Users;
