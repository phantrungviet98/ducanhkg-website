import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Thư viện hình ảnh", description: "Bộ sưu tập không gian, vật liệu và chi tiết hoàn thiện từ các công trình tiêu biểu.", path: "/thu-vien/hinh-anh" });
export default function ImageLibraryLayout({ children }: { children: React.ReactNode }) { return children; }
