import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = props => {
  const { type, label, onClick, className, style } = props;

  return (
    <button
      type={type}
      className={`button ${className === undefined ? "" : className}`}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
};

Button.propTypes = {};

export default Button;
