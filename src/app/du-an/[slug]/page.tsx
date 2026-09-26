import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/ProjectDetailView";
import { importedProjects } from "@/data/imported-projects";
import { getPublicProject } from "@/lib/projects";
import { site } from "@/data/site";
import { createMetadata, safeJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return importedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProject(slug);
  if (!project) return {};
  return {
    ...createMetadata({ title: project.title, description: project.summary, path: `/du-an/${project.slug}`, image: project.image }),
    title: { absolute: `${project.title} | ${site.name}` }
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublicProject(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${site.url}/du-an/${project.slug}`,
    image: [project.image, ...(project.gallery?.map((image) => image.src) ?? [])],
    dateCreated: project.year,
    locationCreated: { "@type": "Place", name: project.location },
    creator: { "@type": "Organization", name: site.name, url: site.url }
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} /><ProjectDetailView slug={slug} /></>;
}
