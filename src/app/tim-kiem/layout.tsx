import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Tìm kiếm", description: "Tìm dự án, cẩm nang, dịch vụ và video trên website Đức Anh KG.", path: "/tim-kiem", noIndex: true });
export default function SearchLayout({ children }: { children: React.ReactNode }) { return children; }
