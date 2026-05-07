import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function uploadAsset(relPath) {
  const full = path.join(ROOT, "public", relPath);
  const buffer = fs.readFileSync(full);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(relPath),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const log = (msg) => process.stdout.write(msg + "\n");

async function main() {
  log("→ uploading assets");
  const heroBg = await uploadAsset("hero-bg.png");
  const aboutPortrait = await uploadAsset("about-portrait.png");
  const photographer = await uploadAsset("photographer.png");

  const services = await Promise.all([
    uploadAsset("services/brand-discovery.png"),
    uploadAsset("services/web-design.png"),
    uploadAsset("services/marketing.png"),
    uploadAsset("services/photography.png"),
  ]);

  const portfolio = await Promise.all([
    uploadAsset("portfolio/surfers-paradise.png"),
    uploadAsset("portfolio/cyberpunk-caffe.png"),
    uploadAsset("portfolio/agency-976.png"),
    uploadAsset("portfolio/minimal-playground.png"),
  ]);

  const news = await Promise.all([
    uploadAsset("news/news-1.png"),
    uploadAsset("news/news-2.png"),
    uploadAsset("news/news-3.png"),
  ]);

  const logos = await Promise.all([
    uploadAsset("testimonials/logo-marko.svg"),
    uploadAsset("testimonials/logo-lukas.svg"),
    uploadAsset("testimonials/logo-sarah.svg"),
    uploadAsset("testimonials/logo-sofia.svg"),
  ]);

  log("→ creating collection docs (project, newsItem)");
  const projectDocs = [
    { _type: "project", title: "Surfers Paradise", image: portfolio[0], aspect: "aspect-[91/100]" },
    { _type: "project", title: "Cyberpunk Caffe", image: portfolio[1], aspect: "aspect-[97/100]" },
    { _type: "project", title: "Agency 976", image: portfolio[2], aspect: "aspect-[97/100]" },
    { _type: "project", title: "Minimal Playground", image: portfolio[3], aspect: "aspect-[91/100]" },
  ];

  const projectIds = [];
  for (const p of projectDocs) {
    const created = await client.create(p);
    projectIds.push(created._id);
    log(`  ✓ project: ${p.title}`);
  }

  const placeholderDesc =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const newsItems = [
    { _type: "newsItem", title: "News 1", image: news[0], description: placeholderDesc, url: "#", publishedAt: "2026-04-01T00:00:00Z" },
    { _type: "newsItem", title: "News 2", image: news[1], description: placeholderDesc, url: "#", publishedAt: "2026-04-02T00:00:00Z" },
    { _type: "newsItem", title: "News 3", image: news[2], description: placeholderDesc, url: "#", publishedAt: "2026-04-03T00:00:00Z" },
  ];

  const newsIds = [];
  for (const n of newsItems) {
    const created = await client.create(n);
    newsIds.push(created._id);
    log(`  ✓ newsItem: ${n.title}`);
  }

  log("→ creating singleton docs");
  const singletons = [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      logoText: "H.Studio",
      ctaLabel: "Let's talk",
      navLinks: [
        { _key: "n1", label: "About", anchor: "about" },
        { _key: "n2", label: "Services", anchor: "services" },
        { _key: "n3", label: "Projects", anchor: "projects" },
        { _key: "n4", label: "News", anchor: "news" },
        { _key: "n5", label: "Contact", anchor: "contact" },
      ],
    },
    {
      _id: "hero",
      _type: "hero",
      eyebrow: "[ Hello I'm ]",
      name: "Harvey Specter",
      backgroundImage: heroBg,
      description:
        "H.Studio is a full-service creative studio creating beautiful digital experiences and products. We are an award winning design and art group specializing in branding, web design and engineering.",
    },
    {
      _id: "about",
      _type: "about",
      topLabel: "[ 8+ years in industry ]",
      sectionNumber: "001",
      headlineLines: [
        "A creative director   /",
        "Photographer",
        "Born & raised",
        "On the south side",
        "Of chicago.",
      ],
      bottomLabel: "[ creative freelancer ]",
    },
    {
      _id: "bio",
      _type: "bio",
      topLabel: "[ About ]",
      sectionNumber: "002",
      paragraph:
        "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.",
      portrait: aboutPortrait,
    },
    {
      _id: "showcase",
      _type: "showcase",
      image: photographer,
    },
    {
      _id: "services",
      _type: "services",
      topLabel: "[ Services ]",
      headline: "Deliverables",
      sharedDescription:
        "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
      items: [
        { _key: "s1", title: "Brand Discovery", image: services[0], objectPosition: "center" },
        { _key: "s2", title: "Web Design & Dev", image: services[1], objectPosition: "center" },
        { _key: "s3", title: "Marketing", image: services[2], objectPosition: "center" },
        { _key: "s4", title: "Photography", image: services[3], objectPosition: "50% 85%" },
      ],
    },
    {
      _id: "portfolio",
      _type: "portfolio",
      topLabel: "[ Portfolio ]",
      sectionNumber: "004",
      headline: "Selected Work",
      ctaText:
        "Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.",
      ctaButtonLabel: "Let's talk",
      tags: ["Social Media", "Photography"],
      projectsLeft: [
        { _key: "pl1", _type: "reference", _ref: projectIds[0] },
        { _key: "pl2", _type: "reference", _ref: projectIds[1] },
      ],
      projectsRight: [
        { _key: "pr1", _type: "reference", _ref: projectIds[2] },
        { _key: "pr2", _type: "reference", _ref: projectIds[3] },
      ],
    },
    {
      _id: "testimonials",
      _type: "testimonials",
      headline: "Testimonials",
      items: [
        {
          _key: "t1",
          name: "Marko Stojković",
          quote:
            "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
          logo: logos[0],
          logoWidth: 143,
          logoHeight: 19,
          left: "102px",
          top: "142px",
          rotation: "-6.85deg",
        },
        {
          _key: "t2",
          name: "Lukas Weber",
          quote:
            "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
          logo: logos[1],
          logoWidth: 138,
          logoHeight: 19,
          left: "676px",
          top: "272px",
          rotation: "2.9deg",
        },
        {
          _key: "t3",
          name: "Sarah Jenkins",
          quote:
            "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
          logo: logos[2],
          logoWidth: 109,
          logoHeight: 31,
          left: "305px",
          top: "553px",
          rotation: "2.23deg",
        },
        {
          _key: "t4",
          name: "Sofia Martínez",
          quote:
            "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
          logo: logos[3],
          logoWidth: 81,
          logoHeight: 36,
          left: "987px",
          top: "546px",
          rotation: "-4.15deg",
        },
      ],
    },
    {
      _id: "newsSection",
      _type: "newsSection",
      headline: "Keep up with my latest news & achievements",
      items: newsIds.map((id, i) => ({ _key: `ns${i + 1}`, _type: "reference", _ref: id })),
    },
    {
      _id: "footer",
      _type: "footer",
      ctaText: "Have a project in mind?",
      ctaButtonLabel: "Let's talk",
      wordmark: "H.Studio",
      codedByLabel: "[ Coded By Claude ]",
      socialLinks: [
        { _key: "f1", label: "Facebook", url: "https://facebook.com" },
        { _key: "f2", label: "Instagram", url: "https://instagram.com" },
        { _key: "f3", label: "x.com", url: "https://x.com" },
        { _key: "f4", label: "Linkedin", url: "https://linkedin.com" },
      ],
      legalLinks: [
        { _key: "l1", label: "Licences", url: "#" },
        { _key: "l2", label: "Privacy policy", url: "#" },
      ],
    },
  ];

  for (const doc of singletons) {
    await client.createOrReplace(doc);
    log(`  ✓ ${doc._type}`);
  }

  log("✓ seed complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
