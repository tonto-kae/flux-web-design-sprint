import type { StructureResolver } from "sanity/structure";

const SINGLETONS: { type: string; title: string }[] = [
  { type: "siteSettings", title: "Site Settings" },
  { type: "hero", title: "Hero" },
  { type: "about", title: "About" },
  { type: "bio", title: "Bio" },
  { type: "showcase", title: "Showcase" },
  { type: "services", title: "Services" },
  { type: "portfolio", title: "Portfolio" },
  { type: "testimonials", title: "Testimonials" },
  { type: "newsSection", title: "News (section)" },
  { type: "footer", title: "Footer" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map(({ type, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(type))
      ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("newsItem").title("News items"),
    ]);
