"use strict";

import React from "react";

import UserInfo from "./UserInfo";

class UserCard extends React.Component {
  render() {
    const { firstname, lastname, photo, manager, contactInfoPro, email, phone } = this.props;

    return (
      <div className="card">
        <div className="card-image">
          <img src={photo} />
          <span className="card-title">{`${firstname} ${lastname}`}</span>
        </div>
        <div className="card-content">
          <UserInfo icon="md-email" value={email} />
          <UserInfo icon="md-phone" value={phone} />
          <UserInfo label="Manager" value={manager} />
        </div>
      </div>
    );
  }
}

export default UserCard;
