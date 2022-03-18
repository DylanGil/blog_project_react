export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("posts").del()
  await knex("posts").insert([
    {
      id: 1,
      title: "test1",
      user_displayName: "Dylan1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam nisi, consectetur et quam ut, vehicula auctor risus. Ut vel tristique orci, ut faucibus lorem. Maecenas vitae dui ut ante tempus dignissim. Proin tempor, arcu nec congue placerat, elit massa condimentum felis, a maximus ex purus in quam. Sed pretium libero vitae libero dictum convallis. Fusce tempor lacus eu enim lobortis dictum. Etiam a mi sit amet risus laoreet dignissim eget sed enim. Curabitur sapien lacus, tempus id ex ac, mattis ullamcorper felis. Vestibulum sit amet tincidunt quam. Nunc ornare sed enim eu pretium. Cras at condimentum elit. Nulla tempor tempus est, hendrerit auctor enim ultricies non. Donec interdum varius fringilla. In nec porttitor ante. Vestibulum congue non mi eget lobortis. In tempus ipsum lacus, eget tincidunt augue sagittis eget. Phasellus tristique interdum lorem eget vulputate.",
    },
    {
      id: 2,
      title: "test2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam nisi, consectetur et quam ut, vehicula auctor risus. Ut vel tristique orci, ut faucibus lorem. Maecenas vitae dui ut ante tempus dignissim. Proin tempor, arcu nec congue placerat, elit massa condimentum felis, a maximus ex purus in quam. Sed pretium libero vitae libero dictum convallis. Fusce tempor lacus eu enim lobortis dictum. Etiam a mi sit amet risus laoreet dignissim eget sed enim. Curabitur sapien lacus, tempus id ex ac, mattis ullamcorper felis. Vestibulum sit amet tincidunt quam. Nunc ornare sed enim eu pretium. Cras at condimentum elit. Nulla tempor tempus est, hendrerit auctor enim ultricies non. Donec interdum varius fringilla. In nec porttitor ante. Vestibulum congue non mi eget lobortis. In tempus ipsum lacus, eget tincidunt augue sagittis eget. Phasellus tristique interdum lorem eget vulputate.",
    },
    {
      id: 3,
      title: "test3",
      user_displayName: "Dylan3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quam nisi, consectetur et quam ut, vehicula auctor risus. Ut vel tristique orci, ut faucibus lorem. Maecenas vitae dui ut ante tempus dignissim. Proin tempor, arcu nec congue placerat, elit massa condimentum felis, a maximus ex purus in quam. Sed pretium libero vitae libero dictum convallis. Fusce tempor lacus eu enim lobortis dictum. Etiam a mi sit amet risus laoreet dignissim eget sed enim. Curabitur sapien lacus, tempus id ex ac, mattis ullamcorper felis. Vestibulum sit amet tincidunt quam. Nunc ornare sed enim eu pretium. Cras at condimentum elit. Nulla tempor tempus est, hendrerit auctor enim ultricies non. Donec interdum varius fringilla. In nec porttitor ante. Vestibulum congue non mi eget lobortis. In tempus ipsum lacus, eget tincidunt augue sagittis eget. Phasellus tristique interdum lorem eget vulputate.",
    },
    {
      id: 4,
      title: "Dylan Trop FOrt",
      user_displayName: "Dylan3",
      content:
        "Et bah au faite, c'etaiut pour dire que dylan il est trop fort et en meme temps trop amoureux de sa cherie",
    },
  ])
}
