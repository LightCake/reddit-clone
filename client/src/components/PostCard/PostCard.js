import React from "react";
import PropTypes from "prop-types";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { FaCommentAlt } from "react-icons/fa";
import "./PostCard.css";
import Button from "../Button/Button";
import { timeSince, commentFormat } from "../../utils/posts";

const PostCard = props => {
  const { title, text, username, subreddit, votes, time, comments } = props;

  return (
    <div className="postcard">
      <div className="postcard_sidebar">
        <div className="postcard_arrows">
          <div className="postcard_vote postcard_upvote">
            <TiArrowUpThick size="1.5rem" />
          </div>
          <div className="postcard_votes">{votes}</div>
          <div className="postcard_vote postcard_downvote">
            <TiArrowDownThick size="1.5rem" />
          </div>
        </div>
      </div>
      <div className="postcard_main">
        <div className="postcard_main_header">
          <div className="postcard_main_subreddit">r/{subreddit}</div>
          <div className="postcard_main_dot">•</div>
          <div className="postcard_main_author">Posted by u/{username}</div>
          <div className="postcard_main_time">{timeSince(time)} ago</div>
          <Button label="+ Join" className="postcard_join" />
        </div>
        <div className="postcard_main_center">
          <div className="postcard_main_title">{title}</div>
          <div className="postcard_main_text">{text}</div>
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

export default PostCard;
