import axios from "axios";

export const fetchPostVotes = () => {
  return axios.get("/api/votes/posts");
};

export const upvotePost = post_id => {
  return axios.post(`/api/posts/upvote/${post_id}`);
};

export const downvotePost = post_id => {
  return axios.post(`/api/posts/downvote/${post_id}`);
};
