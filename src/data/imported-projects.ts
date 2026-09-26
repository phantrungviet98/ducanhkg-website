import type { Project, ProjectStatus } from "@/types/content";

type ImportedProject = {
  slug: string;
  title: string;
  category?: string;
  location?: string;
  year?: string;
  status?: ProjectStatus;
  photoCount?: number;
};

const sourceProjects: ImportedProject[] = [
  { slug: "cong-trinh-anh-chieu", title: "Công trình Anh Chiêu" },
  { slug: "cong-trinh-anh-phat", title: "Công trình Anh Phát" },
  { slug: "cong-trinh-chu-hieu", title: "Công trình Chú Hiếu" },
  { slug: "cong-trinh-chu-hoan", title: "Công trình Chú Hoan" },
  { slug: "cong-trinh-chu-ho", title: "Công trình Chú Hổ" },
  { slug: "cong-trinh-chi-hoa-k4", title: "Công trình Chị Hoa K4" },
  { slug: "cong-trinh-chi-lien", title: "Công trình Chị Liên" },
  { slug: "cong-trinh-giuc-tuong", title: "Công trình Giục Tượng", location: "Giục Tượng, Kiên Giang" },
  { slug: "cong-trinh-go-quao", title: "Công trình Gò Quao", location: "Gò Quao, Kiên Giang" },
  { slug: "cong-trinh-le-quy-don", title: "Công trình Lê Quý Đôn", location: "Rạch Giá, Kiên Giang" },
  { slug: "cong-trinh-lac-hong", title: "Công trình Lạc Hồng", location: "Rạch Giá, Kiên Giang" },
  { slug: "cong-trinh-minh-luong", title: "Công trình Minh Lương", location: "Minh Lương, Kiên Giang" },
  { slug: "thao-house", title: "Thảo House" },
  { slug: "cong-trinh-dien-bien-phu", title: "Công trình Điện Biên Phủ", location: "Rạch Giá, Kiên Giang" },
  { slug: "cua-hang-duc-anh", title: "Cửa hàng Đức Anh", category: "Thương mại" },
  { slug: "noi-that-phong-ngu", title: "Nội thất phòng ngủ", category: "Nội thất" },
  { slug: "van-phong-duc-anh", title: "Văn phòng Đức Anh", category: "Văn phòng" },
  { slug: "cong-trinh-vuon", title: "Công trình vườn", category: "Cảnh quan · 3D" },
  { slug: "cong-trinh-xeo-ro", title: "Công trình Xẻo Rô", status: "in_progress", location: "Xẻo Rô, Kiên Giang" },
  { slug: "trinh-house", title: "Trinh House", status: "planned" },
  { slug: "tt-villa", title: "TT Villa", category: "Biệt thự", status: "planned", year: "2027" },
  { slug: "nha-pho-2027", title: "Nhà phố 2027", category: "Nhà phố", status: "planned", year: "2027", photoCount: 2 },
];

const statusText: Record<ProjectStatus, string> = {
  completed: "Đã thi công",
  in_progress: "Đang thi công",
  planned: "Sắp thi công",
};

export const importedProjects: Project[] = sourceProjects.map((project, index) => {
  const status = project.status ?? "completed";
  const photoCount = project.photoCount ?? 3;
  const gallery = Array.from({ length: photoCount }, (_, photoIndex) => ({
    src: `/projects/${project.slug}/${photoIndex + 1}.jpg`,
    alt: `${project.title} — hình ${photoIndex + 1}`,
  }));

  return {
    slug: project.slug,
    title: project.title,
    category: project.category ?? "Nhà ở",
    location: project.location ?? "Kiên Giang",
    year: project.year ?? "2026",
    status,
    featuredForYou: index < 6,
    featuredMostViewed: index >= 6 && index < 12,
    image: gallery[0].src,
    summary: `${statusText[status]} · Hồ sơ hình ảnh thực tế và phương án thiết kế của ${project.title}.`,
    scope: status === "planned" ? "Tư vấn thiết kế · Chuẩn bị thi công" : "Thiết kế · Thi công · Hoàn thiện",
    challenge: "Thông tin chi tiết về yêu cầu, quy mô và hiện trạng công trình đang được cập nhật.",
    solution: "Đức Anh KG tổ chức phương án thiết kế và thi công phù hợp với nhu cầu sử dụng và điều kiện thực tế.",
    gallery,
    filters: {
      type: project.category === "Biệt thự" ? "villa" : project.category === "Thương mại" || project.category === "Văn phòng" ? "commercial" : "townhouse",
      province: "kien-giang",
      landAreaM2: 0,
      budgetBillion: 0,
      popularity: 100 - index,
    },
  };
});
