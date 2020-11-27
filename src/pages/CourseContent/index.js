import React, { useEffect } from 'react'
import get from 'lodash/get'

import { useSelector, useDispatch } from 'react-redux'

import { actions as courseActions } from '../../components/Course/redux/action'
import Loader from '../../components/common/Loader'
import './styles.scss'

import CourseContentComponent from '../../components/Course/Content'

function CourseContent(props) {
  const dispatch = useDispatch()
  // get the course id, and pass it in the component.
  const courseId = get(props, 'match.params.courseId')
  const { loading, data  } = useSelector(({ Course }) => Course.courseContent)

  useEffect(() => {
    dispatch(courseActions.getCourseContent({courseId: courseId}))
  }, [dispatch, courseId])

  if(loading) {
    return <Loader pageLoader={true} />
  }

  if(data) {
    return <div> {JSON.stringify(data)}</div>
  }
  return (
   <CourseContentComponent  />
  )
}

export default CourseContent
