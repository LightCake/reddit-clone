// Action types
export const TOGGLE_REGISTER = "TOGGLE_REGISTER";
export const TOGGLE_LOGIN = "TOGGLE_LOGIN";
export const TOGGLE_SUBREDDIT = "TOGGLE_SUBREDDIT";

// Action creators
export const toggleRegister = () => ({
  type: TOGGLE_REGISTER
});

export const toggleLogin = () => ({
  type: TOGGLE_LOGIN
});

export const toggleSubreddit = () => ({
  type: TOGGLE_SUBREDDIT
});
