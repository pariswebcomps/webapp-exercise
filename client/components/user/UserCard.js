"use strict";

import React from "react";

import UserInfo from "./UserInfo";

class UserCard extends React.Component {
  render() {
    const { firstname, lastname, photo, manager, contactInfoPro } = this.props;
    const { mail, fixedPhone, city } = contactInfoPro;

    return (
      <div className="card">
        <div className="card-image">
          <img src={photo} />
          <span className="card-title">{`${firstname} ${lastname}`}</span>
        </div>
        <div className="card-content">
          <UserInfo icon="md-email" value={mail} />
          <UserInfo icon="md-phone" value={fixedPhone} />
          <UserInfo label="Manager" value={manager} />
          <UserInfo label="Location" value={city} />
        </div>
      </div>
    );
  }
}

export default UserCard;
