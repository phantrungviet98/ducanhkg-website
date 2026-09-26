"use client";

import { ArrowRight, Images, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export function HomeLibrarySection() {
  const { content, locale } = useLocale();
  const images = content.projects.flatMap((project) => project.gallery ?? []).slice(0, 3);

  return (
    <section className="home-library">
      <div className="home-library-copy">
        <p className="eyebrow">{locale === "vi" ? "Video và hình ảnh thực tế" : "Project video and images"}</p>
        <h2>{locale === "vi" ? "Xem công trình qua không gian, chi tiết và quá trình hoàn thiện." : "See projects through spaces, details, and the finishing process."}</h2>
        <p>{locale === "vi" ? "Thư viện được sắp theo từng nhóm để bạn xem nhanh trước khi trao đổi nhu cầu với đội ngũ." : "The library is grouped for quick browsing before you discuss your needs with the team."}</p>
        <div className="actions">
          <Link href="/thu-vien/hinh-anh" className="library-text-link"><Images size={18} /> {locale === "vi" ? "Xem hình ảnh" : "View images"} <ArrowRight size={16} /></Link>
          <Link href="/thu-vien/video" className="library-text-link"><Play size={18} /> Video <ArrowRight size={16} /></Link>
        </div>
      </div>
      <div className="home-library-collage">
        {images.map((item, index) => (
          <Image key={item.src} className={`library-collage-${index + 1}`} src={item.src} alt={item.alt} width={900} height={700} sizes="(max-width: 900px) 50vw, 28vw" />
        ))}
      </div>
    </section>
  );
}
