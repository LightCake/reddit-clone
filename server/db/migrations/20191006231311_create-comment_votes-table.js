exports.up = function(knex) {
  return knex.schema.createTable("comment_votes", table => {
    table
      .integer("user_id")
      .references("id")
      .inTable("users");
    table
      .integer("comment_id")
      .references("id")
      .inTable("comments");
    table.boolean("vote").notNullable();
    table.timestamps(true, true);
    table.primary(["user_id", "comment_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comment_votes");
};
