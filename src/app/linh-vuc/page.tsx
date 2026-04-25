import { PageIntro, ServicesGrid } from "@/components/Sections";
import { services } from "@/data/site";

export default function SectorsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Lĩnh vực"
        title="Nhà ở, thương mại, cải tạo và hoàn thiện nội thất"
        description="Mỗi lĩnh vực đang được lưu dạng dữ liệu có cấu trúc để sau này quản lý từ admin Supabase."
      />
      <ServicesGrid items={services} />
    </>
  );
}
