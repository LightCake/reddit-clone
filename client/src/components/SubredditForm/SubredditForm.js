import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "./SubredditForm.css";
import Button from "../Button/Button";
import Input from "../Input/Input";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "1rem"
  }
};

Modal.setAppElement("#root");

const SubredditForm = ({ isOpen, toggleSubreddit, createSubreddit }) => {
  const [name, setName] = useState("");

  const update = fn => event => {
    fn(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    createSubreddit({ name });
    setName("");
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Subreddit Form">
      <div className="subreddit_header">
        <Button
          label="x"
          className="subreddit_close"
          onClick={toggleSubreddit}
        ></Button>
      </div>
      <form className="subreddit_form" onSubmit={handleSubmit}>
        <Input
          label="Subreddit Name"
          type="text"
          value={name}
          onChange={update(setName)}
        />
        <Button type="submit" label="Create" />
      </form>
    </Modal>
  );
};

SubredditForm.propTypes = {};

export default SubredditForm;
