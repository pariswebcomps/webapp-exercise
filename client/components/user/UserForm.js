"use strict";

import React from "react";

class UserForm extends React.Component {
  render() {
    return (
      <div className="container userForm row">
              <div className="col s12 card z-depth-3">
                  <div className="card-content">
                      <span className="card-title">Contact informations</span>
                      <form>
                          <div className="row">
                              <div className="input-field col s12">
                                  <input id="title" type="text" placeholder="First Name" />
                              </div>
                          </div>
                          <div className="row">
                              <div className="input-field col s12">
                                  <input id="last_name" type="text" className="validate" placeholder="Last Name" />
                              </div>
                          </div>
                          <div className="row">
                              <div className="input-field col s12">
                                  <input id="email" type="text" className="validate" placeholder="Email" />
                              </div>
                          </div>
                          <div className="row">
                              <div className="input-field col s12">
                                  <input id="phone" type="text" className="validate" placeholder="Phone Number" />
                              </div>
                          </div>
                      </form>
                  </div>
                  <div className="card-action">
                      <a href="movie-list.html">Cancel</a>
                      <a href="movie-list.html">Submit</a>
                  </div>
              </div>
          </div>
    );
  }
}

export default UserForm;
