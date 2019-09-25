import { connect } from "react-redux";
import PostCard from "./PostCard";
import { upvotePost, downvotePost } from "../../actions/votes";

const mapStateToProps = state => ({
  votes: state.votes.post
});

const mapDispatchToProps = dispatch => ({
  upvotePost: vote => dispatch(upvotePost(vote)),
  downvotePost: vote => dispatch(downvotePost(vote))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCard);
