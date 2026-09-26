"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { useInView } from "@/lib/use-in-view";
import type { Project } from "@/types/content";

export function ProjectGrid({ items, compact = false }: { items: Project[]; compact?: boolean }) {
  const { locale } = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className={`grid three project-bento${compact ? " is-compact" : ""}`} ref={ref}>
      {items.map((project, index) => (
        <Link
          className={`image-card project-card-${index + 1} fade-up${inView ? " in-view" : ""}`}
          href={`/du-an/${project.slug}`}
          key={project.slug}
          style={{ transitionDelay: inView ? `${Math.min(index, 5) * 0.08}s` : "0s" }}
        >
          <Image src={project.image} alt={project.title} width={900} height={680} sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" />
          <div>
            <span>{project.category} · {project.year}{project.status && project.status !== "completed" ? ` · ${project.status === "in_progress" ? (locale === "vi" ? "Đang thi công" : "In progress") : (locale === "vi" ? "Sắp thi công" : "Planned")}` : ""}</span>
            <h3>{project.title}</h3>
            <ul className="project-card-facts" aria-label={locale === "vi" ? "Thông tin công trình" : "Project facts"}>
              <li><strong>{project.filters?.landAreaM2 ?? "—"}</strong><span>m²</span></li>
              <li><strong>{project.filters?.budgetBillion?.toLocaleString(locale === "vi" ? "vi-VN" : "en-US") ?? "—"}</strong><span>{locale === "vi" ? "tỷ" : "B VND"}</span></li>
              <li><strong>{project.location}</strong><span>{locale === "vi" ? "địa điểm" : "location"}</span></li>
            </ul>
            <i className="card-arrow" aria-hidden="true"><ArrowRight size={18} /></i>
          </div>
        </Link>
      ))}
    </div>
  );
}
