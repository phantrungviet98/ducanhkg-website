"use client";

/* eslint-disable @next/next/no-img-element -- Project images may come from Supabase Storage. */

import { ArrowUpRight, BookOpenText, Building2, Search, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { videos } from "@/data/media";
import { useLocale } from "@/lib/locale-context";

type SearchCategory = "all" | "projects" | "articles" | "videos" | "services";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function SiteSearch() {
  const { content, locale } = useLocale();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = params.get("q") ?? "";
  const category = (params.get("category") ?? "all") as SearchCategory;
  const [draft, setDraft] = useState(query);

  const items = useMemo(() => [
    ...content.projects.map((item) => ({ type: "projects" as const, title: item.title, description: `${item.category} · ${item.location} · ${item.summary}`, href: `/du-an/${item.slug}`, image: item.image, category: item.category, location: item.location, year: item.year })),
    ...content.articles.map((item) => ({ type: "articles" as const, title: item.title, description: `${item.category} · ${item.excerpt}`, href: `/cam-nang/${item.slug}` })),
    ...videos[locale].map((item) => ({ type: "videos" as const, title: item.title, description: item.description, href: "/thu-vien/video" })),
    ...content.services.map((item) => ({ type: "services" as const, title: item.title, description: item.description, href: "/linh-vuc" }))
  ], [content, locale]);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return items.filter((item) => (category === "all" || item.type === category) && normalize(`${item.title} ${item.description}`).includes(q));
  }, [category, items, query]);
  const projectResults = results.filter((item) => item.type === "projects");
  const otherResults = results.filter((item) => item.type !== "projects");

  function setUrl(nextQuery: string, nextCategory: SearchCategory) {
    const next = new URLSearchParams();
    if (nextQuery.trim()) next.set("q", nextQuery.trim());
    if (nextCategory !== "all") next.set("category", nextCategory);
    router.replace(`${pathname}${next.size ? `?${next.toString()}` : ""}`, { scroll: false });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    setUrl(draft, category);
  }

  const categories: { value: SearchCategory; vi: string; en: string }[] = [
    { value: "all", vi: "Tất cả", en: "All" },
    { value: "projects", vi: "Dự án", en: "Projects" },
    { value: "articles", vi: "Cẩm nang", en: "Guides" },
    { value: "videos", vi: "Video", en: "Video" },
    { value: "services", vi: "Dịch vụ", en: "Services" }
  ];

  const icon = { projects: Building2, articles: BookOpenText, videos: Search, services: Wrench };

  return (
    <section className="site-search-section">
      <form className="site-search-form" onSubmit={submit}>
        <Search size={24} />
        <label className="sr-only" htmlFor="site-search-input">{locale === "vi" ? "Từ khóa tìm kiếm" : "Search term"}</label>
        <input id="site-search-input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={locale === "vi" ? "Tìm dự án, cẩm nang, video..." : "Search projects, guides, videos..."} autoFocus />
        <button className="button primary" type="submit">{locale === "vi" ? "Tìm kiếm" : "Search"}</button>
      </form>
      <div className="search-categories">
        {categories.map((item) => <button className={category === item.value ? "is-active" : ""} type="button" key={item.value} onClick={() => setUrl(query, item.value)}>{locale === "vi" ? item.vi : item.en}</button>)}
      </div>

      {!query ? <div className="search-prompt"><Search size={34} /><h2>{locale === "vi" ? "Nhập từ khóa để bắt đầu." : "Enter a term to begin."}</h2><p>{locale === "vi" ? "Bạn có thể tìm theo tên công trình, địa điểm, vật liệu hoặc nhu cầu xây dựng." : "Search by project name, location, material, or building need."}</p></div> : null}
      {query ? <div className="search-result-summary"><p>{locale === "vi" ? "Kết quả cho" : "Results for"} “<strong>{query}</strong>”</p><span>{results.length}</span></div> : null}
      {query && !results.length ? <div className="search-prompt"><h2>{locale === "vi" ? "Chưa tìm thấy nội dung phù hợp." : "No matching content found."}</h2><p>{locale === "vi" ? "Thử từ khóa ngắn hơn hoặc chọn lại Tất cả." : "Try a shorter term or select All."}</p></div> : null}
      {projectResults.length > 0 && <div className="search-project-results">
        <h2 className="search-results-heading">{locale === "vi" ? "Dự án phù hợp" : "Matching projects"}<span>{String(projectResults.length).padStart(2, "0")}</span></h2>
        <div className="search-project-grid">{projectResults.map((result) => <Link className="search-project-card" href={result.href} key={result.title}>
          <div className="search-project-image"><img src={result.image} alt={result.title} loading="lazy" /><span>{result.year}</span></div>
          <div className="search-project-copy"><small>{result.category}</small><h3>{result.title}</h3><p>{result.location}</p><span className="search-project-link">{locale === "vi" ? "Xem dự án" : "View project"}<ArrowUpRight size={17} /></span></div>
        </Link>)}</div>
      </div>}
      {otherResults.length > 0 && <div className="search-result-list">{otherResults.map((result, index) => { const Icon = icon[result.type]; return <Link href={result.href} key={`${result.type}-${result.title}`}><span>{String(index + 1).padStart(2, "0")}</span><Icon size={22} /><div><small>{categories.find((item) => item.value === result.type)?.[locale]}</small><h2>{result.title}</h2><p>{result.description}</p></div><ArrowUpRight size={20} /></Link>; })}</div>}
    </section>
  );
}
