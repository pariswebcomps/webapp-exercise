"use strict";

import React from "react";
import Formsy from "formsy-react";

import Input from "../form/Input.js";

import { connect } from "react-redux";

import { getUserDetail, modifyUser, createUser } from "../../actions/users.js";

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    };
  }

  componentWillMount() {
    const { params, getUserDetail } = this.props;

    if (params.userId) {
      getUserDetail(params.userId);
    }
  }

  render() {
    const requiredErrorMessage = "Please fill this field";
    const { canSubmit } = this.state;
    const isSubmitDisabled = !canSubmit;
    const classSubmitBtn = isSubmitDisabled ? "btn disabled" : "btn";
    const { userDetail } = this.props;

    return (
      <div className="container userForm row">
              <div className="col s12 card z-depth-3">
                <Formsy.Form onValidSubmit={(model) => this.submit(model)} onValid={() => this.enableButton()} onInvalid={() => this.disableButton()}>

                  <div className="card-content">
                      <span className="card-title">Contact informations</span>
                        <Input
                          name="firstname"
                          placeholder="First name"
                          value={userDetail.firstname}
                          required
                          validationError={{isDefaultRequiredValue: requiredErrorMessage}} />

                        <Input
                          name="lastname"
                          placeholder="Last name"
                          value={userDetail.lastname}
                          required
                          validationError={{isDefaultRequiredValue: requiredErrorMessage}} />


                        <Input
                          name="email"
                          placeholder="email"
                          value={userDetail.email}
                          required
                          validationError={{isDefaultRequiredValue: requiredErrorMessage}} />

                        <Input
                          name="phone"
                          placeholder="phone"
                          value={userDetail.phone}
                          required
                          validationError={{isDefaultRequiredValue: requiredErrorMessage}} />
                  </div>
                  <div className="card-action">
                      <button type="submit" className={classSubmitBtn} disabled={isSubmitDisabled}>Submit</button>
                  </div>
                </Formsy.Form>
              </div>
          </div>
    );
  }

  submit(model) {
    const { userDetail, modifyUser, history, params, createUser } = this.props;

    if (params.userId) {
      modifyUser(Object.assign({}, userDetail, model));
    } else {
      createUser(model);
    }

    history.push("/");
  }

  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }
}

UserForm.defaultProps = {
  userDetail: {}
};

export default connect(state => state.users, { getUserDetail, modifyUser, createUser })(UserForm);
