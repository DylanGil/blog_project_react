export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("users").del()
  await knex("users").insert([
    {
      id: 1,
      displayName: "Dylan",
      email: "123@gmail.com",
      role: "author",
      passwordHash: "1",
      passwordSalt: "1",
    },
    {
      id: 2,
      displayName: "Dylan2",
      email: "1234@gmail.com",
      role: "admin",
      passwordHash: "2",
      passwordSalt: "2",
    },
    {
      id: 3,
      displayName: "Dylan3",
      email: "12345@gmail.com",
      role: "reader",
      passwordHash: "3",
      passwordSalt: "3",
    },
  ])
}
