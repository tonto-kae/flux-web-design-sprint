import Hero from "../components/Hero";
import About from "../components/About";
import Bio from "../components/Bio";
import Footer from "../components/Footer";
import {
  aboutPageAboutQuery,
  aboutPageBioQuery,
  aboutPageHeroQuery,
} from "@/sanity/lib/queries";

export default function AboutPage() {
  return (
    <main>
      <Hero query={aboutPageHeroQuery} />
      <About query={aboutPageAboutQuery} />
      <Bio query={aboutPageBioQuery} />
      <Footer />
    </main>
  );
}
