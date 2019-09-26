import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./SideBar.css";
import Input from "../Input/Input";
import Spinner from "../Spinner/Spinner";
import SubredditFormContainer from "../SubredditForm/SubredditFormContainer";
import SidebarSubContainer from "../SideBarSub/SidebarSubContainer";

const SideBar = ({
  subreddits,
  fetchAllSubreddits,
  toggleSubreddit,
  session,
  match
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllSubreddits(setLoading);
  }, []);

  const handleInputChange = event => {
    fetchAllSubreddits(setLoading, event.target.value);
  };
  console.log("Props Match: ", match);
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar_logo_link">
        <img src={Logo} alt="logo" className="sidebar_logo" />
      </Link>

      <div className="sidebar_group">
        <span className="sidebar_subreddits_header">Subreddits</span>
        {session.isAuthenticated && (
          <React.Fragment>
            <button className="sidebar_subreddit_add" onClick={toggleSubreddit}>
              +
            </button>
            <SubredditFormContainer />
          </React.Fragment>
        )}
      </div>
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
            <SidebarSubContainer key={subreddit.id} name={subreddit.name} />
          ))}
        </div>
      )}
    </div>
  );
};

SideBar.propTypes = {};

export default withRouter(SideBar);
