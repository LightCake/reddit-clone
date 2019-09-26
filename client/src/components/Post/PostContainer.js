import { connect } from "react-redux";
import Post from "./Post";
import { fetchPost } from "../../actions/posts";
import { toggleRegister, toggleLogin } from "../../actions/modal";
import { fetchPostComments, addPostComment } from "../../actions/comments";
import { setSubreddit } from "../../actions/subreddits";

const mapStateToProps = state => ({
  session: state.session,
  comments: state.comments.post,
  post: state.posts.specific
});

const mapDispatchToProps = dispatch => ({
  fetchPost: (post_id, setPostLoading) =>
    dispatch(fetchPost(post_id, setPostLoading)),
  toggleRegister: () => dispatch(toggleRegister()),
  toggleLogin: () => dispatch(toggleLogin()),
  fetchPostComments: (post_id, setCommentsLoading) =>
    dispatch(fetchPostComments(post_id, setCommentsLoading)),
  addPostComment: comment => dispatch(addPostComment(comment)),
  setSubreddit: subreddit => dispatch(setSubreddit(subreddit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
