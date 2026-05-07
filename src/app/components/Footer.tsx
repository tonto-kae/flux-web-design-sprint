import { client } from "@/sanity/lib/client";
import { footerQuery } from "@/sanity/lib/queries";

type Link = { _key: string; label: string; url: string };

type Data = {
  ctaText: string;
  ctaButtonLabel: string;
  wordmark: string;
  codedByLabel: string;
  socialLinks: Link[];
  legalLinks: Link[];
};

const SOCIAL_LINK_CLASS =
  "font-[family-name:var(--font-inter)] text-[18px] leading-[1.1] uppercase tracking-[-0.04em] text-white";

function CtaText({ text }: { text: string }) {
  // Render the first occurrence of "project" (case-insensitive) as bold accent
  const i = text.toLowerCase().indexOf("project");
  if (i === -1) {
    return (
      <p
        className="font-[family-name:var(--font-inter)] font-light italic uppercase leading-[1.1] text-white"
        style={{ fontSize: "24px", letterSpacing: "-0.04em" }}
      >
        {text}
      </p>
    );
  }
  return (
    <p
      className="font-[family-name:var(--font-inter)] font-light italic uppercase leading-[1.1] text-white"
      style={{ fontSize: "24px", letterSpacing: "-0.04em" }}
    >
      {text.slice(0, i)}
      <span className="font-black not-italic">{text.slice(i, i + 7)}</span>
      {text.slice(i + 7)}
    </p>
  );
}

export default async function Footer() {
  const data = await client.fetch<Data>(footerQuery, {}, { next: { revalidate: 60 } });
  if (!data) return null;

  const socialFirst = (data.socialLinks ?? []).slice(0, 2);
  const socialSecond = (data.socialLinks ?? []).slice(2, 4);

  return (
    <footer className="bg-black text-white overflow-hidden px-4 lg:px-[32px] pt-[48px]">
      {/* Mobile / tablet */}
      <div className="lg:hidden flex flex-col gap-[48px]">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-3 w-full max-w-[298px]">
              <CtaText text={data.ctaText} />
              <button
                type="button"
                className="self-start border border-white rounded-3xl px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] text-white"
              >
                {data.ctaButtonLabel}
              </button>
            </div>
            <div className="flex flex-col gap-4 w-full">
              {(data.socialLinks ?? []).map((link) => (
                <a key={link._key} href={link.url} className={SOCIAL_LINK_CLASS}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-white/30" />
        </div>

        <div className="flex flex-col gap-4 items-center w-full">
          <div className="flex gap-[34px] items-center pb-[32px] font-[family-name:var(--font-inter)] text-[12px] uppercase tracking-[-0.04em] text-white whitespace-nowrap">
            {(data.legalLinks ?? []).map((link) => (
              <a key={link._key} href={link.url} className="underline">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 items-start w-full overflow-hidden">
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase leading-[1.1] text-white">
              {data.codedByLabel}
            </p>
            <p
              className="font-[family-name:var(--font-inter)] font-semibold leading-[0.8] text-white whitespace-nowrap select-none"
              style={{ fontSize: "clamp(72px, 24vw, 91.425px)", letterSpacing: "-0.06em" }}
            >
              {data.wordmark}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col">
        <div className="flex flex-col gap-[48px] w-full">
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col gap-3 w-[298px]">
              <CtaText text={data.ctaText} />
              <button
                type="button"
                className="self-start border border-white rounded-3xl px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] text-white"
              >
                {data.ctaButtonLabel}
              </button>
            </div>
            <div className="flex flex-col w-[298px] text-center">
              {socialFirst.map((link) => (
                <a key={link._key} href={link.url} className={SOCIAL_LINK_CLASS}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col w-[298px] text-right">
              {socialSecond.map((link) => (
                <a key={link._key} href={link.url} className={SOCIAL_LINK_CLASS}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-white/30" />
        </div>

        <div className="mt-[120px] flex items-end justify-between gap-4">
          <div className="relative flex-1 min-w-0">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[160px] w-[15px] flex items-center justify-center z-10">
              <p className="-rotate-90 whitespace-nowrap font-[family-name:var(--font-geist-mono)] text-sm uppercase text-white">
                {data.codedByLabel}
              </p>
            </div>
            <p
              className="font-[family-name:var(--font-inter)] font-semibold leading-[0.8] text-white whitespace-nowrap select-none pl-[40px]"
              style={{ fontSize: "clamp(8rem, 22vw, 290px)", letterSpacing: "-0.06em" }}
            >
              {data.wordmark}
            </p>
          </div>
          <div className="flex gap-[34px] items-center pb-[32px] font-[family-name:var(--font-inter)] text-[12px] uppercase tracking-[-0.04em] text-white whitespace-nowrap shrink-0">
            {(data.legalLinks ?? []).map((link) => (
              <a key={link._key} href={link.url} className="underline">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
