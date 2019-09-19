import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = props => {
  const { type, label, style, onClick } = props;

  return (
    <button type={type} className="button" style={style} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {};

export default Button;
