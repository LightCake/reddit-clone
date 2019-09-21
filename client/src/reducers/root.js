import { combineReducers } from "redux";
import session from "./session";
import subreddits from "./subreddits";
import modal from "./modal";
import posts from "./posts";
import errors from "./errors";

const root = combineReducers({
  session,
  subreddits,
  posts,
  modal,
  errors
});

export default root;
