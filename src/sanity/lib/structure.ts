import type { StructureResolver } from "sanity/structure";

const HOME_SINGLETONS: { type: string; title: string }[] = [
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

const ABOUT_PAGE_SINGLETONS: { type: string; title: string }[] = [
  { type: "aboutPageHero", title: "Hero" },
  { type: "aboutPageAbout", title: "About" },
  { type: "aboutPageBio", title: "Bio" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .id("home-page")
        .child(
          S.list()
            .title("Home Page")
            .items(
              HOME_SINGLETONS.map(({ type, title }) =>
                S.listItem()
                  .title(title)
                  .id(type)
                  .child(S.document().schemaType(type).documentId(type))
              )
            )
        ),
      S.listItem()
        .title("About Page")
        .id("about-page")
        .child(
          S.list()
            .title("About Page")
            .items(
              ABOUT_PAGE_SINGLETONS.map(({ type, title }) =>
                S.listItem()
                  .title(title)
                  .id(type)
                  .child(S.document().schemaType(type).documentId(type))
              )
            )
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("newsItem").title("News items"),
    ]);
