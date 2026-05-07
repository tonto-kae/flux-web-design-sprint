import Image from "next/image";

const SERVICES = [
  { num: 1, title: "Brand Discovery", img: "/services/brand-discovery.png", objectPosition: "center" },
  { num: 2, title: "Web Design & Dev", img: "/services/web-design.png", objectPosition: "center" },
  { num: 3, title: "Marketing", img: "/services/marketing.png", objectPosition: "center" },
  { num: 4, title: "Photography", img: "/services/photography.png", objectPosition: "50% 85%" },
];

const DESCRIPTION =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

const LABEL_CLASS =
  "font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm uppercase leading-[1.1] text-white";

const HEADLINE_STYLE = {
  fontSize: "clamp(3rem, 13vw, 6rem)",
  letterSpacing: "-0.08em",
} as const;

const TITLE_STYLE = {
  fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
  letterSpacing: "-0.04em",
} as const;

export default function Services() {
  return (
    <section className="w-full bg-black px-4 sm:px-6 md:px-8 lg:px-[32px] py-12 sm:py-16 md:py-20 flex flex-col items-start gap-10 md:gap-12">
      <p className={LABEL_CLASS}>[ Services ]</p>

      <div className="flex items-center justify-between gap-4 w-full uppercase font-[family-name:var(--font-inter)] font-light leading-none whitespace-nowrap text-white">
        <p style={HEADLINE_STYLE}>[4]</p>
        <p style={HEADLINE_STYLE}>Deliverables</p>
      </div>

      <ul className="flex flex-col gap-10 md:gap-12 w-full">
        {SERVICES.map((service) => (
          <li key={service.num} className="flex flex-col gap-[9px] w-full">
            <div className="flex flex-col gap-[9px] w-full">
              <p className={LABEL_CLASS}>[ {service.num} ]</p>
              <div className="h-px w-full bg-white" />
            </div>
            <div className="flex flex-wrap items-start justify-between gap-y-6 w-full">
              <h3
                className="font-[family-name:var(--font-inter)] italic font-bold uppercase leading-[1.1] text-white whitespace-nowrap"
                style={TITLE_STYLE}
              >
                {service.title}
              </h3>
              <div className="flex flex-wrap gap-6 items-start">
                <p className="font-[family-name:var(--font-inter)] text-sm leading-[1.3] tracking-[-0.04em] text-white w-full max-w-[393px]">
                  {DESCRIPTION}
                </p>
                <div className="relative shrink-0 size-[120px] sm:size-[151px] overflow-hidden">
                  <Image
                    src={service.img}
                    alt=""
                    fill
                    sizes="151px"
                    style={{ objectPosition: service.objectPosition }}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
