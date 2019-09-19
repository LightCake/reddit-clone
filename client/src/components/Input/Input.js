import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = props => {
  const { label, type, value, onChange } = props;

  return (
    <div className="input_container">
      <span className="input_label">{label}</span>
      <input type={type} value={value} onChange={onChange} className="input" />
    </div>
  );
};

Input.propTypes = {};

export default Input;
