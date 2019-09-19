import axios from "axios";

export const fetchAllSubreddits = () => {
  return axios.get("/api/subreddits/all");
};
