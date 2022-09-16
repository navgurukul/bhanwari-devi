import React from "react";
// import PropTypes from 'prop-types'

import "./styles.scss";

const CollapseArrow = (props) => {
  const { haveChildExercises, showChildExercise, onClick } = props;
  if (haveChildExercises) {
    return (
      <div className="ng-collapse-arrow" onClick={onClick}>
        {showChildExercise ? <span>&or;</span> : <span>&and;</span>}
      </div>
    );
  }
  return "";
};

export default CollapseArrow;
