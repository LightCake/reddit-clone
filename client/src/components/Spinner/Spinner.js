import React from "react";
import PropTypes from "prop-types";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner_container">
      <div className="spinner" />
    </div>
  );
};

Spinner.propTypes = {};

export default Spinner;
