import { defineField, defineType } from "sanity";

export default defineType({
  name: "services",
  title: "Services",
  type: "document",
  fields: [
    defineField({
      name: "topLabel",
      title: "Top label",
      type: "string",
      initialValue: "[ Services ]",
    }),
    defineField({
      name: "headline",
      title: "Headline (right side)",
      type: "string",
      initialValue: "Deliverables",
    }),
    defineField({
      name: "sharedDescription",
      title: "Shared description",
      type: "text",
      rows: 4,
      description: "Currently shown on every service item.",
    }),
    defineField({
      name: "items",
      title: "Service items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "image", type: "image", title: "Image", options: { hotspot: true } },
            {
              name: "objectPosition",
              type: "string",
              title: "Image object-position (CSS)",
              description: "Optional, e.g. '50% 85%'. Defaults to 'center'.",
            },
          ],
          preview: { select: { title: "title", media: "image" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Services" }) },
});
