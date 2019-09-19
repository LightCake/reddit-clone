import React from "react";
import PropTypes from "prop-types";
import "./Main.css";
import SideBarContainer from "../SideBar/SideBarContainer";
import MainFeedContainer from "../MainFeed/MainFeedContainer";

const Main = props => {
  return (
    <div className="main">
      <SideBarContainer />
      <MainFeedContainer />
    </div>
  );
};

Main.propTypes = {};

export default Main;
