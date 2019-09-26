import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { FaCommentAlt } from "react-icons/fa";
import "./Post.css";
import Button from "../Button/Button";
import RegisterContainer from "../Register/RegisterContainer";
import LoginContainer from "../Login/LoginContainer";
import CommentContainer from "../Comment/CommentContainer";
import Spinner from "../Spinner/Spinner";
import { timeSince, commentFormat, displayNewline } from "../../utils/posts";

const Post = ({
  fetchPost,
  match,
  session,
  comments,
  post,
  toggleRegister,
  toggleLogin,
  fetchPostComments,
  addPostComment
}) => {
  const [comment, setComment] = useState("");
  const [postLoading, setPostLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    fetchPost(match.params.id, setPostLoading);
    fetchPostComments(match.params.id, setCommentsLoading);
  }, []);

  const nestComments = comments => {
    const commentMap = comments.reduce((acc, current) => {
      acc[current.id] = current;
      return acc;
    }, {});

    comments.forEach(comment => {
      if (comment.comment_id !== null) {
        const parent = commentMap[comment.comment_id];
        (parent.children = parent.children || []).push(comment);
      }
    });

    return Object.values(commentMap).filter(
      comment => comment.comment_id === null
    );
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const data = { post_id: match.params.id, text: comment };

    addPostComment(data);
    setComment("");
  };

  const renderForm = () =>
    session.isAuthenticated ? (
      <div className="comment_form_container">
        <form className="comment_form" onSubmit={handleFormSubmit}>
          <textarea
            className="comment_form_textarea"
            value={comment}
            onChange={event => setComment(event.target.value)}
          />
          <Button
            type="submit"
            label="Comment"
            className="comment_form_submit"
          />
        </form>
      </div>
    ) : (
      <div className="auth_request_container">
        <div className="auth_request">
          <div className="auth_request_text">
            What are your thoughts? Log in or Register
          </div>
          <div className="auth_request_buttons">
            <Button label="Register" onClick={toggleRegister} />
            <Button label="Login" onClick={toggleLogin} />
            <RegisterContainer />
            <LoginContainer />
          </div>
        </div>
      </div>
    );

  return (
    <div className="post_container">
      {postLoading ? (
        <Spinner />
      ) : (
        <div className="post">
          <div className="post_vote_container">
            <div className="post_vote">
              <div className="post_upvote">
                <TiArrowUpThick size="1.5rem" />
              </div>
              <div className="post_vote_number">2</div>
              <div className="post_downvote">
                <TiArrowDownThick size="1.5rem" />
              </div>
            </div>
          </div>
          <div className="post_main">
            <div className="post_main_header">
              <div className="post_author">
                Posted by{" "}
                <Link to="/" className="post_author_link">
                  {`u/${post.username}`}
                </Link>
              </div>
              <div className="post_time">{timeSince(post.created)} ago</div>
            </div>
            <div className="post_main_center">
              <div className="post_title">{post.title}</div>
              <div className="post_text">{displayNewline(post.text)}</div>
            </div>
            <div className="post_main_footer">
              <div className="post_footer_comments">
                <FaCommentAlt />
                <div className="post_comment_number">
                  {commentFormat(post.comments)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {renderForm()}
      {commentsLoading ? (
        <Spinner />
      ) : (
        <div className="post_comments_container">
          {nestComments(comments).map(comment => (
            <CommentContainer comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

Post.propTypes = {};

export default Post;
