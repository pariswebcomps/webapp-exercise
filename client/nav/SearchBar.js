"use strict";

import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <div className="input-field">
            <input id="search" type="search" />
            <label htmlFor="search"><i class="material-icons">search</i></label>
        </div>
      </form>
    );
  }
}

export default SearchBar;
