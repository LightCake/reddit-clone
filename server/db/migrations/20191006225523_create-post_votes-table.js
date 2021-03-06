exports.up = function(knex) {
  return knex.schema.createTable("post_votes", table => {
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable();
    table
      .integer("post_id")
      .references("id")
      .inTable("posts")
      .notNullable();
    table.boolean("vote").notNullable();
    table.timestamps(true, true);
    table.primary(["user_id", "post_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("post_votes");
};
