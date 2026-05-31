"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import type { Article, Hero, Project, Service } from "@/types/content";
import { useLocale } from "@/lib/locale-context";
import { useInView } from "@/lib/use-in-view";

export function HeroSection({ hero }: { hero: Hero }) {
  return (
    <section className="hero">
      {hero.video ? (
        <video className="hero-video" autoPlay muted loop playsInline poster={hero.image} preload="metadata">
          <source src={hero.video} type="video/mp4" />
        </video>
      ) : (
        <Image src={hero.image} alt="" className="hero-image" fill priority sizes="100vw" />
      )}
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.description}</p>
        <div className="actions">
          {hero.primaryAction ? <Link className="button primary" href={hero.primaryAction.href}>{hero.primaryAction.label}</Link> : null}
          {hero.secondaryAction ? <Link className="button secondary" href={hero.secondaryAction.href}>{hero.secondaryAction.label}</Link> : null}
        </div>
      </div>
    </section>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div className={`section-heading fade-up${inView ? " in-view" : ""}`} ref={ref}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

export function WhoWeAreSection() {
  const { content } = useLocale();
  const section = content.pages.whoWeAre;
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section className="who-section" ref={ref}>
      <div className={`who-content fade-left${inView ? " in-view" : ""}`}>
        <p className="eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p>{section.body}</p>
        <Link className="button secondary" href="/ve-chung-toi">
          {section.cta}
        </Link>
      </div>
      <div
        className={`who-image fade-right${inView ? " in-view" : ""}`}
        style={{ transitionDelay: inView ? "0.18s" : "0s" }}
      >
        <Image src={section.image} alt="" width={1200} height={820} />
      </div>
    </section>
  );
}

export function ServicesGrid({ items }: { items: Service[] }) {
  const { content, locale } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView<HTMLElement>();
  const activeService = items[activeIndex] ?? items[0];
  const serviceImages = [
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80"
  ];
  const activeImage = serviceImages[activeIndex] ?? serviceImages[0];
  const secondaryImage = serviceImages[(activeIndex + 1) % serviceImages.length] ?? serviceImages[1];

  return (
    <section className="services-section" ref={ref}>
      <div className={`services-heading fade-up${inView ? " in-view" : ""}`}>
        <div>
          <p className="eyebrow">{content.common.scope}</p>
          <h2>{content.common.servicesHeading}</h2>
        </div>
        <p>
          {locale === "vi"
            ? "Từ tư vấn ban đầu đến bàn giao, mỗi hạng mục được tổ chức bằng phạm vi rõ ràng, tiến độ cụ thể và tiêu chuẩn nghiệm thu minh bạch."
            : "From first consultation to handover, each scope is organized with clear responsibilities, practical schedules, and transparent acceptance standards."}
        </p>
      </div>
      <div className="services-explorer">
        <div className="services-accordion">
          {items.map((item, index) => (
            <Fragment key={item.title}>
              <button
                className={`service-row fade-left${inView ? " in-view" : ""} ${index === activeIndex ? "active" : ""}`}
                style={{ transitionDelay: inView ? `${0.12 + index * 0.09}s` : "0s" }}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <ArrowRight size={24} />
              </button>
              {index === activeIndex ? (
                <div className="mobile-service-detail">
                  <Image src={activeImage} alt="" width={760} height={520} />
                  <p>{item.description}</p>
                  <Link className="button primary" href="/linh-vuc">
                    {content.common.readMore}
                  </Link>
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
        <div className="service-detail">
          <div key={activeIndex} className="service-detail-body service-content-enter">
            <span className="service-index">{String(activeIndex + 1).padStart(2, "0")}</span>
            <h3>{activeService.title}</h3>
            <p>{activeService.description}</p>
            <Link className="button primary" href="/linh-vuc">
              {content.common.readMore}
            </Link>
          </div>
        </div>
        <div
          className={`service-media fade-right${inView ? " in-view" : ""}`}
          style={{ transitionDelay: inView ? "0.3s" : "0s" }}
          aria-hidden="true"
        >
          <Image
            key={`main-${activeIndex}`}
            className="service-media-main service-img-enter"
            src={activeImage}
            alt=""
            width={980}
            height={1120}
          />
          <Image
            key={`secondary-${activeIndex}`}
            className="service-media-secondary service-img-enter"
            src={secondaryImage}
            alt=""
            width={560}
            height={680}
          />
        </div>
      </div>
    </section>
  );
}

export function Strengths({ items }: { items: string[] }) {
  const { content } = useLocale();
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section className="split-section" ref={ref}>
      <div className={`fade-left${inView ? " in-view" : ""}`}>
        <p className="eyebrow">{content.common.workingMethod}</p>
        <h2>{content.common.strengthsHeading}</h2>
        <p>{content.common.strengthsDescription}</p>
      </div>
      <div className="check-list">
        {items.map((item, index) => (
          <p
            key={item}
            className={`fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: inView ? `${0.14 + index * 0.07}s` : "0s" }}
          >
            <CheckCircle2 size={20} /> {item}
          </p>
        ))}
      </div>
    </section>
  );
}

export function ProjectGrid({ items }: { items: Project[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className="grid three" ref={ref}>
      {items.map((project, index) => (
        <Link
          className={`image-card fade-up${inView ? " in-view" : ""}`}
          href={`/du-an/${project.slug}`}
          key={project.slug}
          style={{ transitionDelay: inView ? `${index * 0.1}s` : "0s" }}
        >
          <Image src={project.image} alt="" width={720} height={520} />
          <div>
            <span>{project.category} · {project.year}</span>
            <h3>{project.title}</h3>
            <p>{project.location}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ArticleGrid({ items }: { items: Article[] }) {
  const { content } = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className="grid three" ref={ref}>
      {items.map((article, index) => (
        <Link
          className={`article-card fade-up${inView ? " in-view" : ""}`}
          href={`/danh-muc-bai-viet/tin-tuc/${article.slug}`}
          key={article.slug}
          style={{ transitionDelay: inView ? `${index * 0.1}s` : "0s" }}
        >
          <Image src={article.image} alt="" width={720} height={520} />
          <div>
            <span>{article.category} · {article.date}</span>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <strong>{content.common.readMore} <ArrowRight size={15} /></strong>
          </div>
        </Link>
      ))}
    </div>
  );
}
