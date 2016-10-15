"use strict";

import React from "react";
import Formsy from "formsy-react";

import Input from "../form/Input.js";

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    };
  }

  render() {
    const requiredErrorMessage = "Please fill this field";
    const { canSubmit } = this.state;
    const isSubmitDisabled = !canSubmit;
    const classSubmitBtn = isSubmitDisabled ? "btn disabled" : "btn";

    return (
      <div className="container userForm row">
              <div className="col s12 card z-depth-3">
                <Formsy.Form onValidSubmit={this.submit} onValid={() => this.enableButton()} onInvalid={() => this.disableButton()}>

                  <div className="card-content">
                      <span className="card-title">Contact informations</span>
                        <Input
                          name="firstname"
                          placeholder="First name"
                          required
                          validationError={{isDefaultRequiredValue: requiredErrorMessage}} />

                        <Input
                          name="lastname"
                          placeholder="Last name"
                          required
                          validationError={{isDefaultRequiredValue: requiredErrorMessage}} />


                        <Input
                          name="email"
                          placeholder="email"
                          required
                          validationError={{isDefaultRequiredValue: requiredErrorMessage}} />

                        <Input
                          name="phone"
                          placeholder="phone"
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
    console.log(model);
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

export default UserForm;
