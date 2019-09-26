import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { FaCommentAlt } from "react-icons/fa";
import "./PostCard.css";
import Button from "../Button/Button";
import { timeSince, commentFormat, displayNewline } from "../../utils/posts";

const PostCard = props => {
  const {
    id,
    title,
    text,
    username,
    subreddit,
    voteNumber,
    upvotePost,
    downvotePost,
    votes,
    time,
    comments,
    history
  } = props;

  const user_vote = votes.find(vote => vote.post_id === id) || {
    post_id: id,
    vote: 0
  };

  const isUpvoted = vote => {
    // Check if we have a vote of the post
    if (user_vote) {
      // If we have found a vote of the post, check whether it is a up- or downvote
      // If the vote is undefined or 'up' and the users vote is an upvote (1) give it a orange color
      // If the vote is undefined or 'down' and the users vote is an downvote (-1) give it a blue color
      switch (user_vote.vote) {
        case 1:
          return vote === undefined || vote === "up" ? "orange" : "";
        case -1:
          return vote === undefined || vote === "down" ? "blue" : "";
        default:
          return;
      }
    } else {
      // User has not voted for the post, return nothing
      return;
    }
  };

  const upvote = user_vote => event => {
    // Prevents the click event of the parent div to trigger
    event.stopPropagation();
    upvotePost(user_vote);
  };

  const downvote = user_vote => event => {
    // Prevents the click event of the parent div to trigger
    event.stopPropagation();
    downvotePost(user_vote);
  };

  const handleClick = event => {
    history.push(`/r/${subreddit}/post/${id}`);
  };

  return (
    <div className="postcard" onClick={handleClick}>
      <div className="postcard_sidebar">
        <div className="postcard_arrows">
          <div
            className={`postcard_vote postcard_upvote ${isUpvoted("up")}`}
            onClick={upvote(user_vote)}
          >
            <TiArrowUpThick size="1.5rem" />
          </div>
          <div className={`postcard_votes ${isUpvoted()}`}>{voteNumber}</div>
          <div
            className={`postcard_vote postcard_downvote ${isUpvoted("down")}`}
            onClick={downvote(user_vote)}
          >
            <TiArrowDownThick size="1.5rem" />
          </div>
        </div>
      </div>
      <div className="postcard_main">
        <div className="postcard_main_header">
          <Link
            className="postcard_main_subreddit link"
            onClick={e => e.stopPropagation()}
            to={`/r/${subreddit}`}
          >
            r/{subreddit}
          </Link>
          <div className="postcard_main_dot">•</div>
          <div className="postcard_main_author">
            Posted by{" "}
            <Link
              to="/"
              className="postcard_author_link"
              onClick={e => e.stopPropagation()}
            >
              {`u/${username}`}
            </Link>
          </div>
          <div className="postcard_main_time">{timeSince(time)} ago</div>
          <Button label="+ Join" className="postcard_join" />
        </div>
        <div className="postcard_main_center">
          <div className="postcard_main_title">{title}</div>
          <div className="postcard_main_text">{displayNewline(text)}</div>
        </div>
        <div className="postcard_main_footer">
          <div className="postcard_footer_comments">
            <FaCommentAlt />
            <span className="postcard_comment_numbers">
              {commentFormat(comments)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {};

export default withRouter(PostCard);
