import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { testimonialsQuery, type SanityImage } from "@/sanity/lib/queries";

type Testimonial = {
  _key: string;
  name: string;
  quote: string;
  logo: SanityImage;
  logoWidth: number;
  logoHeight: number;
  left: string;
  top: string;
  rotation: string;
};

type Data = {
  headline: string;
  items: Testimonial[];
};

const HEADLINE_STYLE = {
  fontSize: "clamp(3rem, 14vw, 12.375rem)",
  letterSpacing: "-0.07em",
} as const;

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-[#f1f1f1] border border-[#ddd] rounded flex flex-col gap-4 items-start p-6 w-[353px] max-w-full">
      <Image
        src={urlFor(testimonial.logo).url()}
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

export default async function Testimonials() {
  const data = await client.fetch<Data>(testimonialsQuery, {}, { next: { revalidate: 60 } });
  if (!data) return null;

  const items = data.items ?? [];

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-24 lg:py-[120px] overflow-hidden">
      {/* Mobile / tablet */}
      <div className="lg:hidden px-4 sm:px-6 md:px-8 flex flex-col items-center gap-12">
        <div className="flex flex-col gap-12 w-full max-w-md items-center">
          {items.slice(0, 2).map((t) => (
            <div key={t._key} style={{ transform: `rotate(${t.rotation})` }}>
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
        <h2
          className="capitalize font-[family-name:var(--font-inter)] font-medium text-center leading-[1.1] text-black"
          style={HEADLINE_STYLE}
        >
          {data.headline}
        </h2>
        <div className="flex flex-col gap-12 w-full max-w-md items-center">
          {items.slice(2).map((t) => (
            <div key={t._key} style={{ transform: `rotate(${t.rotation})` }}>
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block relative w-full max-w-[1440px] mx-auto h-[860px]">
        <h2
          className="absolute inset-0 flex items-center justify-center capitalize font-[family-name:var(--font-inter)] font-medium leading-[1.1] text-black z-0 pointer-events-none"
          style={HEADLINE_STYLE}
        >
          {data.headline}
        </h2>
        {items.map((t) => (
          <div
            key={t._key}
            className="absolute z-10"
            style={{
              left: t.left,
              top: t.top,
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
