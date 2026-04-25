"use client";

import { PageIntro, ServicesGrid } from "@/components/Sections";
import { useLocale } from "@/lib/locale-context";

export default function SectorsPage() {
  const { content } = useLocale();
  const page = content.pages.sectors;

  return (
    <>
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      <ServicesGrid items={content.services} />
    </>
  );
}
