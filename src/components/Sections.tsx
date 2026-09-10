"use client";

import { ArrowDownRight, ArrowRight, CheckCircle2, Clock3, MoveUpRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, type PointerEvent, useState } from "react";
import type { Article, Hero, Project, Service } from "@/types/content";
import { BrickModel } from "@/components/BrickModel";
import { useLocale } from "@/lib/locale-context";
import { useInView } from "@/lib/use-in-view";

export function HeroSection({ hero }: { hero: Hero }) {
  const { locale } = useLocale();

  function movePerspective(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x * 9).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--spot-x", `${((x + 0.5) * 100).toFixed(0)}%`);
    event.currentTarget.style.setProperty("--spot-y", `${((y + 0.5) * 100).toFixed(0)}%`);
  }

  function resetPerspective(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

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
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-status"><span /> {locale === "vi" ? "Đang nhận dự án Q4 / 2026" : "Accepting Q4 / 2026 projects"}</div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <div className="actions">
            {hero.primaryAction ? <Link className="button primary" href={hero.primaryAction.href}>{hero.primaryAction.label}<ArrowDownRight size={18} /></Link> : null}
            {hero.secondaryAction ? <Link className="button secondary" href={hero.secondaryAction.href}>{hero.secondaryAction.label}<MoveUpRight size={17} /></Link> : null}
          </div>
        </div>
        <div
          className="hero-bento"
          onPointerMove={movePerspective}
          onPointerLeave={resetPerspective}
        >
          <div className="hero-bento-card hero-bento-main">
            <div className="bento-topline">
              <span>{locale === "vi" ? "Hồ sơ công trình" : "Project control"}</span>
              <span>DAKG—26</span>
            </div>
            <div className="hero-bento-copy">
              <strong>01—04</strong>
              <h2>{locale === "vi" ? "Một đầu mối. Trọn hành trình." : "One team. Full journey."}</h2>
            </div>
            <div className="process-line" aria-label={locale === "vi" ? "Quy trình bốn bước" : "Four-step process"}>
              {["Ý tưởng", "Thiết kế", "Thi công", "Bàn giao"].map((label, index) => (
                <span key={label}><i>{index + 1}</i>{locale === "vi" ? label : ["Brief", "Design", "Build", "Handover"][index]}</span>
              ))}
            </div>
          </div>
          <div className="hero-bento-card hero-bento-stat">
            <Clock3 size={20} />
            <strong>24h</strong>
            <span>{locale === "vi" ? "phản hồi yêu cầu" : "response target"}</span>
          </div>
          <div className="hero-bento-card hero-bento-stat accent-card">
            <ShieldCheck size={20} />
            <strong>4×</strong>
            <span>{locale === "vi" ? "mốc kiểm soát" : "control stages"}</span>
          </div>
        </div>
      </div>
      <div className="scroll-cue"><span>SCROLL</span><i /></div>
    </section>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="page-intro">
      <div className="page-intro-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function BrickShowcaseSection() {
  const { locale } = useLocale();
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section className="brick-showcase" ref={ref}>
      <div className={`brick-showcase-copy fade-left${inView ? " in-view" : ""}`}>
        <p className="eyebrow">{locale === "vi" ? "Dấu ấn vật liệu" : "Material signature"}</p>
        <h2>{locale === "vi" ? "Một viên gạch. Một lời cam kết." : "One brick. One commitment."}</h2>
        <p>
          {locale === "vi"
            ? "Từ chi tiết nhỏ nhất đến toàn bộ công trình, Đức Anh KG theo đuổi sự bền vững, chính xác và minh bạch trong từng bước triển khai."
            : "From the smallest detail to the complete build, Duc Anh KG pursues durability, precision, and clarity at every stage."}
        </p>
        <div className="brick-specs" aria-label={locale === "vi" ? "Thông tin mô hình" : "Model information"}>
          <span><strong>GLB</strong>{locale === "vi" ? "Mesh Blender thật" : "Native Blender mesh"}</span>
          <span><strong>360°</strong>{locale === "vi" ? "Kéo để khám phá" : "Drag to explore"}</span>
          <span><strong>AR</strong>{locale === "vi" ? "Xem trong không gian" : "View in your space"}</span>
        </div>
      </div>
      <div className={`brick-showcase-stage fade-right${inView ? " in-view" : ""}`}>
        <BrickModel />
      </div>
      <div className="brick-showcase-index" aria-hidden="true">MATERIAL / 01</div>
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
  const { content, locale } = useLocale();
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
        <div className="image-corner-label">RẠCH GIÁ<br />10.0120° N</div>
      </div>
      <div className={`who-metric fade-up${inView ? " in-view" : ""}`}>
        <strong>360°</strong>
        <span>{locale === "vi" ? "Quản lý xuyên suốt từ bản vẽ đến bàn giao" : "Managed continuously from drawing to handover"}</span>
      </div>
      <div className={`who-quote fade-up${inView ? " in-view" : ""}`} style={{ transitionDelay: inView ? "0.24s" : "0s" }}>
        <span>“</span>
        <p>{locale === "vi" ? "Thiết kế tốt phải sống được ngoài công trường." : "Good design must work on the construction site."}</p>
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
      <div className="check-list strengths-bento">
        {items.map((item, index) => (
          <p
            key={item}
            className={`fade-up${inView ? " in-view" : ""}`}
            style={{ transitionDelay: inView ? `${0.14 + index * 0.07}s` : "0s" }}
          >
            <span className="strength-number">0{index + 1}</span>
            <CheckCircle2 size={20} />
            <strong>{item}</strong>
          </p>
        ))}
      </div>
    </section>
  );
}

export function ProjectGrid({ items }: { items: Project[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className="grid three project-bento" ref={ref}>
      {items.map((project, index) => (
        <Link
          className={`image-card project-card-${index + 1} fade-up${inView ? " in-view" : ""}`}
          href={`/du-an/${project.slug}`}
          key={project.slug}
          style={{ transitionDelay: inView ? `${index * 0.1}s` : "0s" }}
        >
          <Image src={project.image} alt="" width={720} height={520} />
          <div>
            <span>{project.category} · {project.year}</span>
            <h3>{project.title}</h3>
            <p>{project.location}</p>
            <i className="card-arrow"><ArrowRight size={18} /></i>
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
