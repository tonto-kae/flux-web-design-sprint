const SOCIAL_LEFT = ["Facebook", "Instagram"];
const SOCIAL_RIGHT = ["x.com", "Linkedin"];
const LEGAL_LINKS = ["Licences", "Privacy policy"];

const SOCIAL_LINK_CLASS =
  "font-[family-name:var(--font-inter)] text-[18px] leading-[1.1] uppercase tracking-[-0.04em] text-white";

export default function Footer() {
  return (
    <footer className="bg-black text-white overflow-hidden px-4 lg:px-[32px] pt-[48px]">
      {/* ── Mobile / tablet ─────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col gap-[48px]">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-3 w-full max-w-[298px]">
              <p
                className="font-[family-name:var(--font-inter)] font-light italic uppercase leading-[1.1] text-white"
                style={{ fontSize: "24px", letterSpacing: "-0.04em" }}
              >
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <button
                type="button"
                className="self-start border border-white rounded-3xl px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] text-white"
              >
                Let&rsquo;s talk
              </button>
            </div>
            <div className="flex flex-col gap-4 w-full">
              {[...SOCIAL_LEFT, ...SOCIAL_RIGHT].map((label) => (
                <a key={label} href="#" className={SOCIAL_LINK_CLASS}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-white/30" />
        </div>

        <div className="flex flex-col gap-4 items-center w-full">
          <div className="flex gap-[34px] items-center pb-[32px] font-[family-name:var(--font-inter)] text-[12px] uppercase tracking-[-0.04em] text-white whitespace-nowrap">
            {LEGAL_LINKS.map((label) => (
              <a key={label} href="#" className="underline">
                {label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 items-start w-full overflow-hidden">
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase leading-[1.1] text-white">
              [ Coded By Claude ]
            </p>
            <p
              className="font-[family-name:var(--font-inter)] font-semibold leading-[0.8] text-white whitespace-nowrap select-none"
              style={{ fontSize: "clamp(72px, 24vw, 91.425px)", letterSpacing: "-0.06em" }}
            >
              H.Studio
            </p>
          </div>
        </div>
      </div>

      {/* ── Desktop ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col">
        <div className="flex flex-col gap-[48px] w-full">
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col gap-3 w-[298px]">
              <p
                className="font-[family-name:var(--font-inter)] font-light italic uppercase leading-[1.1] text-white"
                style={{ fontSize: "24px", letterSpacing: "-0.04em" }}
              >
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <button
                type="button"
                className="self-start border border-white rounded-3xl px-4 py-3 font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] text-white"
              >
                Let&rsquo;s talk
              </button>
            </div>
            <div className="flex flex-col w-[298px] text-center">
              {SOCIAL_LEFT.map((label) => (
                <a key={label} href="#" className={SOCIAL_LINK_CLASS}>
                  {label}
                </a>
              ))}
            </div>
            <div className="flex flex-col w-[298px] text-right">
              {SOCIAL_RIGHT.map((label) => (
                <a key={label} href="#" className={SOCIAL_LINK_CLASS}>
                  {label}
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
                [ Coded By Claude ]
              </p>
            </div>
            <p
              className="font-[family-name:var(--font-inter)] font-semibold leading-[0.8] text-white whitespace-nowrap select-none pl-[40px]"
              style={{ fontSize: "clamp(8rem, 22vw, 290px)", letterSpacing: "-0.06em" }}
            >
              H.Studio
            </p>
          </div>
          <div className="flex gap-[34px] items-center pb-[32px] font-[family-name:var(--font-inter)] text-[12px] uppercase tracking-[-0.04em] text-white whitespace-nowrap shrink-0">
            {LEGAL_LINKS.map((label) => (
              <a key={label} href="#" className="underline">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
