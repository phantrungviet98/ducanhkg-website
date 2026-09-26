"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLocale } from "@/lib/locale-context";

export default function ImageLibraryPage() {
  const { content, locale } = useLocale();
  const images = content.projects.flatMap((project) => (project.gallery ?? []).map((image) => ({ ...image, project })));

  return (
    <>
      <PageIntro
        eyebrow={locale === "vi" ? "Thư viện hình ảnh" : "Image library"}
        title={locale === "vi" ? "Không gian, vật liệu và chi tiết hoàn thiện" : "Spaces, materials, and finished details"}
        description={locale === "vi" ? `${images.length} hình ảnh chọn lọc từ các hồ sơ công trình đang hiển thị.` : `${images.length} selected images from the current project portfolio.`}
      />
      <section className="image-library-grid">
        {images.map((item, index) => (
          <figure className={`image-library-item item-${(index % 5) + 1}`} key={`${item.project.slug}-${item.src}`}>
            <Image src={item.src} alt={item.alt} width={1400} height={1000} priority={index === 0} sizes="(max-width: 700px) 100vw, 50vw" />
            <figcaption><span>{item.alt}</span><Link href={`/du-an/${item.project.slug}`}>{item.project.title} <ArrowUpRight size={14} /></Link></figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}
