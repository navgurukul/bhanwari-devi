import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { actions as courseActions } from './redux/action'
import CourseCard  from './CourseCard'
import './styles.scss'


function Course() {
  const dispatch = useDispatch()
  const { loading, data  } = useSelector(({ Course }) => Course)

  useEffect(() => {
    dispatch(courseActions.getCourses())
  }, [dispatch])

  if(loading) {
    return <div>...</div>
  }

  return (
    <div className='ng-course'>
      <h2>Aap yeh courses mein enroll kar skte hai</h2>
      <div className='cards'>
        { Boolean(data) && data.map(course => <CourseCard course={course}/>) }
      </div>
    </div>
  )
}


export default Course;
