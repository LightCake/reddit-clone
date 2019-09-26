import { connect } from "react-redux";
import SubredditForm from "./SubredditForm";
import { toggleSubreddit } from "../../actions/modal";
import { createSubreddit } from "../../actions/subreddits";

const mapStateToProps = state => ({
  isOpen: state.modal.subredditOpen
});

const mapDispatchToProps = dispatch => ({
  toggleSubreddit: () => dispatch(toggleSubreddit()),
  createSubreddit: subreddit => dispatch(createSubreddit(subreddit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubredditForm);
