import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPageHero",
  title: "About Page: Hero",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow text",
      type: "string",
      initialValue: "[ About us ]",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "e.g. 'Harvey Specter'",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Short paragraph shown bottom-right.",
    }),
  ],
  preview: { prepare: () => ({ title: "About Page: Hero" }) },
});
