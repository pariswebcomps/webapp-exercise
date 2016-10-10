"use strict";

import React from "react";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  renderIconLabel(iconName) {
    return <img className="info__icon" src={`static/images/${iconName}.svg`} />;
  }

  renderTextLabel(label) {
    return <span className="info__label">{label}</span>;
  }

  render() {
    const { value, icon, label } = this.props;
    const labelTag = icon ? this.renderIconLabel(icon) : this.renderTextLabel(label);

    return (
      <div>
        {labelTag}
        <span className="info__value">{value}</span>
      </div>
    );
  }
}

export default UserInfo;
