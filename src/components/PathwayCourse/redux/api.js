import axios from "axios";
import { METHODS } from "../../../services/api";
import { versionCode } from "../../../constant";

export const getPathways = () => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/pathways?courseType=json`,
    method: METHODS.GET,
    headers: {
      "version-code": versionCode,
    },
    // headers: HeaderFactory(token),
  });
};

export const getPathwaysCourse = (data) => {
  const { pathwayId } = data;
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/courses?courseType=json`,
    method: METHODS.GET,
    headers: {
      "version-code": versionCode,
    },
    // headers: HeaderFactory(token),
  });
};

// export const getUpcomingBatches = (data) => {
//   const { pathwayId, authToken } = data;
//   return axios({
//     method: METHODS.GET,
//     url: `${process.env.REACT_APP_MERAKI_URL}pathways/${pathwayId}/upcomingBatches`,
//     headers: {
//       accept: "application/json",
//       Authorization: authToken,
//     },
//   });
// };

// export const getupcomingEnrolledClasses = (data) => {
//   const { pathwayId, authToken } = data;
//   return axios({
//     method: METHODS.GET,
//     url: `${process.env.REACT_APP_MERAKI_URL}pathways/${pathwayId}/upcomingEnrolledClasses`,
//     headers: {
//       accept: "application/json",
//       Authorization: authToken,
//     },
//   });
// };
