import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Lĩnh vực hoạt động", description: "Tư vấn thiết kế, thi công nhà ở, hoàn thiện thương mại và cải tạo sửa chữa.", path: "/linh-vuc" });
export default function SectorsLayout({ children }: { children: React.ReactNode }) { return children; }
