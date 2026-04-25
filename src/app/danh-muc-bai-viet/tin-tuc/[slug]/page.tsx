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
        Nội dung bài viết hiện là dữ liệu mẫu. Admin sau này có thể lưu nội dung rich text, hình ảnh, SEO metadata và trạng thái xuất bản trong Supabase.
      </p>
    </article>
  );
}
