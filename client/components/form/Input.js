"use strict";

import React from "React";
import Formsy from "formsy-react";

const Input = React.createClass({
  mixins: [Formsy.Mixin],

  render() {
    const { placeholder } = this.props;

    return (
      <div className="row">
          <div className="input-field col s12">
              <input
                type="text"
                placeholder={placeholder}
                onChange={this.changeValue}
                value={this.getValue()} />
          </div>
      </div>
    );
  },

  changeValue(event) {
    this.setValue(event.currentTarget.value);
  }
});

export default Input;
