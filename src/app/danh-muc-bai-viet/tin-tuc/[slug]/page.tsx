import { notFound } from "next/navigation";
import { articles } from "@/data/site";
import Image from "next/image";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <article className="article-detail">
      <Image src={article.image} alt="" width={1200} height={720} />
      <p className="eyebrow">{article.category} · {article.date}</p>
      <h1>{article.title}</h1>
      <p className="lede">{article.excerpt}</p>
      <p>
        This article body is placeholder content. The later admin panel can store rich text, images, SEO metadata, and publishing status in Supabase.
      </p>
    </article>
  );
}
