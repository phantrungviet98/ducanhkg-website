"use client";

import { Suspense } from "react";
import { SiteSearch } from "@/components/search/SiteSearch";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLocale } from "@/lib/locale-context";

export default function SearchPage() {
  const { locale } = useLocale();
  return (
    <>
      <PageIntro
        compact
        eyebrow={locale === "vi" ? "Tìm kiếm" : "Search"}
        title={locale === "vi" ? "Tìm đúng nội dung bạn đang cần" : "Find exactly what you need"}
        description={locale === "vi" ? "Tìm trong dự án, cẩm nang, dịch vụ và video đang có trên website." : "Search across projects, guides, services, and videos currently on the website."}
      />
      <Suspense fallback={<div className="search-prompt">Loading...</div>}><SiteSearch /></Suspense>
    </>
  );
}
