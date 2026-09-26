import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Video công trình", description: "Video giới thiệu đội ngũ, quy trình và hành trình triển khai công trình.", path: "/thu-vien/video" });
export default function VideoLibraryLayout({ children }: { children: React.ReactNode }) { return children; }
