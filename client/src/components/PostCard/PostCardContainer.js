import { connect } from "react-redux";
import PostCard from "./PostCard";
import { upvotePost } from "../../actions/votes";

const mapStateToProps = state => ({
  votes: state.votes.post
});

const mapDispatchToProps = dispatch => ({
  upvotePost: vote => dispatch(upvotePost(vote))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCard);
