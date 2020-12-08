import axios from 'axios'
import { METHODS, HeaderFactory } from '../../../services/api'
/**
 * end-point to get all the classes
 *
 * @param {classData} object no payload
 * @param {object} opts
 *
 * @returns {Promise}
 */
export const getAllClasses = (classData, token) => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/classes/all`,
    method: METHODS.GET,
    headers: HeaderFactory(token),
  })
}
/**
 * end-point to create a class.
 *
 * @param {classData} object payload to create a class.
 * @param {object} opts
 *
 * @returns {Promise}
 */
export const createClass = (classData, token) => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/classes`,
    method: METHODS.POST,
    headers: HeaderFactory(token),
    data: {
      ...classData
    }
  })
}