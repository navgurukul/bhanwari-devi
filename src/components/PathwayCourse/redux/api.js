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
export const getPathways = () => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/pathways`,
    method: METHODS.GET,
    // headers: HeaderFactory(token),
  });
};

//axios({
//       method: METHODS.GET,
//       url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/courses?courseType=json`,
//       headers: {
//         accept: "application/json",
//         "version-code": 40,
//         Authorization: user.data.token,
//       },
//     }).then((res) => {
//       console.log("res", res);
//       setPathwayCourse(res.data.courses);
//     });
