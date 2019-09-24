import * as API from "../utils/posts";

export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchAllPosts = subreddit => dispatch => {
  API.fetchAllPosts(subreddit).then(res => dispatch(receivePosts(res.data)));
};

export const addPost = data => () => {
  API.addPost(data);
};
