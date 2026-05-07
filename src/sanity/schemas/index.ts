import type { SchemaTypeDefinition } from "sanity";

import siteSettings from "./siteSettings";
import hero from "./hero";
import about from "./about";
import bio from "./bio";
import showcase from "./showcase";
import services from "./services";
import portfolio from "./portfolio";
import project from "./project";
import testimonials from "./testimonials";
import newsSection from "./newsSection";
import newsItem from "./newsItem";
import footer from "./footer";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  hero,
  about,
  bio,
  showcase,
  services,
  portfolio,
  project,
  testimonials,
  newsSection,
  newsItem,
  footer,
];

export const SINGLETON_TYPES = new Set([
  "siteSettings",
  "hero",
  "about",
  "bio",
  "showcase",
  "services",
  "portfolio",
  "testimonials",
  "newsSection",
  "footer",
]);
