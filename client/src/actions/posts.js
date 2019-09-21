import * as API from "../utils/posts";

export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchAllPosts = () => dispatch => {
  API.fetchAllPosts().then(res => dispatch(receivePosts(res.data)));
};

export const fetchSubredditsPosts = subreddit => dispatch => {
  API.fetchSubredditsPosts(subreddit).then(res =>
    dispatch(receivePosts(res.data))
  );
};

export const addPost = data => dispatch => {
  API.addPost(data);
};
