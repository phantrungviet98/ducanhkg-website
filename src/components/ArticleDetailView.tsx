"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useLocale } from "@/lib/locale-context";

export function ArticleDetailView({ slug }: { slug: string }) {
  const { content } = useLocale();
  const article = content.articles.find((item) => item.slug === slug);

  if (!article) notFound();

  return (
    <article className="article-detail">
      <Image src={article.image} alt="" width={1200} height={720} />
      <p className="eyebrow">{article.category} · {article.date}</p>
      <h1>{article.title}</h1>
      <p className="lede">{article.excerpt}</p>
      <p>{content.pages.articleDetailBody}</p>
    </article>
  );
}
