import * as API from "../utils/comments";

export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

export const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments
});

export const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

export const fetchPostComments = (post_id, setCommentsLoading) => dispatch => {
  API.fetchPostComments(post_id).then(res => {
    dispatch(receivePostComments(res.data));
    setCommentsLoading(false);
  });
};

export const addPostComment = comment => dispatch => {
  API.addPostComment(comment).then(res => dispatch(receiveComment(res.data)));
};
