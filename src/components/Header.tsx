"use client";

import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useLocale } from "@/lib/locale-context";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { content, locale, setLocale } = useLocale();
  const transparent = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header className={`site-header ${transparent ? "is-transparent" : "is-solid"}`}>
      <Link className="brand" href="/" aria-label={`${site.name} ${content.common.homeAria}`}>
        <Image className="brand-logo-image" src={site.logo} alt="" width={52} height={52} />
        <span>
          <strong>{site.name}</strong>
          <small>{locale === "vi" ? site.tagline : "Design - Construction - Turnkey delivery"}</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label={content.common.mainNavigation}>
        {content.nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="header-call" href={`tel:${site.phone.replaceAll(" ", "")}`}>
        <Phone size={17} />
        <span>{site.phone}</span>
      </Link>

      <div className="language-picker" aria-label="Language">
        <button className={locale === "vi" ? "active" : ""} onClick={() => setLocale("vi")} type="button">
          VI
        </button>
        <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")} type="button">
          EN
        </button>
      </div>

      <button className="menu-button" onClick={() => setOpen(true)} aria-label={content.common.openMenu}>
        <Menu size={24} />
      </button>

      {open ? (
        <div className="mobile-panel">
          <button className="menu-button close" onClick={() => setOpen(false)} aria-label={content.common.closeMenu}>
            <X size={24} />
          </button>
          <div className="mobile-language-picker">
            <button className={locale === "vi" ? "active" : ""} onClick={() => setLocale("vi")} type="button">
              Tiếng Việt
            </button>
            <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")} type="button">
              English
            </button>
          </div>
          {content.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="button primary" href="/dang-ky-tu-van-ho-tro" onClick={() => setOpen(false)}>
            {content.common.consultationCta}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
