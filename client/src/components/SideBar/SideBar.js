import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./SideBar.css";
import SideBarSub from "../SideBarSub/SideBarSub";

const SideBar = props => {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar_logo_link">
        <img src={Logo} alt="logo" className="sidebar_logo" />
      </Link>
      <span className="sidebar_subreddits_header">Subreddits</span>
      <div className="sidebar_subreddits">
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
        <SideBarSub name="Askreddit" />
      </div>
    </div>
  );
};

SideBar.propTypes = {};

export default SideBar;
