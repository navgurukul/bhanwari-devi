import axios from "axios";
import { METHODS, HeaderFactory } from "../../../services/api";

/**
 * end-point to get all the classes
 *
 * @param {classData} object no payload
 * @param {object} opts
 *
 * @returns {Promise}
 */
export const getAllClasses = (classData, token) => {
  const platform = { platform: "web" };
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/classes`,
    method: METHODS.GET,
    headers: HeaderFactory(token, platform),
  });
};
