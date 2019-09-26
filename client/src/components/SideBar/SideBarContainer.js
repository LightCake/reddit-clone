import { connect } from "react-redux";
import SideBar from "./SideBar";
import { fetchAllSubreddits } from "../../actions/subreddits";
import { toggleSubreddit } from "../../actions/modal";

const mapStateToProps = state => ({
  subreddits: state.subreddits,
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  fetchAllSubreddits: (setLoading, search) =>
    dispatch(fetchAllSubreddits(setLoading, search)),
  toggleSubreddit: () => dispatch(toggleSubreddit())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
