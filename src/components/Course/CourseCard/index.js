import React from 'react'
import PropTypes from 'prop-types'

import { PATHS } from '../../../constant.js'
import './styles.scss'



function CourseCard(props) {
  const { course } = props

  return (
    <a className='ng-course-card' href={`${PATHS.COURSE}/${course.id}`}>
      <img src={course.logo} alt={course.name} className='logo'/>
      <div className='description'>{course.description}</div>
    </a>
  )
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
}

export default CourseCard;
