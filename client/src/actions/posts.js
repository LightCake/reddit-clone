import * as API from "../utils/posts";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const fetchAllPosts = subreddit => dispatch => {
  API.fetchAllPosts(subreddit).then(res => dispatch(receivePosts(res.data)));
};

export const fetchPost = post_id => dispatch => {
  API.fetchPost(post_id).then(res => dispatch(receivePost(res.data)));
};

export const addPost = data => () => {
  API.addPost(data);
};
