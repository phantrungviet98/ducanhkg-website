import { ArticleGrid, PageIntro } from "@/components/Sections";
import { articles } from "@/data/site";

export default function NewsPage() {
  return (
    <section className="section">
      <PageIntro
        eyebrow="News"
        title="Company updates and construction planning notes"
        description="The news structure supports future categories, authors, publishing state, SEO fields, and featured images."
      />
      <ArticleGrid items={articles} />
    </section>
  );
}
