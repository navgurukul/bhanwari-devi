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
  const { loading, data  } = useSelector(({ Course }) => Course.courseContent)
  const [ selectedExercise, setSelectedExercise ] = useState({})
  // get the course id, and pass it in the component.
  const courseId = get(props, 'match.params.courseId')
  const isFirstExerciseSelected = get(selectedExercise, 'selectedIndex') === 0
  const isLastExerciseSelected = get(selectedExercise, 'selectedIndex') === (get(data, `exerciseList.length`) - 1)

  useEffect(() => {
    dispatch(courseActions.getCourseContent({courseId: courseId}))
  }, [dispatch, courseId])

  const handleExerciseChange = useCallback((exercise, index, subIndex) => {
    // Subindex when child component is selected.
    // equal check with zero, when the first exercise child is selected, 
    // which is indexed at 0.
    if(subIndex === 0 || subIndex) {
      setSelectedExercise({ exercise, selectedIndex: index, subIndex })
    } else {
      setSelectedExercise({ exercise, selectedIndex: index })
    }
    }, [])

  useEffect(() => {
    const firstExercise = get(data, 'exerciseList[0]')
    if(firstExercise) {
      setSelectedExercise({ exercise: firstExercise, selectedIndex: 0 })
    }
  }, [dispatch, data])
  
  //TODO: Handle forward and back arrow click through redux
  // So we can reduce this component code.
  const handleBackClick = useCallback(() => {
    const { selectedIndex, subIndex } = selectedExercise
    // Handle subexercise operation forward button click
    if(subIndex === 0 || subIndex) {
      const childExerciseList = get(data, `exerciseList[${selectedIndex}].childExercises`)
      if (subIndex > 0) {
       return  handleExerciseChange(childExerciseList[subIndex-1], selectedIndex, subIndex - 1)
      } else if(subIndex === 0) {
        return  handleExerciseChange(get(data, `exerciseList[${selectedIndex}]`), selectedIndex)
      }
    }
    const previousIndex = selectedIndex - 1
    const previousExercise = get(data, `exerciseList[${previousIndex}]`)
    handleExerciseChange(previousExercise, previousIndex)
  }, [data, handleExerciseChange, selectedExercise])

  const handleForwardClick = useCallback(() => {
    const { exercise, selectedIndex, subIndex } = selectedExercise
    // Handle subexercise operation forward button click
    if(exercise.childExercises) {
      const childExerciseList = get(data, `exerciseList[${selectedIndex}].childExercises`)
      if (subIndex < (childExerciseList.length-1)) {
       return  handleExerciseChange(childExerciseList[subIndex + 1], selectedIndex, subIndex + 1)
      } else if(!subIndex) {
        return  handleExerciseChange(childExerciseList[0], selectedIndex, 0)
      }
    }
    const nextIndex = selectedIndex + 1
    const nextExercise = get(data, `exerciseList[${nextIndex}]`)
    handleExerciseChange(nextExercise, nextIndex)
  }, [data, handleExerciseChange, selectedExercise])

  if(loading) {
    return <Loader pageLoader={true} />
  }

  return (
    <div className='ng-course-content'>
      <div className='content'>
        <h2>{get(selectedExercise, 'exercise.name')}</h2>
        <ExerciseContent content={get(selectedExercise, 'exercise.content')}/>
        <EditOnGithub link={`${get(selectedExercise, 'exercise.githubLink')}`} />
        <div className='arrow-row'>
         {!isFirstExerciseSelected ? <Arrow left onClick={handleBackClick}/> : <div />}
         {!isLastExerciseSelected ? <Arrow onClick={handleForwardClick}/> : <div/>}
        </div>
      </div>
      <ExerciseList
        list={get(data, 'exerciseList')}
        selectedIndex={selectedExercise.selectedIndex}
        subSelectedIndex = {selectedExercise.subIndex} 
        onClick={handleExerciseChange}
      />
    </div>  
  )
}

export default CourseContent
