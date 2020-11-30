import React from 'react'
import PropTypes from 'prop-types'

import Exercise from './Exercise'
import './styles.scss'


function ExerciseList(props) {
  const { list = [], selectedIndex = null, subSelectedIndex = null, onClick } = props
  return (
    <div className='ng-exercise-list'>
      {/* <div className='enroll'>
        ENROLL IN COURSE
      </div> */}
      { list.map((exercise, index) => {
        return (
          <Exercise
            exercise={exercise}
            selectedIndex={selectedIndex}
            subSelectedIndex = {subSelectedIndex}
            index={index}
            onClick={onClick}
          />
        )}
      ) }
    </div>
  )
}

ExerciseList.propTypes = {
  list: PropTypes.array.isRequired,
  selectedIndex: PropTypes.any,
  onClick: PropTypes.func.isRequired,
}

export default ExerciseList;
