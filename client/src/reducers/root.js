import { combineReducers } from "redux";
import session from "./session";
import subreddits from "./subreddits";
import modal from "./modal";
import errors from "./errors";

const root = combineReducers({
  session,
  subreddits,
  modal,
  errors
});

export default root;
