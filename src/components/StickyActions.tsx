"use client";

import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { useLocale } from "@/lib/locale-context";

export function StickyActions() {
  const { content } = useLocale();

  return (
    <div className="sticky-actions">
      <a href={`tel:${site.phone.replaceAll(" ", "")}`} aria-label={`${content.common.call} ${site.phone}`}><Phone size={17} /><span>{content.common.call}</span></a>
      <a href={site.zalo} aria-label={content.common.zalo}><MessageCircle size={17} /><span>{content.common.zalo}</span></a>
    </div>
  );
}
