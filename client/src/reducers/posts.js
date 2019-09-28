import { RECEIVE_POSTS, RECEIVE_POST } from "../actions/posts";
import { RECEIVE_VOTE_DELTA } from "../actions/votes";
import { RECEIVE_COMMENT } from "../actions/comments";

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
    case RECEIVE_POST:
      return {
        ...state,
        specific: action.post
      };
    case RECEIVE_VOTE_DELTA:
      return {
        ...state,
        all: state.all.map(post => {
          if (post.id === action.data.post_id) {
            post.votes = (post.votes === null ? 1 : parseInt(post.votes) + action.data.vote_delta);
          }
          return post;
        })
      };
    case RECEIVE_COMMENT:
      return {
        ...state,
        specific: {
          ...state.specific,
          comments: parseInt(state.specific.comments) + 1 + ""
        }
      };
    default:
      return state;
  }
};
