import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Xem tuổi làm nhà",
  description: "Tra cứu tuổi mụ, Tam Tai, Kim Lâu và Hoang Ốc theo năm sinh và năm dự định xây nhà âm lịch.",
  path: "/cong-cu/xem-tuoi-lam-nha"
});

export default function HouseAgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
