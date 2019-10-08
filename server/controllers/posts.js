const { postServices } = require("../services");

const create = async (req, res) => {
  try {
    const { success, post, errors } = await postServices.create(
      req.user,
      req.body
    );
    if (success) {
      return res.status(201).send(post);
    }
    res.status(422).send(errors);
  } catch (e) {
    console.error(e);
  }
};

const getAll = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await postServices.getAll(id);
    console.log("Posts: ", posts);
    res.send(posts);
  } catch (e) {
    console.error(e);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postServices.getOne(id);
    res.send(post);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  getAll,
  getOne
};
