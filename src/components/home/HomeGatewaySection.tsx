"use client";

import { ArrowUpRight, BookOpenText, Calculator, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export function HomeGatewaySection() {
  const { locale } = useLocale();
  const items = locale === "vi"
    ? [
        { title: "Dự toán chi phí xây dựng", description: "Nhập quy mô và điều kiện thi công để xem khoảng chi phí tham khảo.", href: "/cong-cu/du-toan", action: "Tính chi phí ngay", icon: Calculator },
        { title: "Xem tuổi làm nhà", description: "Tra cứu Tam Tai, Kim Lâu, Hoang Ốc theo năm sinh và năm xây dự định.", href: "/cong-cu/xem-tuoi-lam-nha", action: "Xem tuổi ngay", icon: CalendarDays },
        { title: "Cẩm nang trước khi xây", description: "Tra cứu các ghi chú ngắn về ngân sách, vật liệu và bàn giao.", href: "/cam-nang", action: "Đọc cẩm nang", icon: BookOpenText }
      ]
    : [
        { title: "Estimate construction cost", description: "Enter scale and site conditions to see an indicative range.", href: "/cong-cu/du-toan", action: "Estimate now", icon: Calculator },
        { title: "Check your building year", description: "Explore Tam Tai, Kim Lâu, and Hoang Ốc by birth year and planned build year.", href: "/cong-cu/xem-tuoi-lam-nha", action: "Check your year", icon: CalendarDays },
        { title: "Read before you build", description: "Browse practical notes for budgets, materials, and handover.", href: "/cam-nang", action: "Read the guides", icon: BookOpenText }
      ];

  return (
    <section className="home-gateways" aria-label={locale === "vi" ? "Công cụ trực tuyến" : "Online tools"}>
      <div className="home-gateways-inner">
        <div className="home-gateways-heading">
          <p className="eyebrow">{locale === "vi" ? "Công cụ trực tuyến" : "Online tools"}</p>
          <h2>{locale === "vi" ? "Công cụ hoàn toàn miễn phí và được dùng nhiều nhất" : "Free tools our visitors use most"}</h2>
          <p className="home-gateways-intro">{locale === "vi" ? "Bắt đầu từ con số, tìm ý tưởng phù hợp rồi chuẩn bị cho công trình của bạn." : "Start with an estimate, find the right ideas, and plan your build with confidence."}</p>
        </div>
        <div className="gateway-grid">
          {items.map(({ title, description, href, action, icon: Icon }, index) => (
            <Link className={`gateway-card${index === 0 ? " is-featured" : ""}`} href={href} key={href}>
              <div className="gateway-card-top"><span className="gateway-index">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span><span className="gateway-icon"><Icon size={30} strokeWidth={1.6} /></span></div>
              <div className="gateway-card-copy"><h3>{title}</h3><p>{description}</p></div>
              <div className="gateway-card-footer"><span>{action}</span><span className="gateway-arrow"><ArrowUpRight size={20} /></span></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
