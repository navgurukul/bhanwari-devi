import axios from "axios";
import { METHODS } from "../../../services/api";

/**
 * end-point to get all the courses
 *
 * @param {data} object payload, in this endpoint it will undefined or not needed
 * @param {object} opts
 *
 * @returns {Promise}
 */
export const getCourses = () => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/courses`,
    method: METHODS.GET,
    headers: {
      "version-code": 40,
    },
    // headers: HeaderFactory(token),
  });
};

/**
 * end-point to get content of a course
 *
 * @param {data} object payload
 * @param {String} data.courseId.
 * @param {object} opts
 *
 * @returns {Promise}
 */
export const getCourseContent = (data) => {
  const { courseId, lang } = data;
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises?lang=${lang}`,
    method: METHODS.GET,
    // headers: HeaderFactory(token),
  });
};
