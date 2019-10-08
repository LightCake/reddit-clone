const db = require("../db");

const exists = async (column, value) => {
  const result = await db("users")
    .count("*")
    .where({ [column]: value });
  return parseInt(result[0].count) > 0;
};

const create = async (name, email, password) => {
  const result = await db("users").insert({ name, email, password }, ["*"]);
  return result[0];
};

const findBy = async (column, value) => {
  const result = await db("users")
    .where({ [column]: value })
    .select("*");
  return result[0];
};

module.exports = {
  exists,
  create,
  findBy
};
