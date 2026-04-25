import { ProjectDetailView } from "@/components/ProjectDetailView";
import { localizedContent } from "@/data/localized";

export function generateStaticParams() {
  return localizedContent.vi.projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <ProjectDetailView slug={slug} />;
}
