import React from 'react'
import PropTypes from 'prop-types'

import CourseCard  from '../CourseCard'
import './styles.scss'


const CourseList = ({list, title}) => {
  if(list && list.length) {
    return (
      <div className='ng-course-list'>
        <h2>{title}</h2>
        <div className='cards'>
          { list.map(course => <CourseCard course={course}/>) }
        </div>
      </div>
    )
  }
  return ''
}

CourseList.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string.isRequired,
}

export default CourseList;
