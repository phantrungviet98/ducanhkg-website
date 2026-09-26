"use client";

import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ContentSection } from "@/components/ui/ContentSection";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLocale } from "@/lib/locale-context";

export default function ProjectsPage() {
  const { content, locale } = useLocale();
  const page = content.pages.projects;

  return (
    <>
      <PageIntro compact eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <ContentSection className="project-index-section">
        <div className="project-index-summary">
          <p>{locale === "vi" ? "Hồ sơ chọn lọc" : "Selected portfolio"}</p>
          <strong>{String(content.projects.length).padStart(2, "0")}</strong>
          <span>{locale === "vi" ? "công trình đang hiển thị" : "projects currently shown"}</span>
        </div>
        <Suspense fallback={<div className="project-filter-loading">{locale === "vi" ? "Đang tải bộ lọc..." : "Loading filters..."}</div>}>
          <ProjectExplorer />
        </Suspense>
        <div className="project-index-cta">
          <div>
            <p className="eyebrow">{locale === "vi" ? "Chưa thấy công trình phù hợp?" : "Looking for something different?"}</p>
            <h2>{locale === "vi" ? "Chia sẻ nhu cầu để đội ngũ đề xuất hướng triển khai." : "Share your brief and let the team recommend a direction."}</h2>
          </div>
          <ButtonLink href="/dang-ky-tu-van-ho-tro">
            {content.common.consultationCta} <ArrowRight size={17} />
          </ButtonLink>
        </div>
      </ContentSection>
    </>
  );
}
