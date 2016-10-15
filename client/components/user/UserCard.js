"use strict";

import React from "react";

import UserInfo from "./UserInfo";
import { Link } from "react-router";

class UserCard extends React.Component {
  render() {
    const { id, firstname, lastname, photo, manager, contactInfoPro, email, phone } = this.props;

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
        <div className="card-action">
          <button className="btn-flat"><i className="material-icons">zoom_in</i></button>
          <Link to={`/user/edit/${id}`} className="btn-flat"><i className="material-icons">mode_edit</i></Link>
          <button className="btn-flat" onClick={() => this.onDelete()}><i className="material-icons">delete</i></button>
        </div>
      </div>
    );
  }

  onDelete() {
    const { id, onDelete } = this.props;

    onDelete(id);
  }
}

export default UserCard;
