"use strict";

import React from "react";

import { connect } from "react-redux";

import { filterUsers } from "../../actions/users.js";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  onSearch(event) {
    const { value } = event.target;

    this.props.filterUsers(value);
  }

  render() {
    return (
      <form className="col s12 container">
        <div className="input-field">
          <i className="material-icons prefix">search</i>
          <input
            id="search"
            type="text"
            placeholder="Search some user"
            value={this.props.searchKey}
            onChange={(event) => this.onSearch(event)} />
        </div>
      </form>
    );
  }
}

SearchBar.defaultProps = {
  filterUsers: () => {}
};

export default connect(state => state.users, { filterUsers })(SearchBar);
