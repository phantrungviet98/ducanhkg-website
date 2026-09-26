import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Dự án", description: "Khám phá các công trình thiết kế, xây dựng và hoàn thiện tiêu biểu của Đức Anh KG.", path: "/du-an" });
export default function ProjectsLayout({ children }: { children: React.ReactNode }) { return children; }
