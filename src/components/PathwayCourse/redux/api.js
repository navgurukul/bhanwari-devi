import axios from "axios";
import { METHODS } from "../../../services/api";

export const getPathways = () => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/pathways`,
    method: METHODS.GET,
    headers: {
      "version-code": 40,
    },
    // headers: HeaderFactory(token),
  });
};
