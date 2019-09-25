import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "./Login.css";
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

const Login = props => {
  const { isOpen, toggleLogin, login } = props;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const update = fn => event => {
    fn(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const user = { name, password };
    login(user);
    setName("");
    setPassword("");
  };

  return (
    <div className="login">
      <Modal isOpen={isOpen} style={customStyles} contentLabel="Login Form">
        <div className="login_header">
          <Button
            label="x"
            style={{ padding: "0", height: "1.5rem", width: "1.5rem" }}
            onClick={toggleLogin}
          ></Button>
        </div>
        <form className="login_form" onSubmit={handleSubmit}>
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
          <Button type="submit" label="Login" />
        </form>
      </Modal>
    </div>
  );
};

Login.propTypes = {};

export default Login;
