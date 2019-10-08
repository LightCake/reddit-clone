const db = require("../db");

const exists = async (column, value) => {
  const result = await db("communities")
    .count("*")
    .where({ [column]: value });
  return parseInt(result[0].count) > 0;
};

const create = async (user_id, name) => {
  const result = await db("communities").insert({ user_id, name }, ["*"]);
  return result[0];
};

const search = async name => {
  const result = await db("communities")
    .select()
    .where("name", "ilike", name + "%");
  return result;
};

module.exports = {
  exists,
  create,
  search
};
