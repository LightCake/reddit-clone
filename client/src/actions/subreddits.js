import * as API from "../utils/subreddits";

// Action types
export const RECEIVE_ALL_SUBREDDITS = "RECEIVE_ALL_SUBREDDITS";

// Action creators
export const receiveAllSubreddits = subreddits => ({
  type: RECEIVE_ALL_SUBREDDITS,
  subreddits
});

// TODO
export const fetchAllSubreddits = () => dispatch => {
  API.fetchAllSubreddits().then(res => console.log(res));
};
