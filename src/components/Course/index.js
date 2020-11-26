import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { actions as courseActions } from './redux/action'
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
      {data && JSON.stringify(data, null, 4)}
    </div>
  )
}


export default Course;
