import { connect } from "react-redux";
import MainFeed from "./MainFeed";
import { toggleRegister, toggleLogin } from "../../actions/modal";
import { fetchAllPosts, fetchSubredditsPosts } from "../../actions/posts";

const mapStateToProps = state => ({
  session: state.session,
  posts: state.posts.all
});

const mapDispatchToProps = dispatch => ({
  toggleRegister: () => dispatch(toggleRegister()),
  toggleLogin: () => dispatch(toggleLogin()),
  fetchAllPosts: () => dispatch(fetchAllPosts()),
  fetchSubredditsPosts: subreddit => dispatch(fetchSubredditsPosts(subreddit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainFeed);
