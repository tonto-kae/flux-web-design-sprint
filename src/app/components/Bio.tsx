import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { bioQuery, type SanityImage } from "@/sanity/lib/queries";

type Data = {
  topLabel: string;
  sectionNumber: string;
  paragraph: string;
  portrait: SanityImage;
};

const LABEL_CLASS =
  "font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm text-[#1f1f1f] uppercase leading-[1.1]";

function BracketedParagraph({
  paragraph,
  className = "",
}: {
  paragraph: string;
  className?: string;
}) {
  return (
    <div className={`flex items-stretch gap-3 ${className}`}>
      <div className="flex flex-col justify-between items-start w-6 shrink-0">
        <span className="block size-4 border-t border-l border-[#1f1f1f]" />
        <span className="block size-4 border-b border-l border-[#1f1f1f]" />
      </div>
      <p className="flex-1 py-3 font-[family-name:var(--font-inter)] text-sm leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">
        {paragraph}
      </p>
      <div className="flex flex-col justify-between items-end w-6 shrink-0">
        <span className="block size-4 border-t border-r border-[#1f1f1f]" />
        <span className="block size-4 border-b border-r border-[#1f1f1f]" />
      </div>
    </div>
  );
}

export default async function Bio({ query = bioQuery }: { query?: string } = {}) {
  const data = await client.fetch<Data>(query, {}, { next: { revalidate: 60 } });
  if (!data) return null;

  const portraitUrl = data.portrait ? urlFor(data.portrait).url() : null;

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-8 lg:px-[32px] py-12 sm:py-16 md:py-20">
      {/* Mobile layout: stacked */}
      <div className="flex flex-col gap-8 md:hidden">
        <div className="flex items-center justify-between">
          <span className={LABEL_CLASS}>{data.topLabel}</span>
          <span className={LABEL_CLASS}>{data.sectionNumber}</span>
        </div>
        {portraitUrl && (
          <div className="relative w-full aspect-[436/614]">
            <Image src={portraitUrl} alt="" fill sizes="100vw" className="object-cover" />
          </div>
        )}
        <BracketedParagraph paragraph={data.paragraph} />
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex items-start gap-8 w-full">
        <span className={LABEL_CLASS}>{data.topLabel}</span>
        <div className="flex items-end gap-6 lg:gap-8 flex-1 max-w-[983px] ml-auto">
          <div className="flex-1 flex items-center justify-center min-w-0">
            <BracketedParagraph paragraph={data.paragraph} className="max-w-[450px]" />
          </div>
          <div className="flex items-start gap-4 lg:gap-6 shrink-0">
            <span className={LABEL_CLASS}>{data.sectionNumber}</span>
            {portraitUrl && (
              <div className="relative shrink-0 w-[260px] lg:w-[340px] xl:w-[436px] aspect-[436/614]">
                <Image
                  src={portraitUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 436px, (min-width: 1024px) 340px, 260px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
