import { RECEIVE_POST_VOTES, RECEIVE_UPVOTE } from "../actions/votes";

const initialState = {
  post: [],
  comment: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POST_VOTES:
      return {
        ...state,
        post: action.post_votes
      };
    case RECEIVE_UPVOTE:
      return {
        ...state,
        post: state.post.map(vote =>
          vote.id === action.vote.id ? action.vote : vote
        )
      };
    default:
      return state;
  }
};
