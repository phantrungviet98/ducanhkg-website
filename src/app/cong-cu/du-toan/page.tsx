"use client";

import { CostCalculator } from "@/components/calculator/CostCalculator";
import { PageIntro } from "@/components/ui/PageIntro";
import { useLocale } from "@/lib/locale-context";

export default function CostEstimatorPage() {
  const { locale } = useLocale();
  return (
    <>
      <PageIntro
        compact
        eyebrow={locale === "vi" ? "Công cụ trực tuyến" : "Online tool"}
        title={locale === "vi" ? "Dự toán sơ bộ chi phí xây dựng" : "Early construction cost estimate"}
        description={locale === "vi" ? "Nhập thông tin cơ bản để xem diện tích quy đổi và khoảng chi phí tham khảo. Công cụ sử dụng bảng hệ số tĩnh, chưa thay thế báo giá chính thức." : "Enter the basics to see a converted construction area and indicative cost range. Static factors are used and the result is not a formal quotation."}
      />
      <CostCalculator />
    </>
  );
}
