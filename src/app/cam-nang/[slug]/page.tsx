import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetailView } from "@/components/ArticleDetailView";
import { localizedContent } from "@/data/localized";
import { getPublicArticle, getPublicArticles } from "@/lib/articles";
import { site } from "@/data/site";
import { createMetadata, safeJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return localizedContent.vi.articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublicArticle(slug);
  if (!article) return {};
  return {
    ...createMetadata({ title: article.title, description: article.excerpt, path: `/cam-nang/${article.slug}`, image: article.image }),
    title: { absolute: `${article.title} | ${site.name}` }
  };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublicArticle(slug);
  if (!article) notFound();
  const related = (await getPublicArticles()).filter((item) => item.slug !== slug).slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: `${site.url}/cam-nang/${article.slug}`,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}${site.logo}` } }
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} /><ArticleDetailView article={article} related={related} /></>;
}
