import axios from "axios";
import { METHODS } from "../../../services/api";
import { versionCode, PATHWAYS_INFO } from "../../../constant";

export const getPathways = () => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/pathways?courseType=json`,
    method: METHODS.GET,
    headers: {
      "version-code": versionCode,
    },
    // headers: HeaderFactory(token),
  }).then((response) => {
    if (!response?.data?.pathways) {
      return response;
    }
    // Augment pathways data from back-end with new data to simulate it all
    //     coming from the back-end
    // quick way to copy exported constant since it's being modified
    const frontEndPathwayData = JSON.parse(JSON.stringify(PATHWAYS_INFO));
    const backEndPathwayData = response?.data?.pathways || [];
    const feCodeToIndexMap = frontEndPathwayData.reduce(
      (codeMap, pathway, index) => {
        if (pathway.code) {
          codeMap[pathway.code] = index;
        }
        return codeMap;
      },
      {}
    );

    response.data.pathways = backEndPathwayData.reduce((pathwayData, pathway) => {
      const indexOfPathway = feCodeToIndexMap[pathway.code];
      if (indexOfPathway != undefined) {
        pathwayData[indexOfPathway] = {
          ...pathway,
          ...pathwayData[indexOfPathway],
        };
      } else {
        pathwayData.push(pathway);
      }
      return pathwayData;
    }, frontEndPathwayData);

    return response;
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

export const getUpcomingBatches = (data) => {
  const { pathwayId, authToken } = data;
  return axios({
    method: METHODS.GET,
    url: `${process.env.REACT_APP_MERAKI_URL}pathways/${pathwayId}/upcomingBatches`,
    headers: {
      accept: "application/json",
      Authorization: authToken,
    },
  });
};

export const getupcomingEnrolledClasses = (data) => {
  const { pathwayId, authToken } = data;
  return axios({
    method: METHODS.GET,
    url: `${process.env.REACT_APP_MERAKI_URL}pathways/${pathwayId}/upcomingEnrolledClasses`,
    headers: {
      accept: "application/json",
      Authorization: authToken,
    },
  });
};

export const getEnrolledBatches = (data) => {
  const { pathwayId, authToken } = data;
  return axios({
    method: METHODS.GET,
    url: `${process.env.REACT_APP_MERAKI_URL}pathways/${pathwayId}/enrolledBatches`,
    headers: {
      accept: "application/json",
      Authorization: authToken,
    },
  });
};
