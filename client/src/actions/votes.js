import * as API from "../utils/votes";

// Action types
export const RECEIVE_POST_VOTES = "RECEIVE_POST_VOTES";
export const RECEIVE_VOTE = "RECEIVE_VOTE";
export const RECEIVE_VOTE_DELTA = "RECEIVE_VOTE_DELTA";

export const receivePostVotes = post_votes => ({
  type: RECEIVE_POST_VOTES,
  post_votes
});

export const receiveVote = vote => ({
  type: RECEIVE_VOTE,
  vote
});

export const receiveVoteDelta = data => ({
  type: RECEIVE_VOTE_DELTA,
  data
});

export const fetchPostVotes = () => dispatch => {
  API.fetchPostVotes().then(res => dispatch(receivePostVotes(res.data)));
};

export const upvotePost = user_vote => dispatch => {
  API.upvotePost(user_vote.post_id).then(res => {
    dispatch(receiveVote(res.data[0]));
    const vote_delta = res.data[0].vote - user_vote.vote;
    const data = { vote_delta, post_id: user_vote.post_id };
    dispatch(receiveVoteDelta(data));
  });
};

export const downvotePost = user_vote => dispatch => {
  API.downvotePost(user_vote.post_id).then(res => {
    dispatch(receiveVote(res.data[0]));
    const vote_delta = res.data[0].vote - user_vote.vote;
    const data = { vote_delta, post_id: user_vote.post_id };
    dispatch(receiveVoteDelta(data));
  });
};
