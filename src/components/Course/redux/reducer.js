import { types } from './action'

const initialState = {
  loading: false,
  error: false,
  data: null,
  courseContent: {
    loading: false,
    error: false,
    data: null,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COURSES_INTENT:
      return {
        ...state,
        loading: true,
        error: false,
        data: null,
      }
    case types.GET_COURSES_INTENT_RESOLVED:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.data,
      }

    case types.GET_COURSES_INTENT_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
      }
    
    case types.GET_COURSE_CONTENT_INTENT:
      return {
        ...state,
        courseContent: {
          loading: true,
          error: false,
          data: null,
        }
      }
    
    case types.GET_COURSE_CONTENT_INTENT_RESOLVED:
      return {
        ...state,
        courseContent: {
          loading: false,
          error: false,
          data: action.data,
        }
      }

    case types.GET_COURSE_CONTENT_INTENT_REJECTED:
      return {
        ...state,
        courseContent: {
          loading: false,
          error: action.error,
          data: null,
        }
      }

    default:
      return state
  }
}
