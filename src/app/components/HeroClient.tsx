"use client";

import Image from "next/image";
import { useState } from "react";

export type NavLink = { label: string; anchor: string };

type Props = {
  eyebrow: string;
  name: string;
  description: string;
  backgroundImageUrl: string;
  logoText: string;
  ctaLabel: string;
  navLinks: NavLink[];
};

export default function HeroClient({
  eyebrow,
  name,
  description,
  backgroundImageUrl,
  logoText,
  ctaLabel,
  navLinks,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Split name on whitespace so it can stack on mobile and inline on desktop
  const [first, ...rest] = name.split(" ");
  const last = rest.join(" ");

  // Find the first occurrence of bold-style spans we want to keep —
  // description is plain text from CMS, so we render as-is.
  return (
    <section className="relative w-full h-[85svh] min-h-[560px] max-h-[760px] md:h-[100svh] md:min-h-[640px] md:max-h-[1000px] overflow-hidden bg-[#cdd0d3]">
      <Image
        src={backgroundImageUrl}
        alt=""
        aria-hidden="true"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center pointer-events-none select-none"
      />

      <div
        className="absolute left-0 bottom-0 w-full h-[42%] backdrop-blur-[5px] bg-[rgba(217,217,217,0.01)]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)",
        }}
      />

      <div className="relative h-full flex flex-col justify-between px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-10">
        <nav className="flex items-center justify-between py-4 sm:py-6">
          <span className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black">
            {logoText}
          </span>

          <ul className="hidden md:flex items-center gap-6 lg:gap-14">
            {navLinks.map((link) => (
              <li key={link.anchor}>
                <a
                  href={`#${link.anchor}`}
                  className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button className="hidden md:block bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-[24px]">
            {ctaLabel}
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-200 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-200 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-[88px] z-10 bg-white/85 backdrop-blur-md px-8 py-6 border-t border-black/10">
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.anchor}>
                  <a
                    href={`#${link.anchor}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-[24px]"
                >
                  {ctaLabel}
                </button>
              </li>
            </ul>
          </div>
        )}

        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full pb-[15px]">
            <div className="flex items-center justify-center md:justify-start px-[18px] mb-[-4px] md:mb-[-15px] w-full">
              <span className="font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm text-white uppercase mix-blend-overlay leading-[1.1] whitespace-nowrap">
                {eyebrow}
              </span>
            </div>
            <h1
              className="font-[family-name:var(--font-inter)] font-medium text-center text-white mix-blend-overlay w-full capitalize mb-0 md:mb-[-15px] leading-[0.85] md:leading-[1.1] md:whitespace-nowrap text-[6rem] md:text-[5rem] lg:text-[7rem] xl:text-[9rem] 2xl:text-[12.375rem]"
              style={{ letterSpacing: "-0.08em" }}
            >
              <span className="block md:inline">{first}</span>
              {last && (
                <>
                  <span className="hidden md:inline">{"   "}</span>
                  <span className="block md:inline">{last}</span>
                </>
              )}
            </h1>
          </div>

          <div className="flex justify-start md:justify-end w-full mt-6 md:mt-8">
            <div className="flex flex-col gap-[17px] w-full max-w-[294px]">
              <p className="font-[family-name:var(--font-inter)] font-bold italic text-xs sm:text-sm text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.2]">
                {description}
              </p>
              <button className="self-start bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-[24px]">
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
