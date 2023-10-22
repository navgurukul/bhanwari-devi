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
export const sendGoogleUserData = (tokens) => {
  console.log(tokens, "tokens")
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/users/auth/google`,
    method: METHODS.POST,
    headers: HeaderFactory(tokens.token),
    data: {
      idToken: tokens.token,
      mode: "web",
    },
  });
};

/**
 * Sends id-token to Meraki back-end to get profile data of registered user.
 */
export const sendToken = ( token) => {
  console.log("token", token.token);
  return axios({
    method: METHODS.GET,
    url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  });
};

// export const updateUser = (token) => {
//   return axios({
//     url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
//     method: METHODS.PUT,
//     headers: HeaderFactory(token),
//     data: userData,
//   });
// };
