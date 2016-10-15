"use strict";

import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <form className="col s12 container">
        <div className="input-field">
          <i className="material-icons prefix">search</i>
          <input id="search" type="text" placeholder="Search some user" />
        </div>
      </form>
    );
  }
}

export default SearchBar;
