"use strict";

import React from "react";

import UserList from "../components/user/UserList.js";

import SearchBar from "../components/search/SearchBar.js";
import { Link } from "react-router";

const styles = {
  addButton: {
    bottom: "45px",
    right: "24px"
  }
};

class Users extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <UserList />
        <div className="fixed-action-btn horizontal" style={styles.addButton}>
            <Link to="/user/new" className="btn-floating btn-large red">
                <i className="large material-icons">add</i>
            </Link>
        </div>
      </div>
    )
  }
}

export default Users;
