"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import type { Article, Hero, Project, Service } from "@/types/content";
import { useLocale } from "@/lib/locale-context";

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

export function WhoWeAreSection() {
  const { content } = useLocale();
  const section = content.pages.whoWeAre;

  return (
    <section className="who-section">
      <div className="who-content">
        <p className="eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p>{section.body}</p>
        <Link className="button secondary" href="/ve-chung-toi">
          {section.cta}
        </Link>
      </div>
      <div className="who-image">
        <Image src={section.image} alt="" width={1200} height={820} />
      </div>
    </section>
  );
}

export function ServicesGrid({ items }: { items: Service[] }) {
  const { content, locale } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
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
    <section className="services-section">
      <div className="services-heading">
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
              className={`service-row ${index === activeIndex ? "active" : ""}`}
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
          <span className="service-index">{String(activeIndex + 1).padStart(2, "0")}</span>
          <h3>{activeService.title}</h3>
          <p>{activeService.description}</p>
          <Link className="button primary" href="/linh-vuc">
            {content.common.readMore}
          </Link>
        </div>
        <div className="service-media" aria-hidden="true">
          <Image className="service-media-main" src={activeImage} alt="" width={980} height={1120} />
          <Image className="service-media-secondary" src={secondaryImage} alt="" width={560} height={680} />
        </div>
      </div>
    </section>
  );
}

export function Strengths({ items }: { items: string[] }) {
  const { content } = useLocale();

  return (
    <section className="split-section">
      <div>
        <p className="eyebrow">{content.common.workingMethod}</p>
        <h2>{content.common.strengthsHeading}</h2>
        <p>{content.common.strengthsDescription}</p>
      </div>
      <div className="check-list">
        {items.map((item) => (
          <p key={item}><CheckCircle2 size={20} /> {item}</p>
        ))}
      </div>
    </section>
  );
}

export function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid three">
      {items.map((project) => (
        <Link className="image-card" href={`/du-an/${project.slug}`} key={project.slug}>
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

  return (
    <div className="grid three">
      {items.map((article) => (
        <Link className="article-card" href={`/danh-muc-bai-viet/tin-tuc/${article.slug}`} key={article.slug}>
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
