"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/locale-context";

export default function ProjectsPage() {
  const { content, locale } = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const projects = content.projects;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
      if (e.key === "ArrowRight")
        setCurrentIndex((i) => (i + 1) % projects.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [projects.length]);

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      setCurrentIndex((i) =>
        delta > 0
          ? (i + 1) % projects.length
          : (i - 1 + projects.length) % projects.length
      );
    }
    touchStartX.current = null;
  };

  const current = projects[currentIndex];
  if (!current) return null;

  return (
    <div
      className="projects-fullscreen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {projects.map((project, index) => (
        <div
          key={project.slug}
          className={`projects-slide${index === currentIndex ? " is-active" : ""}`}
          aria-hidden={index !== currentIndex}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="projects-slide-img"
            priority={index === 0}
          />
        </div>
      ))}

      <div className="projects-overlay" />

      <div className="projects-bottom">
        <div className="projects-info">
          <div key={current.slug} className="projects-info-inner">
            <h1>{current.title}</h1>
            <p>{current.location}</p>
            <Link className="projects-info-link" href={`/du-an/${current.slug}`}>
              {locale === "vi" ? "Xem dự án" : "View project"} <ArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>

      <div className="projects-dots" aria-hidden="true">
        {projects.map((project, index) => (
          <button
            key={project.slug}
            className={`projects-dot${index === currentIndex ? " active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            tabIndex={-1}
          />
        ))}
      </div>
    </div>
  );
}
