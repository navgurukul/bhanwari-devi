import axios from "axios";
import { METHODS } from "../../../services/api";
import { versionCode, PATHWAYS_INFO } from "../../../constant";
import { isBeforeNow, subDays } from "../../../common/date";

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

    response.data.pathways = backEndPathwayData.reduce(
      (pathwayData, pathway) => {
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
      },
      frontEndPathwayData
    );

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
  /*
  return axios({
    method: METHODS.GET,
    url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/upcomingBatches`,
    headers: {
      accept: "application/json",
      Authorization: authToken,
    },
  });
  */
  // 0 is used for batches with null partner_id's
  // Change this to NG repository data file once unprotected class endpoint
  //   added
  const filePath =
    'https://raw.githubusercontent.com/jschanker/githubactions-testing/main/' +
    'data/upcoming-batches_' + (parseInt(partnerId) || 0) + '.json';
  // if (data.isStudent) {
  return axios(filePath).then((response) => {
    if (!response?.data) {
      return response;
    } else {
      // only get batches from specified pathway whose first class hasn't ended
      response.data = response.data[pathwayId]?.filter(
        c => !isBeforeNow(c.end_time || c.start_time)
      );
      return response;
    }
  }).catch(e => {
    // static file for this partner's batches is not available, make API call
    return axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/classes/all?startDate=${
        subDays(new Date(), 7).valueOf()
      }`,
      headers: {
        accept: "application/json",
        Authorization: authToken,
      },
    }).then((response) => {
      if (!Array.isArray(response?.data)) {
        return response;
      }
      // Assume they're sorted by time from nearest in the future from back-end and
      //  that batch classes scheduled to meet at least once per week (and haven't been canceled).
      //  In that case, upcoming batches are batches for which no classes starting from 1 week ago
      //  have met prior to now
      const classesStartingFromLastWeek = response.data;
      // map from recurring ids to the end (or start) time of the last class with that id
      const recurringIdToLastClassTimeMap = new Map();
      const upcomingBatchClasses = [];

      classesStartingFromLastWeek.forEach((c) => {
        // map old to new pathway for Python (fix, very hacky)
        const cPathwayId =
          c.pathway_v2 || { 39: 1 }[c.pathway_v1] || c.pathway_v1 || c.pathway_id;
        if (
          c.recurring_id &&
          cPathwayId == pathwayId
        ) {
          const latestTime = c.end_time || c.start_time;
          if (!recurringIdToLastClassTimeMap.has(c.recurring_id)) {
            new Date(latestTime) > new Date() &&
              upcomingBatchClasses.push(c);
          }
          recurringIdToLastClassTimeMap.set(c.recurring_id, latestTime);
        }  
      });

      upcomingBatchClasses
        .forEach(
          (c) => (c.end_batch_time = recurringIdToLastClassTimeMap.get(c.recurring_id))
        );

      response.data = upcomingBatchClasses;
      return response;
    });
  });
};

export const getupcomingEnrolledClasses = (data) => {
  const { pathwayId, authToken } = data;
  return axios({
    method: METHODS.GET,
    url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/upcomingEnrolledClasses`,
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
    url: `${process.env.REACT_APP_MERAKI_URL}/pathways/${pathwayId}/enrolledBatches`,
    headers: {
      accept: "application/json",
      Authorization: authToken,
    },
  });
};
