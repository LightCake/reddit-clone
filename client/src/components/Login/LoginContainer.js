import { connect } from "react-redux";
import Login from "./Login";
import { login, receiveErrors, clearErrors } from "../../actions/session";
import { toggleLogin } from "../../actions/modal";

const mapStateToProps = state => ({
  errors: state.errors.session,
  isOpen: state.modal.loginOpen
});

const mapDispatchToProps = dispatch => ({
  login: (user, history) => dispatch(login(user, history)),
  receiveErrors: errors => dispatch(receiveErrors(errors)),
  clearErrors: () => dispatch(clearErrors()),
  toggleLogin: () => dispatch(toggleLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
