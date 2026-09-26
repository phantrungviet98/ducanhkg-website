import type { MetadataRoute } from "next";
import { importedProjects } from "@/data/imported-projects";
import { site } from "@/data/site";
import { getPublicArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const updated = new Date("2026-09-15T00:00:00+07:00");
  const routes = [
    "", "/ve-chung-toi", "/linh-vuc", "/du-an", "/cam-nang", "/thu-vien", "/thu-vien/hinh-anh", "/thu-vien/video", "/cong-cu/du-toan", "/cong-cu/xem-tuoi-lam-nha", "/tuyen-dung", "/lien-he", "/lien-he-hop-tac", "/dang-ky-tu-van-ho-tro"
  ];
  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: updated,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : ["/du-an", "/cam-nang", "/cong-cu/du-toan", "/cong-cu/xem-tuoi-lam-nha"].includes(path) ? 0.8 : 0.6
  }));
  const projectEntries: MetadataRoute.Sitemap = importedProjects.map((project) => ({
    url: `${site.url}/du-an/${project.slug}`,
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.7
  }));
  const articleEntries: MetadataRoute.Sitemap = (await getPublicArticles()).map((article) => ({
    url: `${site.url}/cam-nang/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.65
  }));

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
