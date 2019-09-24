import { combineReducers } from "redux";
import session from "./session";
import subreddits from "./subreddits";
import modal from "./modal";
import posts from "./posts";
import votes from "./votes";
import errors from "./errors";

const root = combineReducers({
  session,
  subreddits,
  posts,
  modal,
  votes,
  errors
});

export default root;
