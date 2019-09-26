import { combineReducers } from "redux";
import session from "./session";
import subreddits from "./subreddits";
import modal from "./modal";
import posts from "./posts";
import votes from "./votes";
import comments from "./comments";
import errors from "./errors";

const root = combineReducers({
  session,
  subreddits,
  posts,
  modal,
  votes,
  comments,
  errors
});

export default root;
