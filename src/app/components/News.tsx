import Image from "next/image";

interface NewsItem {
  img: string;
  description: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    img: "/news/news-1.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: "/news/news-2.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    img: "/news/news-3.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
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

function ReadMore() {
  return (
    <a
      href="#"
      className="inline-flex items-center justify-center gap-2.5 border-b border-black py-1 font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] text-black"
    >
      <span>Read more</span>
      <ArrowIcon />
    </a>
  );
}

function NewsCard({ item, aspect }: { item: NewsItem; aspect: string }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className={`relative w-full ${aspect} overflow-hidden`}>
        <Image
          src={item.img}
          alt=""
          fill
          sizes="(min-width: 1024px) 353px, 300px"
          className="object-cover"
        />
      </div>
      <p className="flex-1 font-[family-name:var(--font-inter)] text-sm leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">
        {item.description}
      </p>
      <ReadMore />
    </div>
  );
}

export default function News() {
  return (
    <section className="w-full bg-[#f3f3f3] py-16 md:py-20 lg:py-[120px] lg:px-[32px]">
      {/* Mobile / tablet: wrapped headline + horizontal scroll carousel */}
      <div className="lg:hidden flex flex-col gap-8">
        <h2
          className="uppercase font-[family-name:var(--font-inter)] font-light leading-[0.86] text-black px-4"
          style={{ fontSize: "clamp(2rem, 8vw, 2.5rem)", letterSpacing: "-0.08em" }}
        >
          Keep up with my latest news &amp; achievements
        </h2>
        <div className="overflow-x-auto -mx-px scroll-smooth snap-x snap-mandatory">
          <div className="flex gap-4 px-4 w-max">
            {NEWS_ITEMS.map((item, i) => (
              <div key={i} className="w-[300px] shrink-0 snap-start">
                <NewsCard item={item} aspect="aspect-[300/398]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: vertical headline + 3 columns with separators */}
      <div className="hidden lg:flex items-end justify-between w-full max-w-[1376px] mx-auto gap-8">
        <div className="flex h-[706px] w-[110px] items-center justify-center shrink-0">
          <div className="-rotate-90">
            <h2
              className="uppercase font-[family-name:var(--font-inter)] font-light leading-[0.86] text-black whitespace-nowrap"
              style={{ fontSize: "64px", letterSpacing: "-0.08em" }}
            >
              Keep up with my latest
              <br />
              news &amp; achievements
            </h2>
          </div>
        </div>

        <div className="flex gap-[31px] items-start w-[1020px] shrink-0">
          <div className="w-[353px] shrink-0">
            <NewsCard item={NEWS_ITEMS[0]} aspect="aspect-[353/469]" />
          </div>
          <div className="self-stretch flex-1 w-px bg-black/15" />
          <div className="w-[353px] shrink-0 pt-[120px]">
            <NewsCard item={NEWS_ITEMS[1]} aspect="aspect-[353/469]" />
          </div>
          <div className="self-stretch flex-1 w-px bg-black/15" />
          <div className="w-[353px] shrink-0">
            <NewsCard item={NEWS_ITEMS[2]} aspect="aspect-[353/469]" />
          </div>
        </div>
      </div>
    </section>
  );
}
