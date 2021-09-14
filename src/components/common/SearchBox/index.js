import React from "react";

import "./styles.scss";

function SearchBox(props) {
  return (
    <div className="ng-search">
      <input
        type="text"
        placeholder="Search for a course"
        onChange={props.onChange}
        value={props.value}
      />
      <button type="submit">
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBox;
