"use client";

import { ArticleGrid, BrickShowcaseSection, HeroSection, ProjectGrid, SectionHeading, ServicesGrid, Strengths, WhoWeAreSection } from "@/components/Sections";
import { useLocale } from "@/lib/locale-context";

export default function Home() {
  const { content } = useLocale();

  return (
    <>
      <HeroSection hero={content.hero} />
      <BrickShowcaseSection />
      <WhoWeAreSection />
      <ServicesGrid items={content.services} />
      <Strengths items={content.strengths} />
      <section className="section">
        <SectionHeading eyebrow={content.pages.homeProjectsEyebrow} title={content.pages.homeProjectsTitle} />
        <ProjectGrid items={content.projects} />
      </section>
      <section className="section muted">
        <SectionHeading eyebrow={content.pages.homeNewsEyebrow} title={content.pages.homeNewsTitle} />
        <ArticleGrid items={content.articles} />
      </section>
    </>
  );
}
