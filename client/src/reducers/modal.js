import {
  TOGGLE_REGISTER,
  TOGGLE_LOGIN,
  TOGGLE_SUBREDDIT
} from "../actions/modal";

const initialState = {
  registerOpen: false,
  loginOpen: false,
  subredditOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REGISTER:
      return {
        ...state,
        registerOpen: !state.registerOpen
      };
    case TOGGLE_LOGIN:
      return {
        ...state,
        loginOpen: !state.loginOpen
      };
    case TOGGLE_SUBREDDIT:
      return {
        ...state,
        subredditOpen: !state.subredditOpen
      };
    default:
      return state;
  }
};
