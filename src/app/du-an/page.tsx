"use client";

import { PageIntro, ProjectGrid } from "@/components/Sections";
import { useLocale } from "@/lib/locale-context";

export default function ProjectsPage() {
  const { content } = useLocale();
  const page = content.pages.projects;

  return (
    <section className="section">
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      <ProjectGrid items={content.projects} />
    </section>
  );
}
