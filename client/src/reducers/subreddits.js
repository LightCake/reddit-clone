import {
  RECEIVE_ALL_SUBREDDITS,
  RECEIVE_SUBREDDIT,
  SET_SUBREDDIT
} from "../actions/subreddits";

const initialState = {
  all: [],
  current: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_SUBREDDITS:
      return {
        ...state,
        all: action.subreddits
      };
    case RECEIVE_SUBREDDIT:
      return {
        ...state,
        all: state.all.concat(action.subreddit)
      };
    case SET_SUBREDDIT:
      return {
        ...state,
        current: action.subreddit === undefined ? null : action.subreddit
      };
    default:
      return state;
  }
};
