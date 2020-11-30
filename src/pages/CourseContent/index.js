import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import get from 'lodash/get'

import { actions as courseActions } from '../../components/Course/redux/action'
import ExerciseList from '../../components/Course/Content/ExerciseList'
import ExerciseContent from '../../components/Course/Content/ExerciseContent'
import Loader from '../../components/common/Loader'
import Arrow from '../../components/common/Arrow'
import './styles.scss'

const EditOnGithub = (props) => {
  return (
    <a  
      href={props.link}
      target = "_blank" rel = "noopener noreferrer"
      className='github-link'>
        Edit on Github
    </a>
  )
}

function CourseContent(props) {
  const dispatch = useDispatch()
  // get the course id, and pass it in the component.
  const courseId = get(props, 'match.params.courseId')
  const { loading, data  } = useSelector(({ Course }) => Course.courseContent)
  const [ selectedExercise, setSelectedExercise ] = useState({})

  useEffect(() => {
    dispatch(courseActions.getCourseContent({courseId: courseId}))
  }, [dispatch, courseId])

  const handleExerciseChange = useCallback((exercise, index) => {
      setSelectedExercise({ exercise, selectedIndex: index })
    }, [])

  useEffect(() => {
    const firstExercise = get(data, 'exerciseList[0]')
    if(firstExercise) {
      setSelectedExercise({ exercise: firstExercise, selectedIndex: 0 })
    }
  }, [dispatch, data])

  const isFirstExerciseSelected = get(selectedExercise, 'selectedIndex') === 0
  const isLastExerciseSelected = get(selectedExercise, 'selectedIndex') === (get(data, `exerciseList.length`) - 1)
  
  const handleBackClick = useCallback(() => {
    if(isFirstExerciseSelected) return 
    const previousIndex = selectedExercise.selectedIndex - 1
    const previousExercise = get(data, `exerciseList[${previousIndex}]`)
    handleExerciseChange(previousExercise, previousIndex)
  }, [data, handleExerciseChange, selectedExercise.selectedIndex, isFirstExerciseSelected])

  const handleForwardClick = useCallback(() => {
    if(isLastExerciseSelected) return 
    const previousIndex = selectedExercise.selectedIndex + 1
    const previousExercise = get(data, `exerciseList[${previousIndex}]`)
    handleExerciseChange(previousExercise, previousIndex)
  }, [data, handleExerciseChange, isLastExerciseSelected, selectedExercise.selectedIndex])

  if(loading) {
    return <Loader pageLoader={true} />
  }

  return (
    <div className='ng-course-content'>
      <div className='content'>
        <ExerciseContent content={get(selectedExercise, 'exercise.content')}/>
        <EditOnGithub link={`${get(selectedExercise, 'exercise.githubLink')}`} />
        <div className='arrow-row'>
         {!isFirstExerciseSelected ? <Arrow left onClick={handleBackClick}/> : <div />}
         {!isLastExerciseSelected ? <Arrow onClick={handleForwardClick}/> : <div/>}
        </div>
      </div>
      <ExerciseList
        list={get(data, 'exerciseList')}
        selectedExercise={selectedExercise.exercise}
        onClick={handleExerciseChange}
      />
    </div>  
  )
}

export default CourseContent
