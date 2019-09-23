import * as API from "../utils/posts";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_UPVOTE = "RECEIVE_UPVOTE";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const receiveUpvote = post_id => ({
  type: RECEIVE_UPVOTE,
  post_id
});

export const fetchAllPosts = () => dispatch => {
  API.fetchAllPosts().then(res => dispatch(receivePosts(res.data)));
};

export const addPost = data => () => {
  API.addPost(data);
};

export const upvotePost = post_id => dispatch => {
  API.upvotePost(post_id).then(() => dispatch(receiveUpvote(post_id)));
};
