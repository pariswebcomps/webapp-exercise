"use strict";

import React from "react";

import UserCard from "./UserCard.js";

import { connect } from "react-redux";

import { getUsers } from "../../actions/users.js";

class UserList extends React.Component {
  renderUser(user) {
    return (
      <div className="col s12 m3" key={user.id}>
        <UserCard {...user} />
      </div>
    );
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className="row">
        {this.renderUsers()}
      </div>
    );
  }

  filterUsers(searchKey, users) {
    return users.filter(user => user.firstname.toLowerCase().match(searchKey.toLowerCase()));
  }

  renderUsers() {
    const { users, searchKey } = this.props;
    const displayedUsers = this.filterUsers(searchKey, users);

    return displayedUsers.map(user => this.renderUser(user));
  }
}

export default connect(state => state.users, { getUsers })(UserList);
