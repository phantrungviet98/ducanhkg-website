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
            <Image className="brand-logo-image" src={site.logo} alt="" width={72} height={72} />
            <span className="brand-copy">
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
          <h3>{locale === "vi" ? "Khám phá" : "Explore"}</h3>
          <Link href="/thu-vien/hinh-anh">{locale === "vi" ? "Thư viện hình ảnh" : "Image library"}</Link>
          <Link href="/thu-vien/video">Video</Link>
          <Link href="/cam-nang">{locale === "vi" ? "Cẩm nang xây dựng" : "Construction guides"}</Link>
          <Link href="/cong-cu/du-toan">{locale === "vi" ? "Dự toán chi phí" : "Cost estimator"}</Link>
          <Link href="/cong-cu/xem-tuoi-lam-nha">{locale === "vi" ? "Xem tuổi làm nhà" : "Building year check"}</Link>
          <Link href="/tim-kiem">{locale === "vi" ? "Tìm kiếm" : "Search"}</Link>
          <Link href="/tuyen-dung">{locale === "vi" ? "Tuyển dụng" : "Careers"}</Link>
          <Link href="/lien-he-hop-tac">{locale === "vi" ? "Hợp tác" : "Partnership"}</Link>
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
