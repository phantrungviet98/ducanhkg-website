"use client";

import { ArrowUpRight, Images, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLocale } from "@/lib/locale-context";

export default function LibraryPage() {
  const { content, locale } = useLocale();
  const image = content.projects[0]?.gallery?.[0];

  return (
    <>
      <PageIntro
        eyebrow={locale === "vi" ? "Thư viện" : "Library"}
        title={locale === "vi" ? "Công trình qua hình ảnh và chuyển động" : "Projects in stills and motion"}
        description={locale === "vi" ? "Khám phá không gian, chi tiết hoàn thiện và cách đội ngũ tiếp cận từng công trình." : "Explore spaces, finished details, and how the team approaches each project."}
      />
      <section className="library-hub">
        <Link className="library-hub-card image-collection" href="/thu-vien/hinh-anh">
          {image ? <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 800px) 100vw, 60vw" /> : null}
          <span className="library-card-overlay" />
          <div><Images size={26} /><p>01</p><h2>{locale === "vi" ? "Thư viện hình ảnh" : "Image library"}</h2><span>{locale === "vi" ? "Xem bộ sưu tập" : "View collection"} <ArrowUpRight size={17} /></span></div>
        </Link>
        <Link className="library-hub-card video-collection" href="/thu-vien/video">
          <video src="/VIDEO-GIOI-THIEU-WEB.mp4" muted autoPlay loop playsInline aria-hidden="true" />
          <span className="library-card-overlay" />
          <div><Play size={26} /><p>02</p><h2>Video</h2><span>{locale === "vi" ? "Xem video" : "Watch video"} <ArrowUpRight size={17} /></span></div>
        </Link>
      </section>
    </>
  );
}
