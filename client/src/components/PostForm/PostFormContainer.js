import { connect } from "react-redux";
import PostForm from "./PostForm";
import { addPost } from "../../actions/posts";

const mapStateToProps = state => ({
  user: state.session.user
});

const mapDispatchToProps = dispatch => ({
  addPost: data => dispatch(addPost(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
