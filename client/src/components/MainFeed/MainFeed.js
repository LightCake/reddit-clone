import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "./MainFeed.css";
import Button from "../Button/Button";
import RegisterContainer from "../Register/RegisterContainer";
import LoginContainer from "../Login/LoginContainer";
import PostCardContainer from "../PostCard/PostCardContainer";

const MainFeed = props => {
  const {
    toggleRegister,
    toggleLogin,
    session,
    match,
    fetchAllPosts,
    fetchPostVotes,
    setSubreddit,
    logout,
    posts,
    history
  } = props;

  const [selectedSort, setSelectedSort] = useState({
    value: "new",
    label: "New"
  });
  const [selectedTop, setSelectedTop] = useState({
    value: "today",
    label: "Today"
  });

  useEffect(() => {
    fetchAllPosts(match.params.subreddit);
    setSubreddit(match.params.subreddit);
  }, [match.params.subreddit]);

  useEffect(() => {
    if (session.isAuthenticated) {
      fetchPostVotes();
    }
  }, [session.isAuthenticated]);

  const renderAuth = () => {
    return session.isAuthenticated ? (
      <React.Fragment>
        {match.params.subreddit && (
          <Button
            label="Post"
            onClick={() => history.push(history.location.pathname + "/post")}
          />
        )}
        <Button label="Profile" />
        <Button label="Logout" onClick={logout} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Button label="Register" onClick={toggleRegister} />
        <Button label="Login" onClick={toggleLogin} />
        <RegisterContainer />
        <LoginContainer />
      </React.Fragment>
    );
  };
  console.log(history.location.pathname);
  return (
    <div className="main_feed">
      <div className="main_feed_header">
        <div className="main_feed_header_left">
          <div className="main_feed_select_container">
            <span className="main_feed_select_label">Sort</span>
            <Select
              value={selectedSort}
              onChange={setSelectedSort}
              options={[
                { value: "new", label: "New" },
                { value: "top", label: "Top" }
              ]}
              className="main_feed_sort_select"
            />
            {selectedSort.value === "top" && (
              <Select
                value={selectedTop}
                onChange={setSelectedTop}
                options={[
                  { value: "today", label: "Today" },
                  { value: "week", label: "This Week" },
                  { value: "month", label: "This Month" },
                  { value: "year", label: "This Year" },
                  { value: "all", label: "All Time" }
                ]}
                className="main_feed_top_select"
              />
            )}
          </div>
        </div>
        <div className="main_feed_header_right">{renderAuth()}</div>
      </div>
      <div className="main_feed_posts">
        {posts.map(post => (
          <PostCardContainer
            key={post.id}
            id={post.id}
            title={post.title}
            text={post.text}
            username={post.username}
            subreddit={post.subreddit}
            voteNumber={post.votes}
            time={post.created}
            comments={post.comments}
          />
        ))}
      </div>
    </div>
  );
};

MainFeed.propTypes = {};

export default MainFeed;
