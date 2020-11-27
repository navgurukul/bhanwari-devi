import axios from 'axios'
import { METHODS, HeaderFactory } from '../../../services/api'

/**
 * end-point to get all the courses
 *
 * @param {data} object payload, in this endpoint it will undefined or not needed
 * @param {object} opts
 *
 * @returns {Promise}
 */
export const getCourses = (data, token) => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/courses`,
    method: METHODS.GET,
    headers: HeaderFactory(token),
  })
}
