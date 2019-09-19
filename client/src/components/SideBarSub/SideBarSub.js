import React from "react";
import PropTypes from "prop-types";
import "./SideBarSub.css";

const SideBarSub = props => {
  const { name } = props;

  return (
    <div className="sidebar_sub">
      <div className="sidebar_sub_name">{name}</div>
    </div>
  );
};

SideBarSub.propTypes = {};

export default SideBarSub;
