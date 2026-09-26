"use client";

import { ServicesGrid } from "@/components/Sections";
import { PageIntro } from "@/components/ui/PageIntro";
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
