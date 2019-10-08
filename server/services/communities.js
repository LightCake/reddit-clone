const { Communities } = require("../models");

const create = async (user, data) => {
  let success = false;
  const errors = {};
  try {
    // Check whether the name is already taken.
    const exists = await Communities.exists("name", data.name);
    // If the name is already taken send error message.
    if (exists) {
      errors.name = "Name already taken";
      return { success, errors };
    }
    // Otherwise, create new community.
    const community = await Communities.create(user.id, data.name);
    success = true;
    return { success, community };
  } catch (e) {
    console.error(e);
  }
};

const search = async (name = "") => {
  try {
    const communities = await Communities.search(name);
    return communities;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  search
};
