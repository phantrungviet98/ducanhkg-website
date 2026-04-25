import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { navItems, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">DA</span>
            <span>
              <strong>{site.name}</strong>
              <small>{site.tagline}</small>
            </span>
          </div>
          <p>
            Structured construction delivery for owners who need clarity from first brief to final handover.
          </p>
        </div>
        <div>
          <h3>Pages</h3>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Contact</h3>
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
