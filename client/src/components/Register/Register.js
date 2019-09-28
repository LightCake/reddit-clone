import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "./Register.css";
import Input from "../Input/Input";
import Button from "../Button/Button";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "1rem"
  }
};

Modal.setAppElement("#root");

const Register = props => {
  const { isOpen, toggleRegister, register, history } = props;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const update = fn => event => {
    fn(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const user = { name, password, password2 };
    register(user, history);
    setName("");
    setPassword("");
    setPassword2("");
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Register Form">
      <div className="register_header">
        <Button
          label="x"
          onClick={toggleRegister}
          style={{ height: "1.5rem", width: "1.5rem", padding: "0" }}
        ></Button>
      </div>
      <form className="register_form" onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          value={name}
          onChange={update(setName)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={update(setPassword)}
        />
        <Input
          label="Confirm Password"
          type="password"
          value={password2}
          onChange={update(setPassword2)}
        />
        <Button type="submit" label="Register" />
      </form>
    </Modal>
  );
};

Register.propTypes = {};

export default Register;
