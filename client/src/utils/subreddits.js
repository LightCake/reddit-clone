import axios from "axios";

export const fetchAllSubreddits = (search = "") => {
  return axios.get(`/api/subreddits/all/${search}`);
};

export const createSubreddit = subreddit => {
  return axios.post("/api/subreddits/create", subreddit);
};
