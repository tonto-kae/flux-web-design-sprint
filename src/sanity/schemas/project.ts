import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "aspect",
      title: "Aspect ratio (Tailwind class)",
      type: "string",
      description: "e.g. 'aspect-[91/100]' or 'aspect-[97/100]'.",
    }),
  ],
  preview: { select: { title: "title", media: "image" } },
});
