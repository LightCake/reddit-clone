import { RECEIVE_POSTS } from "../actions/posts";

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
    default:
      return state;
  }
};
