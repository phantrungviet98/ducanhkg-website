import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Article, Hero, Project, Service } from "@/types/content";

export function HeroSection({ hero }: { hero: Hero }) {
  return (
    <section className="hero">
      <Image src={hero.image} alt="" className="hero-image" fill priority sizes="100vw" />
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

export function ServicesGrid({ items }: { items: Service[] }) {
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">Scope</p>
        <h2>Services built around project control</h2>
      </div>
      <div className="grid four">
        {items.map((item) => (
          <article className="service-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Strengths({ items }: { items: string[] }) {
  return (
    <section className="split-section">
      <div>
        <p className="eyebrow">Working method</p>
        <h2>Clear process before beautiful finishing</h2>
        <p>
          The visual result matters, but predictable delivery depends on documentation, supervision, procurement, and owner approvals.
        </p>
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
  return (
    <div className="grid three">
      {items.map((article) => (
        <Link className="article-card" href={`/danh-muc-bai-viet/tin-tuc/${article.slug}`} key={article.slug}>
          <Image src={article.image} alt="" width={720} height={520} />
          <div>
            <span>{article.category} · {article.date}</span>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <strong>Read more <ArrowRight size={15} /></strong>
          </div>
        </Link>
      ))}
    </div>
  );
}
