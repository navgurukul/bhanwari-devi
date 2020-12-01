import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import YouTube from 'react-youtube';
import get from 'lodash/get'


import './styles.scss'


const RenderContent = ({data}) => {
  if(data.type === 'markdown') {
    return <ReactMarkdown source={data.value}/>
  } else if( data.type === 'python') {
    return <code className='language-python code-block' > {get(data, 'value.code')} </code>
  }else if(data.type === 'image') {
    return <img className='image' src={get(data, 'value.url')} alt='content'/>
  }else if(data.type === 'video') {
    return <YouTube videoId={data.value}  />
  } 
  return '' 
}


function ExerciseContent(props) {
  const { content = [] } = props

  if(!Boolean(content)) {
    return ''
  }

  return (
    <div className='ng-exercise-content'>
      { content.map((contentItem, index) => <RenderContent data={contentItem} key={index}/> )}
    </div>
  )
}

ExerciseContent.propTypes = {
  content: PropTypes.array,
}

export default ExerciseContent;
