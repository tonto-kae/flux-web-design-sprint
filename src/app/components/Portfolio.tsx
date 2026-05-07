import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { portfolioQuery, type SanityImage } from "@/sanity/lib/queries";

type Project = {
  _id: string;
  title: string;
  aspect: string;
  image: SanityImage;
};

type Data = {
  topLabel: string;
  sectionNumber: string;
  headline: string;
  ctaText: string;
  ctaButtonLabel: string;
  tags: string[];
  projectsLeft: Project[];
  projectsRight: Project[];
};

const LABEL_CLASS =
  "font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm uppercase leading-[1.1] text-[#1f1f1f]";

const HEADLINE_STYLE = {
  fontSize: "clamp(3rem, 13vw, 6rem)",
  letterSpacing: "-0.08em",
} as const;

const TITLE_STYLE = {
  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
  letterSpacing: "-0.04em",
} as const;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="backdrop-blur-[10px] bg-white/30 rounded-3xl px-2 py-1 font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] text-[#111] whitespace-nowrap">
      {children}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-black shrink-0"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function PortfolioCard({
  project,
  tags,
}: {
  project: Project;
  tags: string[];
}) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className={`relative w-full ${project.aspect} overflow-hidden`}>
        <Image
          src={urlFor(project.image).url()}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute bottom-4 left-4 flex gap-3 items-center">
          {tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <h3
          className="font-[family-name:var(--font-inter)] font-black uppercase leading-[1.1] text-black whitespace-nowrap"
          style={TITLE_STYLE}
        >
          {project.title}
        </h3>
        <ArrowIcon />
      </div>
    </div>
  );
}

function CtaCard({ text, label }: { text: string; label: string }) {
  return (
    <div className="flex items-stretch gap-3 max-w-[465px] w-full">
      <div className="flex flex-col justify-between items-start w-6 shrink-0">
        <span className="block size-4 border-t border-l border-[#1f1f1f]" />
        <span className="block size-4 border-b border-l border-[#1f1f1f]" />
      </div>
      <div className="flex-1 py-3 flex flex-col gap-2.5">
        <p className="font-[family-name:var(--font-inter)] italic text-sm leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">
          {text}
        </p>
        <button className="self-start bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-[24px]">
          {label}
        </button>
      </div>
      <div className="flex flex-col justify-between items-end w-6 shrink-0">
        <span className="block size-4 border-t border-r border-[#1f1f1f]" />
        <span className="block size-4 border-b border-r border-[#1f1f1f]" />
      </div>
    </div>
  );
}

export default async function Portfolio() {
  const data = await client.fetch<Data>(portfolioQuery, {}, { next: { revalidate: 60 } });
  if (!data) return null;

  const [headlineWord1, ...rest] = (data.headline ?? "").split(" ");
  const headlineWord2 = rest.join(" ");

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-8 lg:px-[32px] py-12 sm:py-16 md:py-20">
      <div className="flex items-start justify-between w-full gap-4 mb-10 lg:mb-[61px]">
        <div className="flex gap-2.5 items-start uppercase">
          <h2
            className="font-[family-name:var(--font-inter)] font-light leading-[0.86] text-black"
            style={HEADLINE_STYLE}
          >
            <span className="block">{headlineWord1}</span>
            {headlineWord2 && <span className="block">{headlineWord2}</span>}
          </h2>
          <p className={`${LABEL_CLASS} mt-1`}>{data.sectionNumber}</p>
        </div>
        <div className="flex h-[110px] items-center justify-center w-[15px] shrink-0">
          <div className="-rotate-90 whitespace-nowrap">
            <p className={LABEL_CLASS}>{data.topLabel}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 items-start">
        <div className="w-full lg:flex-1 flex flex-col gap-2.5">
          {(data.projectsLeft ?? []).map((p) => (
            <PortfolioCard key={p._id} project={p} tags={data.tags ?? []} />
          ))}
        </div>
        <div className="w-full lg:flex-1 flex flex-col gap-12 lg:gap-[117px] lg:pt-[240px]">
          {(data.projectsRight ?? []).map((p) => (
            <PortfolioCard key={p._id} project={p} tags={data.tags ?? []} />
          ))}
        </div>
      </div>

      <div className="mt-10 lg:mt-12 flex">
        <CtaCard text={data.ctaText} label={data.ctaButtonLabel} />
      </div>
    </section>
  );
}
