import { TOGGLE_REGISTER, TOGGLE_LOGIN } from "../actions/modal";

const initialState = {
  registerOpen: false,
  loginOpen: false
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
    default:
      return state;
  }
};
