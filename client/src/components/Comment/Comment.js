import React from "react";
import PropTypes from "prop-types";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { FaCommentAlt } from "react-icons/fa";
import "./Comment.css";

const Comment = ({ comment }) => {
  const nestedComments = (comment.children || []).map(comment => (
    <Comment comment={comment} />
  ));
  console.log("Comment: ", comment);
  return (
    <div className="comment_container">
      <div className="comment_arrows_container">
        <div className="comment_arrows">
          <div className="comment_upvote">
            <TiArrowUpThick size="1.5rem" />
          </div>
          <div className="comment_downvote">
            <TiArrowDownThick size="1.5rem" />
          </div>
        </div>
      </div>
      <div className="comment_main">
        <div className="comment_header">
          <div className="comment_author">pfojex</div>
          <div className="comment_votes">22 points</div>
          <div className="comment_time">1 hour ago</div>
        </div>
        <div className="comment_text">{comment.text}</div>
        <div className="comment_footer">
          <div className="comment_reply">
            <FaCommentAlt />
            <div className="comment_reply_text">Reply</div>
          </div>
        </div>
        {nestedComments}
      </div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
