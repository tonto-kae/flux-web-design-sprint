import { client } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/lib/queries";

type Data = {
  topLabel: string;
  sectionNumber: string;
  headlineLines: string[];
  bottomLabel: string;
};

const HEADLINE_STYLE = {
  fontSize: 'clamp(2rem, 7.5vw, 96px)',
  letterSpacing: '-0.08em',
} as const;

const HEADLINE_CLASS =
  'font-[family-name:var(--font-inter)] font-light text-black uppercase leading-[0.84] whitespace-nowrap text-center md:text-left';

const LABEL_CLASS =
  'font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm text-[#1f1f1f] uppercase leading-[1.1]';

const LINE_INDENT = [
  "",
  "md:pl-[10%] lg:pl-[15%] xl:pl-[20%] 2xl:pl-[22%]",
  "md:pl-[15%] lg:pl-[30%] xl:pl-[42%] 2xl:pl-[55%]",
  "",
  "md:pl-[15%] lg:pl-[30%] xl:pl-[42%] 2xl:pl-[55%]",
];

function renderLine(line: string) {
  // Render '&' as italic Playfair amperand for the "Born & raised" line
  if (!line.includes(" & ")) return line;
  const [before, after] = line.split(" & ");
  return (
    <>
      {before}{" "}
      <span className="font-[family-name:var(--font-playfair)] italic font-normal">
        &amp;
      </span>{" "}
      {after}
    </>
  );
}

export default async function About() {
  const data = await client.fetch<Data>(aboutQuery, {}, { next: { revalidate: 60 } });
  if (!data) return null;

  const lines = data.headlineLines ?? [];
  const lastLine = lines[lines.length - 1];
  const middleLines = lines.slice(0, -1);

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-8 lg:px-[32px] py-12 sm:py-16 md:py-[120px] overflow-x-hidden">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-3 w-full">
          <p className={`${LABEL_CLASS} text-right w-full`}>{data.topLabel}</p>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          {/* Line 1 with section number on the right */}
          {middleLines.length > 0 && (
            <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-2 md:gap-3 w-full uppercase">
              <h2 className={HEADLINE_CLASS} style={HEADLINE_STYLE}>
                {renderLine(middleLines[0])}
              </h2>
              <span className={`${LABEL_CLASS} md:pt-1`}>{data.sectionNumber}</span>
            </div>
          )}

          {/* Middle lines (2..n-1) */}
          {middleLines.slice(1).map((line, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center md:justify-start w-full ${
                LINE_INDENT[idx + 1] ?? ""
              }`}
            >
              <p className={HEADLINE_CLASS} style={HEADLINE_STYLE}>
                {renderLine(line)}
              </p>
            </div>
          ))}

          {/* Last line + bottom label */}
          {lastLine && (
            <div
              className={`flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between md:gap-4 w-full ${
                LINE_INDENT[middleLines.length] ?? ""
              }`}
            >
              <p className={HEADLINE_CLASS} style={HEADLINE_STYLE}>
                {renderLine(lastLine)}
              </p>
              <span className={`${LABEL_CLASS} whitespace-nowrap md:pb-2`}>
                {data.bottomLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
