import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'


const ExerciseLogo = ({selected}) => {
  return (
    <div className='logo' >
      <svg className={selected && 'selected'}focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
        <g>
          <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z">
          </path>
        </g>
      </svg>
    </div>
  )
}


function Exercise(props) {
  const { exercise, selected, index, onClick } = props

  const handleExerciseClick = () => {
    if(onClick) {
      onClick(exercise, index)
    }
  }

  return (
    <div className={`ng-exercise ${selected && 'ng-exercise-selected'}`} onClick={handleExerciseClick}>
      <ExerciseLogo selected={selected} />
      <div className='title'>{exercise.name}</div>
    </div>
  )
}

Exercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default Exercise;
