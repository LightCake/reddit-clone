exports.up = function(knex) {
  return knex.schema
    .createTable("communities", table => {
      table.increments();
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .notNullable();
      table.string("name", 20).notNullable();
      table.timestamps(true, true);
    })
    .createTable("community_members", table => {
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .notNullable();
      table
        .integer("community_id")
        .references("id")
        .inTable("communities")
        .notNullable();
      table.timestamps(true, true);
      table.primary(["user_id", "community_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("community_members").dropTable("communities");
};
