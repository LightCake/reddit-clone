import * as API from "../utils/votes";

// Action types
export const RECEIVE_POST_VOTES = "RECEIVE_POST_VOTES";
export const RECEIVE_UPVOTE = "RECEIVE_UPVOTE";
export const RECEIVE_UPVOTE_DELTA = "RECEIVE_UPVOTE_DELTA";

export const receivePostVotes = post_votes => ({
  type: RECEIVE_POST_VOTES,
  post_votes
});

export const receiveUpvote = vote => ({
  type: RECEIVE_UPVOTE,
  vote
});

export const receiveUpvoteDelta = data => ({
  type: RECEIVE_UPVOTE_DELTA,
  data
});

export const fetchPostVotes = () => dispatch => {
  API.fetchPostVotes().then(res => dispatch(receivePostVotes(res.data)));
};

export const upvotePost = user_vote => dispatch => {
  API.upvotePost(user_vote.post_id).then(res => {
    dispatch(receiveUpvote(res.data[0]));
    const upvote_delta = res.data[0].vote - user_vote.vote;
    const data = { upvote_delta, post_id: user_vote.post_id };
    dispatch(receiveUpvoteDelta(data));
  });
};
