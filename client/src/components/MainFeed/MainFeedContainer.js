import { connect } from "react-redux";
import MainFeed from "./MainFeed";
import { toggleRegister, toggleLogin } from "../../actions/modal";
import { fetchAllPosts } from "../../actions/posts";
import { fetchPostVotes } from "../../actions/votes";

const mapStateToProps = state => ({
  session: state.session,
  posts: state.posts.all
});

const mapDispatchToProps = dispatch => ({
  toggleRegister: () => dispatch(toggleRegister()),
  toggleLogin: () => dispatch(toggleLogin()),
  fetchAllPosts: subreddit => dispatch(fetchAllPosts(subreddit)),
  fetchPostVotes: () => dispatch(fetchPostVotes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainFeed);
