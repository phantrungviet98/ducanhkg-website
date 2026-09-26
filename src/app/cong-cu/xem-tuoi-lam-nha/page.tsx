"use client";

import { HouseAgeTool } from "@/components/calculator/HouseAgeTool";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLocale } from "@/lib/locale-context";

export default function HouseAgePage() {
  const { locale } = useLocale();
  return (
    <>
      <PageIntro
        compact
        eyebrow={locale === "vi" ? "Công cụ trực tuyến" : "Online tool"}
        title={locale === "vi" ? "Xem tuổi làm nhà" : "Check your home-building year"}
        description={locale === "vi" ? "Chọn năm sinh và năm dự định xây để tham khảo Tam Tai, Kim Lâu, Hoang Ốc theo cách tính dân gian." : "Enter your lunar birth year and planned build year to explore three traditional Vietnamese age checks."}
      />
      <HouseAgeTool />
    </>
  );
}
