import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./SideBar.css";
import SideBarSub from "../SideBarSub/SideBarSub";
import Input from "../Input/Input";
import Spinner from "../Spinner/Spinner";

const SideBar = props => {
  const { subreddits, fetchAllSubreddits } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllSubreddits(setLoading);
  }, []);

  const handleInputChange = event => {
    fetchAllSubreddits(setLoading, event.target.value);
  };

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar_logo_link">
        <img src={Logo} alt="logo" className="sidebar_logo" />
      </Link>

      <span className="sidebar_subreddits_header">Subreddits</span>

      <Input
        placeholder="Search"
        className="sidebar_input"
        onChange={handleInputChange}
      />

      {loading ? (
        <Spinner />
      ) : (
        <div className="sidebar_subreddits">
          {subreddits.all.map(subreddit => (
            <SideBarSub key={subreddit.id} name={subreddit.name} />
          ))}
        </div>
      )}
    </div>
  );
};

SideBar.propTypes = {};

export default SideBar;
