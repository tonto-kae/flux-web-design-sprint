import { defineField, defineType } from "sanity";

export default defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    defineField({
      name: "topLabel",
      title: "Top label",
      type: "string",
      initialValue: "[ Portfolio ]",
    }),
    defineField({
      name: "sectionNumber",
      title: "Section number",
      type: "string",
      initialValue: "004",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Two words shown side-by-side, e.g. 'Selected Work'.",
    }),
    defineField({
      name: "ctaText",
      title: "CTA paragraph",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA button label",
      type: "string",
      initialValue: "Let's talk",
    }),
    defineField({
      name: "tags",
      title: "Default tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Pills shown on each portfolio image.",
    }),
    defineField({
      name: "projectsLeft",
      title: "Projects (left column)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({
      name: "projectsRight",
      title: "Projects (right column)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
  ],
  preview: { prepare: () => ({ title: "Portfolio" }) },
});
