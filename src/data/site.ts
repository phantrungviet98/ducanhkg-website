import type { Article, Hero, Project, Service } from "@/types/content";

export const site = {
  name: "Đức Anh KG",
  tagline: "Tư vấn - Thiết kế - Thi công trọn gói",
  logo: "/brand/logo.png",
  banner: "/brand/banner.png",
  phone: "0918876718",
  email: "hello@ducanhkg.vn",
  address: "1055 Lâm Quang Ky, P. An Hòa, TP. Rạch Giá, T. Kiên Giang",
  zalo: "#",
  facebook: "#"
};

export const navItems = [
  { label: "Về chúng tôi", href: "/ve-chung-toi" },
  { label: "Lĩnh vực", href: "/linh-vuc" },
  { label: "Dự án", href: "/du-an" },
  { label: "Tin tức", href: "/danh-muc-bai-viet/tin-tuc" },
  { label: "Tuyển dụng", href: "/tuyen-dung" },
  { label: "Liên hệ", href: "/lien-he" }
];

export const homeHero: Hero = {
  eyebrow: "Xây dựng tận tâm",
  title: "Đức Anh KG tư vấn, thiết kế và thi công trọn gói",
  description:
    "Đồng hành cùng gia chủ từ ý tưởng ban đầu đến bàn giao công trình, tập trung vào quy trình rõ ràng, chi phí minh bạch và chất lượng hoàn thiện bền vững.",
  image: site.banner,
  primaryAction: { label: "Đăng ký tư vấn", href: "/dang-ky-tu-van-ho-tro" },
  secondaryAction: { label: "Xem dự án", href: "/du-an" }
};

export const services: Service[] = [
  {
    title: "Tư vấn thiết kế",
    description:
      "Chuyển nhu cầu của gia chủ thành phương án mặt bằng, hồ sơ kỹ thuật và phạm vi thi công rõ ràng trước khi khởi công."
  },
  {
    title: "Thi công nhà ở",
    description:
      "Thi công nhà phố, biệt thự và công trình dân dụng với giám sát hiện trường, kiểm soát vật tư và hoàn thiện."
  },
  {
    title: "Hoàn thiện thương mại",
    description:
      "Triển khai văn phòng, showroom và mặt bằng kinh doanh với tiến độ rõ ràng và tiêu chuẩn bàn giao cụ thể."
  },
  {
    title: "Cải tạo sửa chữa",
    description:
      "Khảo sát hiện trạng, chia giai đoạn thi công hợp lý và nâng cấp không gian với mức gián đoạn thấp."
  }
];

export const strengths = [
  "Theo dõi chi phí và phạm vi minh bạch",
  "Điều phối công trường theo ngày",
  "Duyệt vật tư và hoàn thiện bằng hồ sơ rõ ràng",
  "Bàn giao và bảo hành có quy trình"
];

export const projects: Project[] = [
  {
    slug: "urban-family-villa",
    title: "Biệt thự gia đình",
    category: "Nhà ở",
    location: "Rạch Giá, Kiên Giang",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Không gian sống hiện đại tập trung vào ánh sáng tự nhiên, vật liệu bền và tỷ lệ nội thất hài hòa."
  },
  {
    slug: "mixed-use-townhouse",
    title: "Nhà phố kết hợp kinh doanh",
    category: "Nhà ở và thương mại",
    location: "Kiên Giang",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Nhà mặt tiền với tầng trệt linh hoạt cho kinh doanh và các tầng trên dành cho sinh hoạt riêng tư."
  },
  {
    slug: "compact-office-fitout",
    title: "Văn phòng làm việc",
    category: "Thương mại",
    location: "Cần Thơ",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    summary:
      "Cải tạo văn phòng với phòng họp cách âm, hệ chiếu sáng hiệu quả và khu làm việc linh hoạt."
  }
];

export const articles: Article[] = [
  {
    slug: "planning-a-townhouse-build",
    title: "Chuẩn bị gì trước khi xây nhà phố",
    category: "Hướng dẫn",
    date: "2026-04-12",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "Những điểm gia chủ nên làm rõ sớm: phạm vi, dự phòng ngân sách, giấy phép, vật tư ưu tiên và điều kiện thi công."
  },
  {
    slug: "handover-quality-checklist",
    title: "Checklist bàn giao công trình nhà ở",
    category: "Chất lượng",
    date: "2026-03-18",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "Bàn giao có danh mục rõ ràng giúp giảm tranh chấp và quản lý trách nhiệm bảo hành dễ hơn sau khi vào ở."
  },
  {
    slug: "choosing-finish-materials",
    title: "Chọn vật liệu hoàn thiện nhưng vẫn kiểm soát ngân sách",
    category: "Vật liệu",
    date: "2026-02-21",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
    excerpt:
      "Dùng mẫu duyệt, phương án thay thế và mốc đặt hàng để giữ hình ảnh hoàn thiện đúng với ngân sách đã thống nhất."
  }
];
