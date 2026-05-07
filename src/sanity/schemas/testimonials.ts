import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Testimonials",
    }),
    defineField({
      name: "items",
      title: "Testimonial items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Author name" },
            { name: "quote", type: "text", title: "Quote", rows: 4 },
            { name: "logo", type: "image", title: "Logo (SVG / image)" },
            { name: "logoWidth", type: "number", title: "Logo width (px)" },
            { name: "logoHeight", type: "number", title: "Logo height (px)" },
            {
              name: "left",
              type: "string",
              title: "Desktop position — left (CSS)",
              description: "e.g. '102px'",
            },
            {
              name: "top",
              type: "string",
              title: "Desktop position — top (CSS)",
              description: "e.g. '142px'",
            },
            {
              name: "rotation",
              type: "string",
              title: "Rotation (CSS)",
              description: "e.g. '-6.85deg'",
            },
          ],
          preview: { select: { title: "name", subtitle: "quote", media: "logo" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Testimonials" }) },
});
