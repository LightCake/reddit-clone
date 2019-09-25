import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { FaCommentAlt } from "react-icons/fa";
import "./Post.css";
import Button from "../Button/Button";
import RegisterContainer from "../Register/RegisterContainer";
import LoginContainer from "../Login/LoginContainer";

const Post = ({ fetchPost, match, session, toggleRegister, toggleLogin }) => {
  useEffect(() => {
    fetchPost(match.params.id);
  }, []);

  const renderForm = () =>
    session.isAuthenticated ? (
      <div className="comment_form_container">
        <form className="comment_form">
          <textarea className="comment_form_textarea" />
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
                u/Maria
              </Link>
            </div>
            <div className="post_time">4 days ago</div>
          </div>
          <div className="post_main_center">
            <div className="post_title">Genie: I shall grant you 3 wishes</div>
            <div className="post_text">
              Even worse! Genie lawyers! For when they don't give you all your
              wishes or when your wish didn't come out as you planned. It avoids
              the old genie ways where you'd wish you could jump really high and
              be turned into a frog.
            </div>
          </div>
          <div className="post_main_footer">
            <div className="post_footer_comments">
              <FaCommentAlt />
              <div className="post_comment_number">50 comments</div>
            </div>
          </div>
        </div>
      </div>
      {renderForm()}
    </div>
  );
};

Post.propTypes = {};

export default Post;
