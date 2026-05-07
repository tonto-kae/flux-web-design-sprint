import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow text",
      type: "string",
      initialValue: "[ Hello I'm ]",
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
  preview: { prepare: () => ({ title: "Hero" }) },
});
