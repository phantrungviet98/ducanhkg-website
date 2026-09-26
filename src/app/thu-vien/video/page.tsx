"use client";

import { ArrowUpRight, Play } from "lucide-react";
import Link from "next/link";
import { PageIntro } from "@/components/ui/PageIntro";
import { videos } from "@/data/media";
import { useLocale } from "@/lib/locale-context";

export default function VideoLibraryPage() {
  const { locale } = useLocale();
  const items = videos[locale];

  return (
    <>
      <PageIntro
        eyebrow="Video"
        title={locale === "vi" ? "Theo dõi hành trình từ ý tưởng đến công trình" : "Follow the journey from idea to build"}
        description={locale === "vi" ? "Các video giới thiệu đội ngũ, quy trình và góc nhìn thực tế tại công trình." : "Videos introducing the team, working process, and practical project perspectives."}
      />
      <section className="video-library">
        {items.map((video, index) => (
          <article className="video-feature" key={video.slug}>
            <div className="video-player-wrap"><video controls playsInline poster={video.image} preload="metadata"><source src={video.href} type="video/mp4" /></video><span><Play size={15} /> {video.duration}</span></div>
            <div className="video-feature-copy"><p className="eyebrow">{String(index + 1).padStart(2, "0")} · Video</p><h2>{video.title}</h2><p>{video.description}</p><Link href="/dang-ky-tu-van-ho-tro">{locale === "vi" ? "Trao đổi về công trình" : "Discuss your project"} <ArrowUpRight size={16} /></Link></div>
          </article>
        ))}
      </section>
    </>
  );
}
