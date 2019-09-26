import { connect } from "react-redux";
import Post from "./Post";
import { fetchPost } from "../../actions/posts";
import { toggleRegister, toggleLogin } from "../../actions/modal";
import { fetchPostComments, addPostComment } from "../../actions/comments";

const mapStateToProps = state => ({
  session: state.session,
  comments: state.comments.post
});

const mapDispatchToProps = dispatch => ({
  fetchPost: post_id => dispatch(fetchPost(post_id)),
  toggleRegister: () => dispatch(toggleRegister()),
  toggleLogin: () => dispatch(toggleLogin()),
  fetchPostComments: post_id => dispatch(fetchPostComments(post_id)),
  addPostComment: comment => dispatch(addPostComment(comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
