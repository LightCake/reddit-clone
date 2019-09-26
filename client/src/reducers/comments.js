import { RECEIVE_POST_COMMENTS, RECEIVE_COMMENT } from "../actions/comments";

const initialState = {
  post: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS:
      return {
        ...state,
        post: action.comments
      };
    case RECEIVE_COMMENT:
      return {
        ...state,
        post: state.post.concat(action.comment)
      };
    default:
      return state;
  }
};
