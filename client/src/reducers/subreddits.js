import { RECEIVE_ALL_SUBREDDITS } from "../actions/subreddits";

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
    default:
      return state;
  }
};
