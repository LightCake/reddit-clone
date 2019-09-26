import { RECEIVE_POST_COMMENTS } from "../actions/comments";

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
    default:
      return state;
  }
};
