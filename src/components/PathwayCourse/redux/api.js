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
