import axios from "axios";

export const getPathways = () =>
  axios.get(`${process.env.REACT_APP_MERAKI_URL}/pathways`);
