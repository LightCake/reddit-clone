import axios from "axios";

export const fetchAllPosts = () => {
  return axios.get("/api/posts/all");
};

export const fetchSubredditsPosts = subreddit => {
  return axios.get(`/api/posts/subreddit/${subreddit}`);
};

export const addPost = data => {
  return axios.post("/api/posts/add", data);
};
