"use client";

import { ArticleGrid, HeroSection, ProjectGrid, ServicesGrid, Strengths } from "@/components/Sections";
import { useLocale } from "@/lib/locale-context";

export default function Home() {
  const { content } = useLocale();

  return (
    <>
      <HeroSection hero={content.hero} />
      <ServicesGrid items={content.services} />
      <Strengths items={content.strengths} />
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{content.pages.homeProjectsEyebrow}</p>
          <h2>{content.pages.homeProjectsTitle}</h2>
        </div>
        <ProjectGrid items={content.projects} />
      </section>
      <section className="section muted">
        <div className="section-heading">
          <p className="eyebrow">{content.pages.homeNewsEyebrow}</p>
          <h2>{content.pages.homeNewsTitle}</h2>
        </div>
        <ArticleGrid items={content.articles} />
      </section>
    </>
  );
}
