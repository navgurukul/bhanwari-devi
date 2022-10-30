import axios from "axios";
import { METHODS } from "../../../services/api";
// import { versionCode, PATHWAYS_INFO } from "../../../constant";

export const getProgressTracking = (data) => {
  const { courseId, authToken } = data;
  return axios({
    method: METHODS.GET,
    url: `${process.env.REACT_APP_MERAKI_URL}/progressTracking/${courseId}/completedCourseContentIds`,
    headers: {
      accept: "application/json",
      Authorization: authToken,
    },
  });
};
