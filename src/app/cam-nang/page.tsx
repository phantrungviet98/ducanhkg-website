"use client";

import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { ContentSection } from "@/components/ui/ContentSection";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLocale } from "@/lib/locale-context";

export default function GuidesPage() {
  const { content, locale } = useLocale();
  const categories = Array.from(new Set(content.articles.map((article) => article.category)));

  return (
    <>
      <PageIntro
        compact
        eyebrow={locale === "vi" ? "Cẩm nang" : "Guides"}
        title={locale === "vi" ? "Chuẩn bị tốt hơn cho từng quyết định xây dựng" : "Prepare better for every building decision"}
        description={locale === "vi" ? "Các ghi chú ngắn, dễ tra cứu về lập kế hoạch, kiểm soát chất lượng và lựa chọn vật liệu." : "Short, practical notes on planning, quality control, and material choices."}
      />
      <ContentSection className="guide-index">
        <div className="guide-category-strip" aria-label={locale === "vi" ? "Chủ đề cẩm nang" : "Guide topics"}>
          <span>{locale === "vi" ? "Chủ đề" : "Topics"}</span>
          {categories.map((category) => <strong key={category}>{category}</strong>)}
        </div>
        <ArticleGrid items={content.articles} />
      </ContentSection>
    </>
  );
}
