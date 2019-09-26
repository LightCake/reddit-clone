import * as API from "../utils/comments";

export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";

export const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments
});

export const fetchPostComments = post_id => dispatch => {
  API.fetchPostComments(post_id).then(res =>
    dispatch(receivePostComments(res.data))
  );
};
