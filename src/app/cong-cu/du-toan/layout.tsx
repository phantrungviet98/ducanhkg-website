import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Dự toán chi phí xây dựng", description: "Công cụ ước tính diện tích quy đổi và khoảng chi phí xây dựng sơ bộ theo quy mô công trình.", path: "/cong-cu/du-toan" });
export default function EstimatorLayout({ children }: { children: React.ReactNode }) { return children; }
