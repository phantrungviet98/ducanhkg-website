"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { useLocale } from "@/lib/locale-context";

export function ProjectDetailView({ slug }: { slug: string }) {
  const { content } = useLocale();
  const project = content.projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <>
      <section className="detail-hero">
        <Image src={project.image} alt="" width={1200} height={900} />
        <div>
          <p className="eyebrow">{project.category} · {project.year}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <p><strong>{content.common.location}:</strong> {project.location}</p>
        </div>
      </section>
      <section className="section two-column">
        <div>
          <h2>{content.common.projectApproach}</h2>
          <p>{content.pages.projectDetailBody}</p>
        </div>
        <ContactForm source={`project:${project.slug}`} title={content.common.similarProject} />
      </section>
    </>
  );
}
