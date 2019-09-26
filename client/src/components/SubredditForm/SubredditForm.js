import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "./SubredditForm.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import OrangeStairs from "../../assets/orange_stairs.jpg";

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
    padding: "0",
    height: "20rem",
    width: "30rem"
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
      <div className="subreddit_form_modal">
        <img
          src={OrangeStairs}
          alt="orange stairs"
          className="subreddit_form_image"
        />
        <div className="subreddit_form_right">
          <div className="subreddit_header">
            <Button
              label="x"
              style={{ height: "1.5rem", width: "1.5rem", padding: "0" }}
              onClick={toggleSubreddit}
            />
          </div>
          <div className="subreddit_form_container">
            <form className="subreddit_form" onSubmit={handleSubmit}>
              <Input
                label="Subreddit"
                type="text"
                value={name}
                onChange={update(setName)}
              />
              <Button
                type="submit"
                label="Create"
                className="subreddit_form_button"
              />
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

SubredditForm.propTypes = {};

export default SubredditForm;
