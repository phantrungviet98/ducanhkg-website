import { ArticleDetailView } from "@/components/ArticleDetailView";
import { localizedContent } from "@/data/localized";

export function generateStaticParams() {
  return localizedContent.vi.articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <ArticleDetailView slug={slug} />;
}
