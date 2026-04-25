"use client";

import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const transparent = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header className={`site-header ${transparent ? "is-transparent" : "is-solid"}`}>
      <Link className="brand" href="/" aria-label={`${site.name} home`}>
        <Image className="brand-logo-image" src={site.logo} alt="" width={52} height={52} />
        <span>
          <strong>{site.name}</strong>
          <small>{site.tagline}</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link className="header-call" href={`tel:${site.phone.replaceAll(" ", "")}`}>
        <Phone size={17} />
        <span>{site.phone}</span>
      </Link>

      <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu size={24} />
      </button>

      {open ? (
        <div className="mobile-panel">
          <button className="menu-button close" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="button primary" href="/dang-ky-tu-van-ho-tro" onClick={() => setOpen(false)}>
            Đăng ký tư vấn
          </Link>
        </div>
      ) : null}
    </header>
  );
}
