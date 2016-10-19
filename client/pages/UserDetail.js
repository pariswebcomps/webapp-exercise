"use strict";

import React from "react";

import { connect } from "react-redux";

import { getUserDetail } from "../actions/users.js";

import UserCard from "../components/user/UserCard.js";

class UserDetail extends React.Component {
  componentDidMount() {
    const { params, getUserDetail } = this.props;

    getUserDetail(params.userId);
  }

  render() {
    const { userDetail } = this.props;

    return (
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <UserCard {...userDetail} />
        </div>
      </div>
    );
  }
}

export default connect(state => state.users, { getUserDetail })(UserDetail);
