export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments().unique()
    table.string("displayName").notNullable().unique()
    table.string("email").notNullable().unique()
    table.string("passwordHash", 600).notNullable()
    table.string("passwordSalt", 600).notNullable()
    table.string("role").notNullable()
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt")
  })

  await knex.schema.createTable("posts", (table) => {
    table.increments().unique()
    table.string("title").notNullable()
    table.string("content").notNullable()
    table.date("publicationDate").notNullable()
    table.integer("user_id")
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt")
  })

  await knex.schema.createTable("comments", (table) => {
    table.increments().unique()
    table.string("content").notNullable()
    table.date("publicationDate").notNullable()
    table.integer("user_id")
    table.integer("post_id").notNullable()
    table.timestamp("createdAt").defaultTo(knex.fn.now())
    table.timestamp("updatedAt")
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("comments")
  await knex.schema.dropTable("posts")
  await knex.schema.dropTable("users")
}
