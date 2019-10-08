const { Comments, Posts, Users } = require("../models");

const create = async (user, data, post_id) => {
  const { parent_comment_id, text } = data;
  let success = false;
  const errors = {};
  try {
    // Check whether a post with the given id exists.
    const postExists = await Posts.exists("id", post_id);
    // If the post does not exist.
    if (!postExists) {
      errors.post = "Post not found";
    }
    // If the parent comment id is not undefined.
    if (parent_comment_id) {
      // Check whether a comment with the given id exists.
      const commentExists = Comments.exists("id", parent_comment_id);
      if (!commentExists) {
        errors.comment = "Comment not found";
      }
    }
    // If any of the errors occured, return false with errors.
    if (Object.keys(errors).length > 0) {
      return { success, errors };
    }
    // Insert new comment into the database.
    const comment = await Comments.create(
      post_id,
      parent_comment_id,
      user.id,
      text
    );
    success = true;
    return { success, comment };
  } catch (e) {
    console.error(e);
  }
};

const getByPost = async post_id => {
  let success = false;
  const errors = {};
  try {
    // Check whether a post with the given id exists.
    const postExists = await Posts.exists("id", post_id);
    // If the post does not exist.
    if (!postExists) {
      errors.post = "Post not found";
    }
    // If the error occured, return false with errors object.
    if (Object.keys(errors).length > 0) {
      return { success, errors };
    }

    const postComments = await Comments.findBy("post_id", post_id);
    success = true;
    return { success, comments: postComments };
  } catch (e) {
    console.error(e);
  }
};

const getByUser = async user_id => {
  let success = false;
  const errors = {};
  try {
    // Check whether a user with the given id exists.
    const userExists = await Users.exists("id", user_id);
    if (!userExists) {
      errors.user = "User not found";
    }
    // If the errors occured, return false with errors object.
    if (Object.keys(errors).length > 0) {
      return { success, errors };
    }
    const comments = await Comments.findBy("user_id", user_id);
    success = true;
    return { success, comments };
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  getByPost,
  getByUser
};
