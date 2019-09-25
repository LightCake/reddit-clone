import { connect } from "react-redux";
import Post from "./Post";
import { fetchPost } from "../../actions/posts";
import { toggleRegister, toggleLogin } from "../../actions/modal";

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  fetchPost: post_id => dispatch(fetchPost(post_id)),
  toggleRegister: () => dispatch(toggleRegister()),
  toggleLogin: () => dispatch(toggleLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
