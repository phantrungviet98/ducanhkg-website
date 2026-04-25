"use client";

import { ArticleGrid, PageIntro } from "@/components/Sections";
import { useLocale } from "@/lib/locale-context";

export default function NewsPage() {
  const { content } = useLocale();
  const page = content.pages.news;

  return (
    <section className="section">
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      <ArticleGrid items={content.articles} />
    </section>
  );
}
