import Image from "next/image";

const LABEL_CLASS =
  "font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm text-[#1f1f1f] uppercase leading-[1.1]";

const PARAGRAPH =
  "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";

function BracketedParagraph({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-stretch gap-3 ${className}`}>
      <div className="flex flex-col justify-between items-start w-6 shrink-0">
        <span className="block size-4 border-t border-l border-[#1f1f1f]" />
        <span className="block size-4 border-b border-l border-[#1f1f1f]" />
      </div>
      <p className="flex-1 py-3 font-[family-name:var(--font-inter)] text-sm leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">
        {PARAGRAPH}
      </p>
      <div className="flex flex-col justify-between items-end w-6 shrink-0">
        <span className="block size-4 border-t border-r border-[#1f1f1f]" />
        <span className="block size-4 border-b border-r border-[#1f1f1f]" />
      </div>
    </div>
  );
}

export default function Bio() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-8 lg:px-[32px] py-12 sm:py-16 md:py-20">
      {/* Mobile layout: stacked */}
      <div className="flex flex-col gap-8 md:hidden">
        <div className="flex items-center justify-between">
          <span className={LABEL_CLASS}>[ About ]</span>
          <span className={LABEL_CLASS}>002</span>
        </div>
        <div className="relative w-full aspect-[436/614]">
          <Image
            src="/about-portrait.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <BracketedParagraph />
      </div>

      {/* Desktop layout matches Figma */}
      <div className="hidden md:flex items-start gap-8 w-full">
        <span className={LABEL_CLASS}>[ About ]</span>
        <div className="flex items-end gap-6 lg:gap-8 flex-1 max-w-[983px] ml-auto">
          <div className="flex-1 flex items-center justify-center min-w-0">
            <BracketedParagraph className="max-w-[450px]" />
          </div>
          <div className="flex items-start gap-4 lg:gap-6 shrink-0">
            <span className={LABEL_CLASS}>002</span>
            <div className="relative shrink-0 w-[260px] lg:w-[340px] xl:w-[436px] aspect-[436/614]">
              <Image
                src="/about-portrait.png"
                alt=""
                fill
                sizes="(min-width: 1280px) 436px, (min-width: 1024px) 340px, 260px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
