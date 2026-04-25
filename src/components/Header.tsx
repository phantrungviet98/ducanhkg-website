"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { navItems, site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${site.name} home`}>
        <BrandLogo />
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
