import { permanentRedirect } from "next/navigation";
import { localizedContent } from "@/data/localized";

export function generateStaticParams() {
  return localizedContent.vi.articles.map((article) => ({ slug: article.slug }));
}

export default async function LegacyArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/cam-nang/${slug}`);
}
