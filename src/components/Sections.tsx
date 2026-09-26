"use client";

import { ArrowDownRight, ArrowRight, CheckCircle2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import type { Hero, Service } from "@/types/content";
import { BrickModel } from "@/components/BrickModel";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useLocale } from "@/lib/locale-context";
import { useInView } from "@/lib/use-in-view";

export function HeroSection({ hero }: { hero: Hero }) {
  const { content, locale } = useLocale();
  const projectImages = content.projects.filter((project) => project.published !== false && project.image);
  const [slideIndex, setSlideIndex] = useState(0);
  const activeProject = projectImages[slideIndex % projectImages.length];
  const previousProject = slideIndex > 0 ? projectImages[(slideIndex - 1) % projectImages.length] : null;

  useEffect(() => {
    if (projectImages.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") setSlideIndex((index) => index + 1);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [projectImages.length]);

  return (
    <section className="hero">
      <div className="hero-slides" aria-hidden="true">
        {previousProject && <div className="hero-slide"><Image src={previousProject.image} alt="" fill sizes="100vw" className="hero-slide-image" /></div>}
        <div className={`hero-slide${slideIndex > 0 ? ` is-entering ${slideIndex % 2 === 0 ? "from-right" : "from-left"}` : ""}`} key={slideIndex}>
          <Image src={activeProject?.image ?? hero.image} alt="" fill priority={slideIndex === 0} sizes="100vw" className="hero-slide-image" />
        </div>
        {projectImages.length > 1 && <div className="hero-slide-preload"><Image src={projectImages[(slideIndex + 1) % projectImages.length].image} alt="" fill loading="eager" sizes="100vw" /></div>}
      </div>
      <div className="hero-overlay" />
      <div className="hero-grid-lines" aria-hidden="true" />
      {projectImages.length > 1 && <div className="hero-slide-progress" aria-hidden="true"><span key={slideIndex} /></div>}
      <div className="hero-layout">
        <div className="hero-content">
          <div className="hero-status"><span /> {locale === "vi" ? "Đang nhận dự án Q4 / 2026" : "Accepting Q4 / 2026 projects"}</div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          <div className="actions">
            {hero.primaryAction ? <ButtonLink href={hero.primaryAction.href}>{hero.primaryAction.label}<ArrowDownRight size={18} /></ButtonLink> : null}
            {hero.secondaryAction ? <ButtonLink href={hero.secondaryAction.href} variant="secondary">{hero.secondaryAction.label}<MoveUpRight size={17} /></ButtonLink> : null}
          </div>
        </div>
      </div>
      <div className="scroll-cue"><span>SCROLL</span><i /></div>
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
        <ButtonLink href="/ve-chung-toi" variant="secondary">
          {section.cta}
        </ButtonLink>
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
                  <ButtonLink href="/linh-vuc">
                    {content.common.readMore}
                  </ButtonLink>
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
            <ButtonLink href="/linh-vuc">
              {content.common.readMore}
            </ButtonLink>
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
