import axios from "axios";

export const fetchPostComments = post_id => {
  return axios.get(`/api/comments/post/${post_id}`);
};

export const addPostComment = comment => {
  return axios.post("/api/comments/add", comment);
};
