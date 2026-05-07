const HEADLINE_STYLE = {
  fontSize: 'clamp(2rem, 7.5vw, 96px)',
  letterSpacing: '-0.08em',
} as const;

const HEADLINE_CLASS =
  'font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.84] whitespace-nowrap text-center md:text-left';

const LABEL_CLASS =
  'font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm text-[#1f1f1f] uppercase leading-[1.1]';

export default function About() {
  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-8 lg:px-[32px] py-12 sm:py-16 md:py-[120px] overflow-x-hidden">
      <div className="flex flex-col gap-6 w-full">

        {/* Top label + divider */}
        <div className="flex flex-col gap-3 w-full">
          <p className={`${LABEL_CLASS} text-right w-full`}>
            [ 8+ years in industry ]
          </p>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        {/* Headline block */}
        <div className="flex flex-col gap-2 w-full">

          {/* Line 1: 001 (above on mobile, right of headline on desktop) + A creative director / */}
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-2 md:gap-3 w-full uppercase">
            <h2 className={HEADLINE_CLASS} style={HEADLINE_STYLE}>
              A creative director&nbsp;&nbsp;&nbsp;/
            </h2>
            <span className={`${LABEL_CLASS} md:pt-1`}>001</span>
          </div>

          {/* Line 2: Photographer */}
          <div className="flex items-center justify-center md:justify-start w-full md:pl-[10%] lg:pl-[15%] xl:pl-[20%] 2xl:pl-[22%]">
            <p className={HEADLINE_CLASS} style={HEADLINE_STYLE}>
              Photographer
            </p>
          </div>

          {/* Line 3: Born & raised */}
          <div className="flex items-center justify-center md:justify-start w-full md:pl-[15%] lg:pl-[30%] xl:pl-[42%] 2xl:pl-[55%]">
            <p className={HEADLINE_CLASS} style={HEADLINE_STYLE}>
              Born{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-normal">
                &amp;
              </span>{" "}
              raised
            </p>
          </div>

          {/* Line 4: On the south side */}
          <div className="flex items-center justify-center md:justify-start w-full">
            <p className={HEADLINE_CLASS} style={HEADLINE_STYLE}>
              On the south side
            </p>
          </div>

          {/* Line 5: Of chicago. + [ creative freelancer ] */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between md:gap-4 w-full md:pl-[15%] lg:pl-[30%] xl:pl-[42%] 2xl:pl-[55%]">
            <p className={HEADLINE_CLASS} style={HEADLINE_STYLE}>
              Of chicago.
            </p>
            <span className={`${LABEL_CLASS} whitespace-nowrap md:pb-2`}>
              [ creative freelancer ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
