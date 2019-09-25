import { RECEIVE_POST_VOTES, RECEIVE_VOTE } from "../actions/votes";

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
    case RECEIVE_VOTE:
      const index = state.post.findIndex(vote => vote.id === action.vote.id);
      if (index === -1) {
        return {
          ...state,
          post: [...state.post, action.vote]
        };
      } else {
        return {
          ...state,
          post: state.post.map(vote =>
            vote.id === action.vote.id ? action.vote : vote
          )
        };
      }
    default:
      return state;
  }
};
