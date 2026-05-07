import Image from "next/image";

interface Testimonial {
  name: string;
  quote: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  position: { left: string; top: string };
  rotation: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marko Stojković",
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    logo: "/testimonials/logo-marko.svg",
    logoWidth: 143,
    logoHeight: 19,
    position: { left: "102px", top: "142px" },
    rotation: "-6.85deg",
  },
  {
    name: "Lukas Weber",
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    logo: "/testimonials/logo-lukas.svg",
    logoWidth: 138,
    logoHeight: 19,
    position: { left: "676px", top: "272px" },
    rotation: "2.9deg",
  },
  {
    name: "Sarah Jenkins",
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    logo: "/testimonials/logo-sarah.svg",
    logoWidth: 109,
    logoHeight: 31,
    position: { left: "305px", top: "553px" },
    rotation: "2.23deg",
  },
  {
    name: "Sofia Martínez",
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    logo: "/testimonials/logo-sofia.svg",
    logoWidth: 81,
    logoHeight: 36,
    position: { left: "987px", top: "546px" },
    rotation: "-4.15deg",
  },
];

const HEADLINE_STYLE = {
  fontSize: "clamp(3rem, 14vw, 12.375rem)",
  letterSpacing: "-0.07em",
} as const;

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-[#f1f1f1] border border-[#ddd] rounded flex flex-col gap-4 items-start p-6 w-[353px] max-w-full">
      <Image
        src={testimonial.logo}
        alt=""
        width={testimonial.logoWidth}
        height={testimonial.logoHeight}
        unoptimized
      />
      <p className="font-[family-name:var(--font-inter)] text-[18px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">
        {testimonial.quote}
      </p>
      <p className="font-[family-name:var(--font-inter)] font-black text-base tracking-[-0.04em] uppercase text-black">
        {testimonial.name}
      </p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-24 lg:py-[120px] overflow-hidden">
      {/* Mobile / tablet: stacked with headline in middle */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col items-center gap-12">
        <div className="flex flex-col gap-12 w-full max-w-md items-center">
          {TESTIMONIALS.slice(0, 2).map((t) => (
            <div key={t.name} style={{ transform: `rotate(${t.rotation})` }}>
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
        <h2
          className="capitalize font-[family-name:var(--font-inter)] font-medium text-center leading-[1.1] text-black"
          style={HEADLINE_STYLE}
        >
          Testimonials
        </h2>
        <div className="flex flex-col gap-12 w-full max-w-md items-center">
          {TESTIMONIALS.slice(2).map((t) => (
            <div key={t.name} style={{ transform: `rotate(${t.rotation})` }}>
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: absolute layout matching Figma canvas */}
      <div className="hidden lg:block relative w-full max-w-[1440px] mx-auto h-[860px]">
        <h2
          className="absolute inset-0 flex items-center justify-center capitalize font-[family-name:var(--font-inter)] font-medium leading-[1.1] text-black z-0 pointer-events-none"
          style={HEADLINE_STYLE}
        >
          Testimonials
        </h2>
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="absolute z-10"
            style={{
              left: t.position.left,
              top: t.position.top,
              transform: `rotate(${t.rotation})`,
            }}
          >
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>
    </section>
  );
}
