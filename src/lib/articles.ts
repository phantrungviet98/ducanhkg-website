import { localizedContent } from "@/data/localized";
import { getSupabaseServerClient } from "@/lib/supabase";
import type { Article } from "@/types/content";

export type ArticleRow = {
  slug: string;
  title: string;
  category: string;
  published_at: string;
  image: string;
  excerpt: string;
  body: string[];
  published: boolean;
  sort_order: number;
};

export function articleFromRow(row: ArticleRow): Article {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    date: row.published_at,
    image: row.image,
    excerpt: row.excerpt,
    body: row.body,
  };
}

export async function getPublicArticles(): Promise<Article[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return localizedContent.vi.articles;
  const { data, error } = await supabase.from("articles").select("*").eq("published", true)
    .order("sort_order").order("published_at", { ascending: false });
  if (error) return localizedContent.vi.articles;
  return (data as ArticleRow[]).map(articleFromRow);
}

export async function getPublicArticle(slug: string): Promise<Article | undefined> {
  return (await getPublicArticles()).find((article) => article.slug === slug);
}
