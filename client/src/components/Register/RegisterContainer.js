import { connect } from "react-redux";
import Register from "./Register";
import { toggleRegister } from "../../actions/modal";
import { register } from "../../actions/session";

const mapStateToProps = state => ({
  isOpen: state.modal.registerOpen
});

const mapDispatchToProps = dispatch => ({
  toggleRegister: () => dispatch(toggleRegister()),
  register: user => dispatch(register(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
