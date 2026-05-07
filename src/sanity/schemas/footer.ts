import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "ctaText",
      title: "CTA text",
      type: "string",
      initialValue: "Have a project in mind?",
      description:
        "The word marked **bold** will render as the bold accent (e.g. 'Have a **project** in mind?').",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA button label",
      type: "string",
      initialValue: "Let's talk",
    }),
    defineField({
      name: "wordmark",
      title: "Wordmark",
      type: "string",
      initialValue: "H.Studio",
    }),
    defineField({
      name: "codedByLabel",
      title: "'Coded By' label",
      type: "string",
      initialValue: "[ Coded By Claude ]",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "url", type: "url", title: "URL" },
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "legalLinks",
      title: "Legal links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "url", type: "url", title: "URL" },
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Footer" }) },
});
