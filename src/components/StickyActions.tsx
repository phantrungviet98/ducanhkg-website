"use client";

import { site } from "@/data/site";
import { useLocale } from "@/lib/locale-context";

export function StickyActions() {
  const { content } = useLocale();

  return (
    <div className="sticky-actions">
      <a href={`tel:${site.phone.replaceAll(" ", "")}`}>{content.common.call}</a>
      <a href={site.zalo}>{content.common.zalo}</a>
    </div>
  );
}
