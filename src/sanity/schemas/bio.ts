import { defineField, defineType } from "sanity";

export default defineType({
  name: "bio",
  title: "Bio",
  type: "document",
  fields: [
    defineField({
      name: "topLabel",
      title: "Top label",
      type: "string",
      initialValue: "[ About ]",
    }),
    defineField({
      name: "sectionNumber",
      title: "Section number",
      type: "string",
      initialValue: "002",
    }),
    defineField({
      name: "paragraph",
      title: "Bio paragraph",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "portrait",
      title: "Portrait image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Bio" }) },
});
