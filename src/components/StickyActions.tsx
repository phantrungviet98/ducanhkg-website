"use client";

import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { useLocale } from "@/lib/locale-context";
import { trackEvent } from "@/lib/analytics";

export function StickyActions() {
  const { content } = useLocale();

  return (
    <div className="sticky-actions">
      <a href={`tel:${site.phone.replaceAll(" ", "")}`} onClick={() => trackEvent("click_phone", { placement: "sticky" })} aria-label={`${content.common.call} ${site.phone}`}><Phone size={17} /><span>{content.common.call}</span></a>
      <a href={site.zalo} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("click_zalo", { placement: "sticky" })} aria-label={content.common.zalo}><MessageCircle size={17} /><span>{content.common.zalo}</span></a>
    </div>
  );
}
