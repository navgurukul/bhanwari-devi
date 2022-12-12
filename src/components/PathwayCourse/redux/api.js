import axios from "axios";
import { METHODS } from "../../../services/api";
import { versionCode, PATHWAYS_INFO } from "../../../constant";

export const getPathways = () => {
  const branchDataSource = process.env.REACT_APP_MERAKI_URL.startsWith(
    "https://dev"
  )
    ? "dev"
    : "main";
  //update
  // return axios(
  //   "https://raw.githubusercontent.com/navgurukul/bhanwari-devi/" +
  //   branchDataSource +
  //   "/src/data/pathway_data_v40.json"
  // ).catch((err) => {
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
  // });
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
  return axios({
    method: METHODS.GET,
    url: `${process.env.REACT_APP_MERAKI_URL}/classes/all?startDate=${new Date(
      new Date().valueOf() - 7 * 24 * 60 * 60 * 1000
    ).valueOf()}`,
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
    const classesStartingFromLastWeekRev = classesStartingFromLastWeek
      .slice()
      .reverse();
    const recurringIds = new Set();
    const upcomingBatchClasses = [];

    classesStartingFromLastWeek.forEach((c) => {
      // map old to new pathway for Python (fix, very hacky)
      const cPathwayId =
        c.pathway_v2 || { 39: 1 }[c.pathway_v1] || c.pathway_v1 || c.pathway_id;
      if (
        c.recurring_id &&
        !recurringIds.has(c.recurring_id) &&
        cPathwayId == pathwayId
      ) {
        recurringIds.add(c.recurring_id);
        new Date(c.start_time) > new Date() && upcomingBatchClasses.push(c);
      }
    });

    upcomingBatchClasses
      .map((c) =>
        classesStartingFromLastWeekRev.find(
          (d) => c.recurring_id === d.recurring_id
        )
      )
      .forEach(
        (c, index) => (upcomingBatchClasses[index].end_batch_time = c.end_time)
      );

    response.data = upcomingBatchClasses;
    return response;
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
