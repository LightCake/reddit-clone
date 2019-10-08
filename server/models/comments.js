const db = require("../db");

const exists = async (column, value) => {
  const result = await db("users")
    .count("*")
    .where({ [column]: value });
  return parseInt(result[0].count) > 0;
};

const create = async (post_id, parent_comment_id, user_id, text) => {
  const result = await db("comments").insert(
    {
      parent_comment_id,
      user_id,
      post_id,
      text
    },
    ["*"]
  );
  return result[0];
};

const findBy = async (column, value) => {
  const result = await db("comments")
    .where({ [column]: value })
    .select();
  return result;
};

module.exports = {
  exists,
  create,
  findBy
};
