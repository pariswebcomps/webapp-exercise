"use strict";

import React from "React";
import Formsy from "formsy-react";

const Input = React.createClass({
  mixins: [Formsy.Mixin],

  render() {
    const { placeholder } = this.props;
    const isValid = !this.getErrorMessage();
    const inputValidClass = isValid ? "valid" : "invalid";

    return (
      <div className="row">
          <div className="input-field col s12">
              <input
                className={inputValidClass}
                type="text"
                placeholder={placeholder}
                onChange={this.changeValue}
                value={this.getValue()} />

                <div className="input-field__error">
                  { this.getErrorMessage() }
                </div>
          </div>
      </div>
    );
  },

  changeValue(event) {
    this.setValue(event.currentTarget.value);
  }
});

export default Input;
