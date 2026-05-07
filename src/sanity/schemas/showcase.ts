import { defineField, defineType } from "sanity";

export default defineType({
  name: "showcase",
  title: "Showcase",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Showcase image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: "Showcase" }) },
});
