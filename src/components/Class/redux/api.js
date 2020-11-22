import axios from 'axios'
import { METHODS, HeaderFactory } from '../../../services/api'

/**
 * Sends google id-token to meraki back-end to register the user.
 *
 * @param {classData} object payload to create a class.
 * @param {object} opts
 *
 * @returns {Promise}
 */
export const createClass = (classData, tokens) => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/classes`,
    method: METHODS.POST,
    headers: HeaderFactory(tokens),
    data: {
      ...classData
    }
  })
}
