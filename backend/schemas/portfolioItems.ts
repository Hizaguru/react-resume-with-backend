import { defineType, defineField } from "sanity";

export default defineType({
  name: "portfolioItems",
  title: "PortfolioItems",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      description: "Determines which tab this item appears under on the Projects section.",
      type: "string",
      options: {
        list: [
          { title: "Fullstack", value: "fullstack" },
          { title: "Audio", value: "audio" },
          { title: "Game", value: "game" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Url",
      type: "string",
    }),
    defineField({
      name: "imgUrl",
      title: "ImgUrl",
      type: "image",
    }),
    defineField({
      name: "modalTitle",
      title: "ModalTitle",
      type: "string",
    }),
    defineField({
      name: "modalDescription",
      title: "modalDescription",
      type: "string",
    }),
    defineField({
      name: "modalImgUrl",
      title: "ModalImgUrl",
      type: "image",
    }),
    defineField({
      name: "gitUrl",
      title: "GitUrl",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Category",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "imgUrl",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ?? "No category",
        media,
      };
    },
  },
});
