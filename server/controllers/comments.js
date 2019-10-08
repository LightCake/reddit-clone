const { commentServices } = require("../services");

const create = async (req, res) => {
  try {
    const { success, comment, errors } = await commentServices.create(
      req.user,
      req.body,
      req.params.id
    );
    if (success) {
      return res.send(comment);
    }
    return res.status(422).send(errors);
  } catch (e) {
    console.error(e);
  }
};

// Get all comments of a post.
const getByPost = async (req, res) => {
  try {
    const comments = await commentServices.getByPost(req.params.id);
    res.send(comments);
  } catch (e) {
    console.error(e);
  }
};

// Get all comments of an user.
const getByUser = async (req, res) => {
  try {
    const comments = await commentServices.getByUser(req.params.id);
    res.send(comments);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  getByPost,
  getByUser
};
