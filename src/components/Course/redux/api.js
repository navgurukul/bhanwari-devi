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
export const getCourses = (data, token) => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/courses`,
    method: METHODS.GET,
    // headers: HeaderFactory(token),
  });
};

/**
 * end-point to get content of a course
 *
 * @param {data} object payload
 * @param {String} data.courseId
 * @param {object} opts
 *
 * @returns {Promise}
 */
export const getCourseContent = (data, token) => {
  const { courseId } = data;
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
    method: METHODS.GET,
    // headers: HeaderFactory(token),
  });
};
