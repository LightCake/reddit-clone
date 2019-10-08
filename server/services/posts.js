const { Posts, Communities } = require("../models");

const create = async (user, data) => {
  const { community_id, title, text } = data;
  let success = false;
  const errors = {};
  // Check whether a community with the given id exists.
  const communityExists = await Communities.exists("id", community_id);
  if (!communityExists) {
    errors.community = "Community not found";
  }
  if (Object.keys(errors).length > 0) {
    return { success, errors };
  }
  // Insert new post entry into the database.
  const post = await Posts.create(user.id, parseInt(community_id), title, text);
  success = true;
  return { success, post };
};

const getAll = async community_id => {
  let success = false;
  const errors = {};
  // Check whether the community with the given id exists.
  const communityExists = await Communities.exists("id", community_id);
  if (!communityExists) {
    errors.community = "Community not found";
  }
  if (Object.keys(errors).length > 0) {
    return { success, errors };
  }
  try {
    const posts = await Posts.getAll(community_id);
    return posts;
  } catch (e) {
    console.error(e);
  }
};

const getOne = async post_id => {
  try {
    const post = await Posts.getOne(post_id);
    return post;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  getAll,
  getOne
};
