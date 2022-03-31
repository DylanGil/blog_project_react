export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("comments").del()
  await knex("comments").insert([
    {
      id: 1,
      post_id: 2,
      user_displayName: "test",
      user_id: 2,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam nisi, consectetur et quam ut, vehicula auctor risus. Ut vel tristique orci, ut faucibus lorem. Maecenas vitae dui ut ante tempus dignissim. Proin tempor, arcu nec congue placerat, elit massa condimentum felis, a maximus ex purus in quam. Sed pretium libero vitae libero dictum convallis. Fusce tempor lacus eu enim lobortis dictum. Etiam a mi sit amet risus laoreet dignissim eget sed enim. Curabitur sapien lacus, tempus id ex ac, mattis ullamcorper felis. Vestibulum sit amet tincidunt quam. Nunc ornare sed enim eu pretium. Cras at condimentum elit. Nulla tempor tempus est, hendrerit auctor enim ultricies non. Donec interdum varius fringilla. In nec porttitor ante. Vestibulum congue non mi eget lobortis. In tempus ipsum lacus, eget tincidunt augue sagittis eget. Phasellus tristique interdum lorem eget vulputate.",
    },
    {
      id: 2,
      post_id: 2,
      user_displayName: "Admin",
      user_id: 3,
      content: "C'est mon commentaire",
    },
    {
      id: 3,
      post_id: 2,
      user_displayName: "Admin",
      user_id: 3,
      content:
        "bah au faite tu vois la derniere fois bah cetait pas vrai au faite MAIS NON ",
    },
    {
      id: 4,
      post_id: 2,
      user_displayName: "test",
      user_id: 3,
      content: "YA PAS WESH! ",
    },
  ])
}
