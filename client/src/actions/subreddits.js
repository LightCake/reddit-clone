import * as API from "../utils/subreddits";

// Action types
export const RECEIVE_ALL_SUBREDDITS = "RECEIVE_ALL_SUBREDDITS";

// Action creators
export const receiveAllSubreddits = subreddits => ({
  type: RECEIVE_ALL_SUBREDDITS,
  subreddits
});

export const fetchAllSubreddits = (setLoading, search) => dispatch => {
  API.fetchAllSubreddits(search).then(res => {
    dispatch(receiveAllSubreddits(res.data));
    setLoading(false);
  });
};
