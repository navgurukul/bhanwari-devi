import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import Loader from '../../../common/Loader'
import './styles.scss'


function ExerciseContent(props) {
  const { loading, data } = useSelector(({Course}) => Course.exerciseContent)
  
  if(loading) {
    return (
      <div className='ng-exercise-content' >
       <Loader />
      </div>
    )
  }

  return (
    <div className='ng-exercise-content' >
      
    </div>
  )
}

ExerciseContent.propTypes = {
  // 
}

export default ExerciseContent;
