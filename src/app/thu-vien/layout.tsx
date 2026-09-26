import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Thư viện công trình", description: "Hình ảnh và video về không gian, chi tiết hoàn thiện và công trình Đức Anh KG.", path: "/thu-vien" });
export default function LibraryLayout({ children }: { children: React.ReactNode }) { return children; }
