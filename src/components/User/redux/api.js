import axios from 'axios'
import { METHODS, HeaderFactory } from '../../../services/api'

/**
 * get store list for a chain or restaurant
 *
 * @param {number} restaurantId
 * @param {object} opts
 *
 * @returns {Promise}
 */
export const sendGoogleUserData = (userData, tokens) => {
  console.log('data before api call', userData)
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/users/auth/google`,
    method: METHODS.POST,
    headers: HeaderFactory(tokens),
    data: {
      "idToken": userData.idToken,
      "mode": "web",
    }
  })
}
