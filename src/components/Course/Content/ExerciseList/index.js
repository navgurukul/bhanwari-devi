import React from 'react'
import PropTypes from 'prop-types'

import Exercise from './Exercise'
import './styles.scss'


function ExerciseList(props) {
  const { list = [], selectedExercise = {}, onClick } = props

  return (
    <div className='ng-exercise-list'>
      {/* <div className='enroll'>
        ENROLL IN COURSE
      </div> */}
      { list.map((exercise, index) => {
        return (
          <Exercise
            exercise={exercise}
            selected={selectedExercise.slug === exercise.slug}
            key={index}
            index={index}
            onClick={onClick}/>
        )}
      ) }
    </div>
  )
}

ExerciseList.propTypes = {
  list: PropTypes.array.isRequired,
  // selectedSlug is the slug of selected exercise
  selectedSlug: PropTypes.any,
  onClick: PropTypes.func.isRequired,
}

export default ExerciseList;
