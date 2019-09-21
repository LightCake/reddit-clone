import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PostForm.css";
import Input from "../Input/Input";
import Button from "../Button/Button";

const PostForm = props => {
  const { addPost, user, match } = props;

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const update = fn => event => {
    fn(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = {
      post: { title, text },
      subreddit: match.params.subreddit
    };
    addPost(data);
  };
  return (
    <div className="post_form_container">
      <form onSubmit={handleSubmit} className="post_form">
        <Input label="Title" onChange={update(setTitle)} value={title} />
        <textarea
          className="post_form_text"
          onChange={update(setText)}
          value={text}
        />
        <Button type="submit" label="Post" className="post_form_button" />
      </form>
    </div>
  );
};

PostForm.propTypes = {};

export default PostForm;
