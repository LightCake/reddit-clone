const db = require("../db");

const exists = async (column, value) => {
  const result = await db("posts")
    .count("*")
    .where({ [column]: value });
  return parseInt(result[0].count) > 0;
};

const create = async (user_id, community_id, title, text = null) => {
  const result = await db("posts").insert(
    { user_id, community_id, title, text },
    ["*"]
  );
  return result[0];
};

const getAll = async community_id => {
  const result = await db("posts")
    .select()
    .modify(queryBuilder => {
      if (community_id) {
        queryBuilder.where({ community_id });
      }
    });
  console.log("Result: ", result);
  return result;
};

const getOne = async post_id => {
  try {
    const result = await db("posts")
      .select()
      .where({ id: post_id });
    return result[0];
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  exists,
  create,
  getAll,
  getOne
};
