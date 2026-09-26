"use client";

import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { useLocale } from "@/lib/locale-context";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { content, locale, setLocale } = useLocale();
  const transparent = (pathname === "/" || pathname === "/du-an") && !scrolled && !open;

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header ${transparent ? "is-transparent" : "is-solid"}`}>
      <Link className="brand" href="/" aria-label={`${site.name} ${content.common.homeAria}`}>
        <Image className="brand-logo-image" src={site.logo} alt="" width={72} height={72} priority />
        <span className="brand-copy">
          <strong>{site.name}</strong>
          <small>{locale === "vi" ? site.tagline : "Design - Construction - Turnkey delivery"}</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label={content.common.mainNavigation}>
        {content.nav.map((item) => (
          <Link className={isActive(item.href) ? "is-active" : ""} key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="header-search" href="/tim-kiem" aria-label={locale === "vi" ? "Tìm kiếm" : "Search"}>
        <Search size={18} />
      </Link>

      <Link className="header-call" href="/dang-ky-tu-van-ho-tro">
        <span>{content.common.consultationCta}</span>
        <ArrowUpRight size={16} />
      </Link>

      <div className="language-picker" aria-label="Language">
        <button className={locale === "vi" ? "active" : ""} onClick={() => setLocale("vi")} type="button">
          VI
        </button>
        <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")} type="button">
          EN
        </button>
      </div>

      <button
        aria-controls="mobile-navigation"
        aria-expanded={open}
        aria-label={content.common.openMenu}
        className="menu-button"
        onClick={() => setOpen(true)}
        ref={menuButtonRef}
      >
        <Menu size={24} />
      </button>

      {open ? (
        <div className="mobile-panel is-open" id="mobile-navigation" role="dialog" aria-modal="true" aria-label={content.common.mainNavigation}>
          <button className="menu-button close" onClick={() => setOpen(false)} aria-label={content.common.closeMenu} ref={closeButtonRef}>
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
            <Link className={isActive(item.href) ? "is-active" : ""} key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className={isActive("/tim-kiem") ? "is-active" : ""} href="/tim-kiem" onClick={() => setOpen(false)}>
            {locale === "vi" ? "Tìm kiếm" : "Search"}
          </Link>
          <ButtonLink href="/dang-ky-tu-van-ho-tro" onClick={() => setOpen(false)}>
            {content.common.consultationCta}
          </ButtonLink>
        </div>
      ) : null}
    </header>
  );
}
