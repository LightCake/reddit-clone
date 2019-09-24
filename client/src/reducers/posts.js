import { RECEIVE_POSTS } from "../actions/posts";
import { RECEIVE_UPVOTE_DELTA } from "../actions/votes";

const initialState = {
  all: [],
  specific: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        all: action.posts
      };
    case RECEIVE_UPVOTE_DELTA:
      return {
        ...state,
        all: state.all.map(post => {
          if (post.id === action.data.post_id) {
            post.votes = parseInt(post.votes) + action.data.upvote_delta;
          }
          return post;
        })
      };
    default:
      return state;
  }
};
