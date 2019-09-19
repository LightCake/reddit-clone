import { connect } from "react-redux";
import MainFeed from "./MainFeed";
import { toggleRegister, toggleLogin } from "../../actions/modal";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  toggleRegister: () => dispatch(toggleRegister()),
  toggleLogin: () => dispatch(toggleLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainFeed);
