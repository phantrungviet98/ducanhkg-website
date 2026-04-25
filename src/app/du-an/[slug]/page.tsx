import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { projects } from "@/data/site";
import Image from "next/image";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <section className="detail-hero">
        <Image src={project.image} alt="" width={1200} height={900} />
        <div>
          <p className="eyebrow">{project.category} · {project.year}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <p><strong>Địa điểm:</strong> {project.location}</p>
        </div>
      </section>
      <section className="section two-column">
        <div>
          <h2>Cách triển khai</h2>
          <p>
            Nội dung chi tiết hiện là dữ liệu mẫu. Sau này admin có thể quản lý thông tin dự án, thư viện ảnh, phạm vi, tiến độ và ghi chú bàn giao.
          </p>
        </div>
        <ContactForm source={`project:${project.slug}`} title="Tư vấn công trình tương tự" />
      </section>
    </>
  );
}
