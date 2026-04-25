"use client";

import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { site } from "@/data/site";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { content, locale } = useLocale();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="brand footer-brand">
            <Image className="brand-logo-image" src={site.logo} alt="" width={52} height={52} />
            <span>
              <strong>{site.name}</strong>
              <small>{locale === "vi" ? site.tagline : "Design - Construction - Turnkey delivery"}</small>
            </span>
          </div>
          <p>{content.common.footerDescription}</p>
        </div>
        <div>
          <h3>{content.common.pages}</h3>
          {content.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>{content.common.contact}</h3>
          <p><Phone size={16} /> {site.phone}</p>
          <p><Mail size={16} /> {site.email}</p>
          <p><MapPin size={16} /> {site.address}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 {site.name}. All rights reserved.</span>
        <Link href={site.facebook}><Facebook size={18} /> Facebook</Link>
      </div>
    </footer>
  );
}
