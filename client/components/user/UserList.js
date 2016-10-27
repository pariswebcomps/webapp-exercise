"use strict";

import React from "react";

import UserCard from "./UserCard.js";

import { connect } from "react-redux";

import { getUsers, deleteUser } from "../../actions/users.js";

class UserList extends React.Component {
  renderUser(user) {
    return (
      <div className="col s12 m3" key={user.id}>
        <UserCard {...user} onDelete={(userId) => this.deleteUser(userId)} enableActions={true} />
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

  deleteUser(userId) {
    this.props.deleteUser(userId);
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

export default connect(state => state.users, { getUsers, deleteUser })(UserList);
