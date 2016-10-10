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

  renderUsers() {
    console.log(this.props.users);

    const users = this.props.users || [];

    return users.map(user => this.renderUser(user));
  }

  render() {
    return (
      <div className="row">
        {this.renderUsers()}
      </div>
    );
  }
}

export default connect(state => state, { getUsers })(UserList);
