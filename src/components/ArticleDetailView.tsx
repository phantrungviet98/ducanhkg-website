"use client";

import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { useLocale } from "@/lib/locale-context";
import type { Article } from "@/types/content";

export function ArticleDetailView({ article, related }: { article: Article; related: Article[] }) {
  const { content, locale } = useLocale();

  const paragraphs = article.body?.length ? [article.excerpt, ...article.body] : (locale === "vi"
    ? [
        article.excerpt,
        "Trước khi đưa ra quyết định, gia chủ nên thống nhất nhu cầu sử dụng, mức đầu tư dự kiến và các mốc thời gian quan trọng. Một phạm vi rõ ràng giúp kiến trúc sư và đội thi công đề xuất giải pháp sát thực tế hơn.",
        "Các lựa chọn về mặt bằng, vật liệu và thiết bị nên được ghi nhận theo từng mốc duyệt. Cách làm này giúp so sánh phương án, kiểm soát thay đổi và hạn chế chi phí phát sinh trong quá trình thi công.",
        content.pages.articleDetailBody
      ]
    : [
        article.excerpt,
        "Before making decisions, owners should align on functional needs, an expected investment range, and key timing milestones. A clear scope helps designers and builders propose a more practical response.",
        "Layout, material, and equipment choices should be recorded at agreed approval points. This makes alternatives easier to compare, controls changes, and limits avoidable cost increases during construction.",
        content.pages.articleDetailBody
      ]);

  return (
    <>
      <article className="guide-detail">
        <header className="guide-detail-header">
          <Link className="back-link" href="/cam-nang"><ArrowLeft size={16} /> {locale === "vi" ? "Tất cả cẩm nang" : "All guides"}</Link>
          <p className="eyebrow">{article.category}</p>
          <h1>{article.title}</h1>
          <div className="guide-meta"><span>{article.date}</span><span><Clock3 size={15} /> {locale === "vi" ? "5 phút đọc" : "5 min read"}</span></div>
        </header>
        <figure className="guide-cover">
          <Image src={article.image} alt={article.title} width={1800} height={1050} priority sizes="100vw" />
        </figure>
        <div className="guide-body-layout">
          <aside>
            <span>{locale === "vi" ? "Chủ đề" : "Topic"}</span>
            <strong>{article.category}</strong>
            <Link href="/dang-ky-tu-van-ho-tro">{locale === "vi" ? "Trao đổi với đội ngũ" : "Talk to the team"} <ArrowUpRight size={15} /></Link>
          </aside>
          <div className="guide-prose">
            <p className="lede">{paragraphs[0]}</p>
            {paragraphs.slice(1).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="related-guides">
          <div className="related-projects-heading">
            <div>
              <p className="eyebrow">{locale === "vi" ? "Đọc tiếp" : "Keep reading"}</p>
              <h2>{locale === "vi" ? "Cẩm nang liên quan" : "Related guides"}</h2>
            </div>
            <Link href="/cam-nang">{locale === "vi" ? "Xem tất cả" : "View all"} <ArrowUpRight size={16} /></Link>
          </div>
          <ArticleGrid items={related} />
        </section>
      ) : null}
    </>
  );
}
