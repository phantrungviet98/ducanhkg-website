import { PageIntro, ProjectGrid } from "@/components/Sections";
import { projects } from "@/data/site";

export default function ProjectsPage() {
  return (
    <section className="section">
      <PageIntro
        eyebrow="Projects"
        title="Selected construction and fit-out projects"
        description="Project cards are data-driven now and can later be loaded from Supabase with filters, galleries, and admin editing."
      />
      <ProjectGrid items={projects} />
    </section>
  );
}
