import get from 'lodash/get'
/**
 * Common HTTP Methods used
 */
export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  HEAD: 'HEAD'
}

/**
 * Generate the headers needed for the requests
 * @param {String} token - Token used on Authentication
 */
export const HeaderFactory = (tokens) => {
  const headers = new Headers()
  if (!tokens) {
    return headers
  }
  const customHeaders = {
    'Content-Type': 'application/json',
    // 'x-api-key': process.env.REACT_APP_ONBOARDING_API_KEY
  }
  const idToken = get(tokens, 'idToken.jwtToken')
  if(idToken) {
    customHeaders['Authorization'] = `Bearer ${idToken}`
  }
  return customHeaders
}

/**
 * Handle Gracefully an HTTP Error
 * @param {Error} error - Fetch Error
 */
export function* ErrorHandler(error) {
  console.error(error)
  const genericResponse = { message: 'Something Went Wrong, try again later' }
  if (error && error.json) {
    try {
      const data = yield error.json()
      return data
    } catch (e) {
      return genericResponse
    }
  } else return genericResponse
}

