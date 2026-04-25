import { ArticleGrid, HeroSection, ProjectGrid, ServicesGrid, Strengths } from "@/components/Sections";
import { articles, homeHero, projects, services, strengths } from "@/data/site";

export default function Home() {
  return (
    <>
      <HeroSection hero={homeHero} />
      <ServicesGrid items={services} />
      <Strengths items={strengths} />
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Projects with practical detail and measured delivery</h2>
        </div>
        <ProjectGrid items={projects} />
      </section>
      <section className="section muted">
        <div className="section-heading">
          <p className="eyebrow">Insights</p>
          <h2>Planning notes for owners and project teams</h2>
        </div>
        <ArticleGrid items={articles} />
      </section>
    </>
  );
}
