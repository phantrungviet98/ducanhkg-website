"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";
import { useInView } from "@/lib/use-in-view";
import type { Article } from "@/types/content";

export function ArticleGrid({ items }: { items: Article[] }) {
  const { content } = useLocale();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div className="grid three" ref={ref}>
      {items.map((article, index) => (
        <Link
          className={`article-card fade-up${inView ? " in-view" : ""}`}
          href={`/cam-nang/${article.slug}`}
          key={article.slug}
          style={{ transitionDelay: inView ? `${index * 0.1}s` : "0s" }}
        >
          <Image src={article.image} alt={article.title} width={900} height={680} sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" />
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
