import { connect } from "react-redux";
import SideBarSub from "./SideBarSub";

const mapStateToProps = state => ({
  subreddit: state.subreddits.current
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarSub);
