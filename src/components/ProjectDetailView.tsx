"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { useLocale } from "@/lib/locale-context";

export function ProjectDetailView({ slug }: { slug: string }) {
  const { content, locale } = useLocale();
  const project = content.projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const facts = [
    [locale === "vi" ? "Địa điểm" : "Location", project.location],
    [locale === "vi" ? "Năm thực hiện" : "Year", project.year],
    [locale === "vi" ? "Loại công trình" : "Project type", project.category],
    [locale === "vi" ? "Diện tích đất" : "Land area", project.landArea],
    [locale === "vi" ? "Quy mô" : "Scale", project.scale],
    [locale === "vi" ? "Phạm vi" : "Scope", project.scope]
  ].filter((item): item is [string, string] => Boolean(item[1]));

  const related = content.projects.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <>
      <article>
        <section className="project-detail-hero">
          <Image src={project.image} alt={project.title} fill priority sizes="100vw" />
          <div className="project-detail-overlay" />
          <div className="project-detail-heading">
            <Link href="/du-an" className="back-link"><ArrowLeft size={16} /> {locale === "vi" ? "Tất cả dự án" : "All projects"}</Link>
            <p className="eyebrow">{project.category} · {project.year}</p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
        </section>

        <dl className="project-detail-facts" aria-label={locale === "vi" ? "Thông tin công trình" : "Project facts"}>
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <section className="project-detail-story">
          <div>
            <p className="eyebrow">{locale === "vi" ? "Bài toán" : "The brief"}</p>
            <h2>{locale === "vi" ? "Nhu cầu được chuyển thành một phạm vi rõ ràng." : "Turning needs into a clear project scope."}</h2>
            <p>{project.challenge ?? content.pages.projectDetailBody}</p>
          </div>
          <div>
            <p className="eyebrow">{locale === "vi" ? "Giải pháp" : "The response"}</p>
            <h3>{locale === "vi" ? "Thiết kế phải triển khai được ngoài công trường." : "Design that works on site."}</h3>
            <p>{project.solution ?? content.pages.projectDetailBody}</p>
          </div>
        </section>

        {project.gallery?.length ? (
          <section className="project-gallery">
            <div className="project-gallery-heading">
              <div>
                <p className="eyebrow">{locale === "vi" ? "Thư viện công trình" : "Project gallery"}</p>
                <h2>{locale === "vi" ? "Không gian và chi tiết" : "Spaces and details"}</h2>
              </div>
              <span>{String(project.gallery.length).padStart(2, "0")} {locale === "vi" ? "hình ảnh" : "images"}</span>
            </div>
            <div className="project-gallery-grid">
              {project.gallery.map((image, index) => (
                <figure key={image.src} className={`project-gallery-item item-${index + 1}`}>
                  <Image src={image.src} alt={image.alt} width={1600} height={1100} sizes="(max-width: 800px) 100vw, 60vw" />
                  <figcaption>{String(index + 1).padStart(2, "0")} · {image.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <section className="project-consultation">
        <div>
          <p className="eyebrow">{locale === "vi" ? "Công trình của bạn" : "Your project"}</p>
          <h2>{locale === "vi" ? "Bắt đầu bằng một cuộc trao đổi rõ ràng." : "Start with a clear conversation."}</h2>
          <p>{locale === "vi" ? "Chia sẻ địa điểm, quy mô và thời gian dự kiến để đội ngũ chuẩn bị nội dung tư vấn phù hợp." : "Share the location, scale, and expected timeline so the team can prepare relevant advice."}</p>
        </div>
        <ContactForm source={`project:${project.slug}`} title={content.common.similarProject} />
      </section>

      {related.length ? (
        <section className="related-projects">
          <div className="related-projects-heading">
            <div>
              <p className="eyebrow">{locale === "vi" ? "Khám phá tiếp" : "Continue exploring"}</p>
              <h2>{locale === "vi" ? "Dự án liên quan" : "Related projects"}</h2>
            </div>
            <Link href="/du-an">{locale === "vi" ? "Xem tất cả" : "View all"} <ArrowUpRight size={16} /></Link>
          </div>
          <ProjectGrid items={related} compact />
        </section>
      ) : null}
    </>
  );
}
