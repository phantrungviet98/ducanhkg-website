import { PageIntro, ProjectGrid } from "@/components/Sections";
import { projects } from "@/data/site";

export default function ProjectsPage() {
  return (
    <section className="section">
      <PageIntro
        eyebrow="Dự án"
        title="Các công trình xây dựng và hoàn thiện tiêu biểu"
        description="Danh sách dự án đã tách dữ liệu để sau này có thể tải từ Supabase, thêm bộ lọc, thư viện ảnh và chỉnh sửa từ admin."
      />
      <ProjectGrid items={projects} />
    </section>
  );
}
