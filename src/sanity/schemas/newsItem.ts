import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsItem",
  title: "News item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title (internal)", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "url",
      title: "Read more URL",
      type: "url",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "image" } },
});
