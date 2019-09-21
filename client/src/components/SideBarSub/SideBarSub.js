import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./SideBarSub.css";

const SideBarSub = props => {
  const { name, history } = props;

  const handleClick = () => history.push(`/r/${name}`);

  return (
    <div className="sidebar_sub" onClick={handleClick}>
      <div className="sidebar_sub_name">{name}</div>
    </div>
  );
};

SideBarSub.propTypes = {};

export default withRouter(SideBarSub);
