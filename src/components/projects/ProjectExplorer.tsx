"use client";

import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { useLocale } from "@/lib/locale-context";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function ProjectExplorer() {
  const { content, locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const type = params.get("type") ?? "all";
  const province = params.get("province") ?? "all";
  const area = params.get("area") ?? "all";
  const budget = params.get("budget") ?? "all";
  const year = params.get("year") ?? "all";
  const sort = params.get("sort") ?? "newest";

  function update(name: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all" || (name === "sort" && value === "newest")) next.delete(name);
    else next.set(name, value);
    router.replace(`${pathname}${next.size ? `?${next.toString()}` : ""}`, { scroll: false });
  }

  const filtered = useMemo(() => {
    const q = normalize(query);
    return content.projects
      .filter((project) => !q || normalize(`${project.title} ${project.summary} ${project.location} ${project.category}`).includes(q))
      .filter((project) => type === "all" || project.filters?.type === type)
      .filter((project) => province === "all" || project.filters?.province === province)
      .filter((project) => {
        const value = project.filters?.landAreaM2;
        if (area === "all") return true;
        if (!value) return false;
        if (area === "small") return value <= 120;
        if (area === "medium") return value > 120 && value <= 200;
        return value > 200;
      })
      .filter((project) => {
        const value = project.filters?.budgetBillion;
        if (budget === "all") return true;
        if (!value) return false;
        if (budget === "under3") return value < 3;
        if (budget === "threeToFive") return value >= 3 && value <= 5;
        return value > 5;
      })
      .filter((project) => year === "all" || project.year === year)
      .sort((a, b) => {
        if (sort === "popular") return (b.filters?.popularity ?? 0) - (a.filters?.popularity ?? 0);
        if (sort === "budgetLow") return (a.filters?.budgetBillion ?? Infinity) - (b.filters?.budgetBillion ?? Infinity);
        return Number(b.year) - Number(a.year);
      });
  }, [area, budget, content.projects, province, query, sort, type, year]);

  const labels = locale === "vi"
    ? {
        keyword: "Tìm theo tên, địa điểm...", all: "Tất cả", type: "Loại công trình", province: "Tỉnh/thành", area: "Diện tích đất", budget: "Khoảng ngân sách", year: "Năm", sort: "Sắp xếp", newest: "Mới nhất", popular: "Phổ biến", budgetLow: "Ngân sách thấp trước", small: "Đến 120 m²", medium: "121–200 m²", large: "Trên 200 m²", under3: "Dưới 3 tỷ", threeToFive: "3–5 tỷ", over5: "Trên 5 tỷ", result: "công trình phù hợp", empty: "Chưa có công trình phù hợp với bộ lọc này.", reset: "Xóa bộ lọc"
      }
    : {
        keyword: "Search by name or location...", all: "All", type: "Project type", province: "Province", area: "Land area", budget: "Budget range", year: "Year", sort: "Sort", newest: "Newest", popular: "Popular", budgetLow: "Lowest budget", small: "Up to 120 m²", medium: "121–200 m²", large: "Over 200 m²", under3: "Under 3B", threeToFive: "3–5B", over5: "Over 5B", result: "matching projects", empty: "No projects match these filters yet.", reset: "Clear filters"
      };

  return (
    <div className="project-explorer">
      <div className="project-filter-panel">
        <div className="project-filter-title"><SlidersHorizontal size={18} /><strong>{locale === "vi" ? "Tìm công trình phù hợp" : "Find the right project"}</strong></div>
        <label className="filter-search"><Search size={17} /><span className="sr-only">{labels.keyword}</span><input value={query} onChange={(event) => update("q", event.target.value)} placeholder={labels.keyword} /></label>
        <label><span>{labels.type}</span><select value={type} onChange={(event) => update("type", event.target.value)}><option value="all">{labels.all}</option><option value="townhouse">{locale === "vi" ? "Nhà phố" : "Townhouse"}</option><option value="villa">{locale === "vi" ? "Biệt thự" : "Villa"}</option><option value="level4">{locale === "vi" ? "Nhà cấp 4" : "Single-storey"}</option><option value="commercial">{locale === "vi" ? "Thương mại" : "Commercial"}</option></select></label>
        <label><span>{labels.province}</span><select value={province} onChange={(event) => update("province", event.target.value)}><option value="all">{labels.all}</option><option value="kien-giang">Kiên Giang</option><option value="can-tho">Cần Thơ</option><option value="other">{locale === "vi" ? "Khác" : "Other"}</option></select></label>
        <label><span>{labels.area}</span><select value={area} onChange={(event) => update("area", event.target.value)}><option value="all">{labels.all}</option><option value="small">{labels.small}</option><option value="medium">{labels.medium}</option><option value="large">{labels.large}</option></select></label>
        <label><span>{labels.budget}</span><select value={budget} onChange={(event) => update("budget", event.target.value)}><option value="all">{labels.all}</option><option value="under3">{labels.under3}</option><option value="threeToFive">{labels.threeToFive}</option><option value="over5">{labels.over5}</option></select></label>
        <label><span>{labels.year}</span><select value={year} onChange={(event) => update("year", event.target.value)}><option value="all">{labels.all}</option>{Array.from(new Set(content.projects.map((project) => project.year))).map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>

      <div className="project-result-bar">
        <p><strong>{String(filtered.length).padStart(2, "0")}</strong> {labels.result}</p>
        <div>
          <label><span className="sr-only">{labels.sort}</span><select value={sort} onChange={(event) => update("sort", event.target.value)}><option value="newest">{labels.newest}</option><option value="popular">{labels.popular}</option><option value="budgetLow">{labels.budgetLow}</option></select></label>
          {params.size ? <button type="button" onClick={() => router.replace(pathname, { scroll: false })}><RotateCcw size={15} /> {labels.reset}</button> : null}
        </div>
      </div>

      {filtered.length ? <ProjectGrid items={filtered} /> : <div className="project-empty"><Search size={30} /><h2>{labels.empty}</h2><button className="button primary" type="button" onClick={() => router.replace(pathname, { scroll: false })}>{labels.reset}</button></div>}
    </div>
  );
}
