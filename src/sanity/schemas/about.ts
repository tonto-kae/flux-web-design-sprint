import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "topLabel",
      title: "Top label",
      type: "string",
      initialValue: "[ 8+ years in industry ]",
    }),
    defineField({
      name: "sectionNumber",
      title: "Section number",
      type: "string",
      initialValue: "001",
    }),
    defineField({
      name: "headlineLines",
      title: "Headline lines",
      type: "array",
      of: [{ type: "string" }],
      description: "Each line is rendered separately with offset indentation.",
    }),
    defineField({
      name: "bottomLabel",
      title: "Bottom label",
      type: "string",
      initialValue: "[ creative freelancer ]",
    }),
  ],
  preview: { prepare: () => ({ title: "About" }) },
});
