"use client";

import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/locale-context";

export function HomeProjectFinder() {
  const { locale } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const copy = locale === "vi"
    ? {
        label: "Khám phá website",
        searchLabel: "Tìm kiếm toàn website",
        placeholder: "Tìm dự án, chi phí, vật liệu, kinh nghiệm xây nhà...",
        submit: "Tìm kiếm",
        greeting: "Chào bạn, hãy bắt đầu từ điều bạn đang quan tâm.",
        features: [
          {
            title: "Kho dự án theo nhu cầu",
            description: "Tham khảo công trình theo loại nhà, diện tích, khu vực và khoảng ngân sách dự kiến.",
            href: "/du-an"
          },
          {
            title: "Công cụ dự toán trực tuyến",
            description: "Ước tính nhanh khoảng chi phí từ quy mô, điều kiện thi công và mức hoàn thiện.",
            href: "/cong-cu/du-toan"
          },
          {
            title: "Cẩm nang kiến trúc xây dựng",
            description: "Kinh nghiệm thực tế về chuẩn bị ngân sách, vật liệu, thi công và bàn giao công trình.",
            href: "/cam-nang"
          }
        ],
        suggestions: ["Rạch Giá", "Nội thất phòng ngủ", "Cửa hàng Đức Anh"]
      }
    : {
        label: "Explore the website",
        searchLabel: "Search the entire website",
        placeholder: "Search projects, costs, materials, or building advice...",
        submit: "Search",
        greeting: "Welcome. Start with what matters to your project.",
        features: [
          {
            title: "Projects for real needs",
            description: "Explore work by building type, land area, location, and expected budget.",
            href: "/du-an"
          },
          {
            title: "Online cost estimator",
            description: "Get an early cost range from project scale, site conditions, and finish level.",
            href: "/cong-cu/du-toan"
          },
          {
            title: "Architecture and building guides",
            description: "Practical experience for budgets, materials, construction, and handover.",
            href: "/cam-nang"
          }
        ],
        suggestions: ["Rạch Giá", "Nội thất phòng ngủ", "Cửa hàng Đức Anh"]
      };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim();
    router.push(normalizedQuery ? `/tim-kiem?q=${encodeURIComponent(normalizedQuery)}` : "/tim-kiem");
  }

  return (
    <section className="home-discovery" aria-labelledby="home-discovery-title">
      <p className="eyebrow home-discovery-label" id="home-discovery-title">{copy.label}</p>
      <div className="home-discovery-features">
        {copy.features.map((feature, index) => (
          <Link className="home-discovery-feature" href={feature.href} key={feature.href}>
            <span className="home-discovery-number" aria-hidden="true">{index + 1}</span>
            <div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
              <span className="home-discovery-link">
                {locale === "vi" ? "Khám phá" : "Explore"} <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="home-discovery-search-row">
        <div className="home-search-suggestions" aria-label={locale === "vi" ? "Từ khóa gợi ý" : "Suggested searches"}>
          {copy.suggestions.map((suggestion) => (
            <Link href={`/tim-kiem?q=${encodeURIComponent(suggestion)}`} key={suggestion}>{suggestion}</Link>
          ))}
        </div>
        <form className="home-site-search" onSubmit={submit} role="search">
          <label className="sr-only" htmlFor="home-site-search-input">{copy.searchLabel}</label>
          <Search size={24} aria-hidden="true" />
          <input
            id="home-site-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.placeholder}
          />
          <button type="submit" aria-label={copy.submit}><ArrowUpRight size={21} /></button>
        </form>
      </div>

      <p className="home-discovery-greeting">{copy.greeting}</p>
    </section>
  );
}
