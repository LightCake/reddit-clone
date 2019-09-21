import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "./MainFeed.css";
import Button from "../Button/Button";
import RegisterContainer from "../Register/RegisterContainer";
import LoginContainer from "../Login/LoginContainer";
import PostCard from "../PostCard/PostCard";

const options = [
  { value: "newest", label: "Newest" },
  { value: "top", label: "Top" }
];

const MainFeed = props => {
  const {
    toggleRegister,
    toggleLogin,
    session,
    match,
    fetchAllPosts,
    fetchSubredditsPosts,
    posts
  } = props;

  const [selectedSort, setselectedSort] = useState({
    value: "newest",
    label: "Newest"
  });

  useEffect(() => {
    if (match.params.subreddit === undefined) {
      fetchAllPosts();
    } else {
      fetchSubredditsPosts(match.params.subreddit);
    }
  }, [match.params.subreddit]);

  const renderAuth = () => {
    return session.isAuthenticated ? (
      <div>Profile</div>
    ) : (
      <React.Fragment>
        <Button label="Register" onClick={toggleRegister} />
        <Button label="Login" onClick={toggleLogin} />
        <RegisterContainer />
        <LoginContainer />
      </React.Fragment>
    );
  };

  return (
    <div className="main_feed">
      <div className="main_feed_header">
        <div className="main_feed_header_left">
          <div className="main_feed_select">
            <span className="main_feed_select_label">Sort</span>
            <Select
              value={selectedSort}
              onChange={setselectedSort}
              options={options}
              className="main_feed_sort"
            />
          </div>
        </div>
        <div className="main_feed_header_right">{renderAuth()}</div>
      </div>
      <div className="main_feed_posts">
        {posts.map(post => (
          <PostCard title={post.title} text={post.text} />
        ))}
      </div>
    </div>
  );
};

MainFeed.propTypes = {};

export default MainFeed;
