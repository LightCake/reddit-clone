import axios from "axios";

export const fetchAllSubreddits = (search = "") => {
  return axios.get(`/api/subreddits/all/${search}`);
};
