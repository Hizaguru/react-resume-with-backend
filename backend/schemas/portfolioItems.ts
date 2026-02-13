import { defineType, defineField } from "sanity";

export default defineType({
  name: "portfolioItems",
  title: "PortfolioItems",
  type: "document",
  fields: [
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
});
