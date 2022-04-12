import axios from "axios";
import { METHODS, HeaderFactory } from "../../../services/api";

/**
 * Sends google id-token to meraki back-end to register the user.
 *
 * @param {userData} mapped information for google user after signin with google
 * @param {object} opts
 *
 * @returns {Promise}
 */
export const sendGoogleUserData = (userData, tokens) => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/users/auth/google`,
    method: METHODS.POST,
    headers: HeaderFactory(tokens),
    data: {
      idToken: userData.idToken,
      mode: "web",
    },
  });
};

/**
 * Sends id-token to Meraki back-end to get profile data of registered user.
 */
export const sendToken = (userData, tokens) => {
  return axios({
    method: METHODS.GET,
    url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
    headers: {
      accept: "application/json",
      Authorization: userData.token,
    },
  });
};

export const updateUser = (userData, tokens) => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
    method: METHODS.PUT,
    headers: HeaderFactory(tokens),
    data: userData,
  });
};
