import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsSection",
  title: "News (section)",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Keep up with my latest news & achievements",
    }),
    defineField({
      name: "items",
      title: "Featured items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "newsItem" }] }],
      description: "Pick which news items show in the section, in order.",
    }),
  ],
  preview: { prepare: () => ({ title: "News (section)" }) },
});
