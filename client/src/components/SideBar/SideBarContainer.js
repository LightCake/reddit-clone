import { connect } from "react-redux";
import SideBar from "./SideBar";
import { fetchAllSubreddits } from "../../actions/subreddits";

const mapStateToProps = state => ({
  subreddits: state.subreddits
});

const mapDispatchToProps = dispatch => ({
  fetchAllSubreddits: (setLoading, search) =>
    dispatch(fetchAllSubreddits(setLoading, search))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
