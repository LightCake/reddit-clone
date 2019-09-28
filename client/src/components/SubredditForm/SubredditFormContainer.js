import { connect } from "react-redux";
import SubredditForm from "./SubredditForm";
import { toggleSubreddit } from "../../actions/modal";
import { createSubreddit } from "../../actions/subreddits";

const mapStateToProps = state => ({
  isOpen: state.modal.subredditOpen
});

const mapDispatchToProps = dispatch => ({
  toggleSubreddit: () => dispatch(toggleSubreddit()),
  createSubreddit: (subreddit, setName) =>
    dispatch(createSubreddit(subreddit, setName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubredditForm);
