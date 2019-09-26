import * as API from "../utils/subreddits";

// Action types
export const RECEIVE_ALL_SUBREDDITS = "RECEIVE_ALL_SUBREDDITS";
export const RECEIVE_SUBREDDIT = "RECEIVE_SUBREDDIT";

// Action creators
export const receiveAllSubreddits = subreddits => ({
  type: RECEIVE_ALL_SUBREDDITS,
  subreddits
});

export const receiveSubreddit = subreddit => ({
  type: RECEIVE_SUBREDDIT,
  subreddit
});

export const fetchAllSubreddits = (setLoading, search) => dispatch => {
  API.fetchAllSubreddits(search).then(res => {
    dispatch(receiveAllSubreddits(res.data));
    setLoading(false);
  });
};

export const createSubreddit = subreddit => dispatch => {
  API.createSubreddit(subreddit).then(res =>
    dispatch(receiveSubreddit(res.data))
  );
};
