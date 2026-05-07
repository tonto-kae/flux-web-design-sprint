import type { Image as SanityImageObject } from "sanity";

export type SanityImage = SanityImageObject & {
  _type: "image";
};

const imageProjection = `{
  _type,
  asset->{
    _id,
    url,
    metadata { dimensions { width, height, aspectRatio } }
  },
  hotspot,
  crop
}`;

export const heroQuery = `*[_type == "hero"][0]{
  eyebrow,
  name,
  description,
  "backgroundImage": backgroundImage${imageProjection}
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  logoText,
  ctaLabel,
  navLinks[]{ _key, label, anchor }
}`;

export const aboutQuery = `*[_type == "about"][0]{
  topLabel,
  sectionNumber,
  headlineLines,
  bottomLabel
}`;

export const bioQuery = `*[_type == "bio"][0]{
  topLabel,
  sectionNumber,
  paragraph,
  "portrait": portrait${imageProjection}
}`;

export const showcaseQuery = `*[_type == "showcase"][0]{
  "image": image${imageProjection}
}`;

export const servicesQuery = `*[_type == "services"][0]{
  topLabel,
  headline,
  sharedDescription,
  items[]{
    _key,
    title,
    objectPosition,
    "image": image${imageProjection}
  }
}`;

export const portfolioQuery = `*[_type == "portfolio"][0]{
  topLabel,
  sectionNumber,
  headline,
  ctaText,
  ctaButtonLabel,
  tags,
  "projectsLeft": projectsLeft[]->{
    _id,
    title,
    aspect,
    "image": image${imageProjection}
  },
  "projectsRight": projectsRight[]->{
    _id,
    title,
    aspect,
    "image": image${imageProjection}
  }
}`;

export const testimonialsQuery = `*[_type == "testimonials"][0]{
  headline,
  items[]{
    _key,
    name,
    quote,
    logoWidth,
    logoHeight,
    left,
    top,
    rotation,
    "logo": logo${imageProjection}
  }
}`;

export const newsSectionQuery = `*[_type == "newsSection"][0]{
  headline,
  "items": items[]->{
    _id,
    description,
    url,
    "image": image${imageProjection}
  }
}`;

export const footerQuery = `*[_type == "footer"][0]{
  ctaText,
  ctaButtonLabel,
  wordmark,
  codedByLabel,
  socialLinks[]{ _key, label, url },
  legalLinks[]{ _key, label, url }
}`;
