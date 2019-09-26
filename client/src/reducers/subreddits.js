import {
  RECEIVE_ALL_SUBREDDITS,
  RECEIVE_SUBREDDIT
} from "../actions/subreddits";

const initialState = {
  all: []
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
    default:
      return state;
  }
};
