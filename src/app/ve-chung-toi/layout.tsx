import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Về chúng tôi", description: "Tìm hiểu đội ngũ, cách làm việc và cam kết chất lượng của Đức Anh KG.", path: "/ve-chung-toi" });
export default function AboutLayout({ children }: { children: React.ReactNode }) { return children; }
