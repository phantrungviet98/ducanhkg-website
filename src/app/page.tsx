"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroSection, ServicesGrid, Strengths, WhoWeAreSection } from "@/components/Sections";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { HomeGatewaySection } from "@/components/home/HomeGatewaySection";
import { HomeLibrarySection } from "@/components/home/HomeLibrarySection";
import { HomeProjectFinder } from "@/components/home/HomeProjectFinder";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ContentSection } from "@/components/ui/ContentSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/locale-context";

export default function Home() {
  const { content, locale } = useLocale();
  const forYouProjects = content.projects.filter((project) => project.featuredForYou);
  const mostViewedProjects = content.projects.filter((project) => project.featuredMostViewed);

  return (
    <>
      <HeroSection hero={content.hero} />
      <HomeProjectFinder />
      {forYouProjects.length > 0 && <ContentSection>
        <SectionHeading eyebrow={content.pages.homeProjectsEyebrow} title={content.pages.homeProjectsTitle} />
        <ProjectGrid items={forYouProjects} />
        <Link className="home-projects-more" href="/du-an">{locale === "vi" ? "Xem tất cả dự án" : "View all projects"} <ArrowRight size={18} /></Link>
      </ContentSection>}
      <HomeGatewaySection />
      {mostViewedProjects.length > 0 && <ContentSection tone="muted">
        <SectionHeading eyebrow={content.pages.homeMostViewedEyebrow} title={content.pages.homeMostViewedTitle} />
        <ProjectGrid items={mostViewedProjects} />
        <Link className="home-projects-more" href="/du-an">{locale === "vi" ? "Xem tất cả dự án" : "View all projects"} <ArrowRight size={18} /></Link>
      </ContentSection>}
      <WhoWeAreSection />
      <ServicesGrid items={content.services} />
      <Strengths items={content.strengths} />
      <ContentSection tone="muted">
        <SectionHeading eyebrow={content.pages.homeNewsEyebrow} title={content.pages.homeNewsTitle} />
        <ArticleGrid items={content.articles} />
      </ContentSection>
      <HomeLibrarySection />
      <section className="home-ideas-outro" aria-label={locale === "vi" ? "Khám phá thêm ý tưởng" : "Explore more ideas"}>
        <div className="home-ideas-next">
          <div>
            <p className="eyebrow">{locale === "vi" ? "Tiếp tục khám phá" : "Keep exploring"}</p>
            <h2>{locale === "vi" ? "Có vẻ bạn vẫn chưa tìm được ý tưởng? Cùng khám phá thêm..." : "Still looking for the right idea? Let's explore more..."}</h2>
          </div>
          <Link href="/du-an">{locale === "vi" ? "Khám phá dự án" : "Explore projects"} <ArrowRight size={20} /></Link>
        </div>
      </section>
    </>
  );
}
