import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  heroQuery,
  siteSettingsQuery,
  type SanityImage,
} from "@/sanity/lib/queries";
import HeroClient, { type NavLink } from "./HeroClient";

type HeroData = {
  eyebrow: string;
  name: string;
  description: string;
  backgroundImage: SanityImage;
};

type SiteSettings = {
  logoText: string;
  ctaLabel: string;
  navLinks: (NavLink & { _key: string })[];
};

export default async function Hero() {
  const [hero, settings] = await Promise.all([
    client.fetch<HeroData>(heroQuery, {}, { next: { revalidate: 60 } }),
    client.fetch<SiteSettings>(siteSettingsQuery, {}, { next: { revalidate: 60 } }),
  ]);

  if (!hero || !settings) return null;

  return (
    <HeroClient
      eyebrow={hero.eyebrow}
      name={hero.name}
      description={hero.description}
      backgroundImageUrl={urlFor(hero.backgroundImage).quality(100).url()}
      logoText={settings.logoText}
      ctaLabel={settings.ctaLabel}
      navLinks={settings.navLinks}
    />
  );
}
