import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logoText",
      title: "Logo wordmark",
      type: "string",
      initialValue: "H.Studio",
    }),
    defineField({
      name: "ctaLabel",
      title: "Default CTA label",
      type: "string",
      initialValue: "Let's talk",
    }),
    defineField({
      name: "navLinks",
      title: "Nav links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "anchor", type: "string", title: "Anchor (e.g. about)" },
          ],
          preview: { select: { title: "label", subtitle: "anchor" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
