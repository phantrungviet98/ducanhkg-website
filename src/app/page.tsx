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
          <p className="eyebrow">Dự án tiêu biểu</p>
          <h2>Công trình được triển khai bằng chi tiết thực tế và tiến độ rõ ràng</h2>
        </div>
        <ProjectGrid items={projects} />
      </section>
      <section className="section muted">
        <div className="section-heading">
          <p className="eyebrow">Tin tức</p>
          <h2>Ghi chú xây dựng dành cho gia chủ và đội dự án</h2>
        </div>
        <ArticleGrid items={articles} />
      </section>
    </>
  );
}
