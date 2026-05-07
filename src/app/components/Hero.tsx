'use client';

import Image from 'next/image';
import { useState } from 'react';

const NAV_LINKS = ["About", "Services", "Projects", "News", "Contact"];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative w-full h-[85svh] min-h-[560px] max-h-[760px] md:h-[100svh] md:min-h-[640px] md:max-h-[1000px] overflow-hidden bg-[#cdd0d3]">
      {/* Background photo — fills the section at its natural framing */}
      <Image
        src="/hero-bg.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center pointer-events-none select-none"
      />

      {/* Frosted glass overlay at bottom — soft fade-in from top edge */}
      <div
        className="absolute left-0 bottom-0 w-full h-[42%] backdrop-blur-[5px] bg-[rgba(217,217,217,0.01)]"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 35%, black 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative h-full flex flex-col justify-between px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-10">

        {/* Navbar */}
        <nav className="flex items-center justify-between py-4 sm:py-6">
          <span className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black">
            H.Studio
          </span>

          <ul className="hidden md:flex items-center gap-6 lg:gap-14">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <button className="hidden md:block bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-[24px]">
            Let&apos;s talk
          </button>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-200 ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-200 ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </nav>

        {/* Mobile menu drawer */}
        {menuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-[88px] z-10 bg-white/85 backdrop-blur-md px-8 py-6 border-t border-black/10">
            <ul className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-[family-name:var(--font-inter)] font-semibold text-base tracking-[-0.04em] text-black"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-[24px]"
                >
                  Let&apos;s talk
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Hero text block */}
        <div className="flex flex-col w-full">

          {/* Label + name (with negative-margin overlap on desktop) */}
          <div className="flex flex-col w-full pb-[15px]">
            <div className="flex items-center justify-center md:justify-start px-[18px] mb-[-4px] md:mb-[-15px] w-full">
              <span className="font-[family-name:var(--font-geist-mono)] text-xs sm:text-sm text-white uppercase mix-blend-overlay leading-[1.1] whitespace-nowrap">
                [ Hello I&apos;m ]
              </span>
            </div>
            <h1
              className="font-[family-name:var(--font-inter)] font-medium text-center text-white mix-blend-overlay w-full capitalize mb-0 md:mb-[-15px] leading-[0.85] md:leading-[1.1] md:whitespace-nowrap text-[6rem] md:text-[5rem] lg:text-[7rem] xl:text-[9rem] 2xl:text-[12.375rem]"
              style={{ letterSpacing: '-0.08em' }}
            >
              <span className="block md:inline">Harvey</span>
              <span className="hidden md:inline">{'   '}</span>
              <span className="block md:inline">Specter</span>
            </h1>
          </div>

          {/* Description + CTA (full-width on mobile, bottom-right on tablet+) */}
          <div className="flex justify-start md:justify-end w-full mt-6 md:mt-8">
            <div className="flex flex-col gap-[17px] w-full max-w-[294px]">
              <p className="font-[family-name:var(--font-inter)] font-bold italic text-xs sm:text-sm text-[#1f1f1f] uppercase tracking-[-0.04em] leading-[1.2]">
                H.Studio is a{" "}
                <span className="font-normal">full-service</span>
                {" "}creative studio creating beautiful digital experiences and
                products. We are an{" "}
                <span className="font-normal">award winning</span>
                {" "}design and art group specializing in branding, web design
                and engineering.
              </p>
              <button className="self-start bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-4 py-3 rounded-[24px]">
                Let&apos;s talk
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
