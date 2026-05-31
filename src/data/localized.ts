import type { Article, Hero, Project, Service } from "@/types/content";
import { site } from "@/data/site";

export type Locale = "vi" | "en";

type LocalizedContent = {
  nav: { label: string; href: string }[];
  common: {
    homeAria: string;
    mainNavigation: string;
    openMenu: string;
    closeMenu: string;
    consultationCta: string;
    pages: string;
    contact: string;
    footerDescription: string;
    call: string;
    zalo: string;
    readMore: string;
    scope: string;
    servicesHeading: string;
    workingMethod: string;
    strengthsHeading: string;
    strengthsDescription: string;
    projectApproach: string;
    location: string;
    similarProject: string;
  };
  form: {
    title: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sending: string;
    submit: string;
    sent: string;
    error: string;
  };
  pages: {
    homeProjectsEyebrow: string;
    homeProjectsTitle: string;
    homeNewsEyebrow: string;
    homeNewsTitle: string;
    whoWeAre: { eyebrow: string; title: string; body: string; cta: string; image: string };
    about: { eyebrow: string; title: string; description: string; profileEyebrow: string; profileTitle: string; profileBody: string };
    sectors: { eyebrow: string; title: string; description: string };
    projects: { eyebrow: string; title: string; description: string };
    news: { eyebrow: string; title: string; description: string };
    careers: { eyebrow: string; title: string; description: string; roles: string[]; formTitle: string };
    contact: { eyebrow: string; title: string; description: string; office: string };
    cooperation: { eyebrow: string; title: string; description: string; formTitle: string };
    consultation: { eyebrow: string; title: string; description: string };
    projectDetailBody: string;
    articleDetailBody: string;
  };
  hero: Hero;
  services: Service[];
  strengths: string[];
  projects: Project[];
  articles: Article[];
};

export const localizedContent: Record<Locale, LocalizedContent> = {
  vi: {
    nav: [
      { label: "Về chúng tôi", href: "/ve-chung-toi" },
      { label: "Lĩnh vực", href: "/linh-vuc" },
      { label: "Dự án", href: "/du-an" },
      { label: "Tuyển dụng", href: "/tuyen-dung" },
      { label: "Liên hệ", href: "/lien-he" }
    ],
    common: {
      homeAria: "trang chủ",
      mainNavigation: "Điều hướng chính",
      openMenu: "Mở menu",
      closeMenu: "Đóng menu",
      consultationCta: "Đăng ký tư vấn",
      pages: "Trang",
      contact: "Liên hệ",
      footerDescription: "Tư vấn, thiết kế và thi công trọn gói với tinh thần xây dựng tận tâm.",
      call: "Gọi",
      zalo: "Zalo",
      readMore: "Xem thêm",
      scope: "Lĩnh vực",
      servicesHeading: "Dịch vụ được tổ chức xoay quanh kiểm soát công trình",
      workingMethod: "Cách làm việc",
      strengthsHeading: "Quy trình rõ ràng trước khi hoàn thiện đẹp",
      strengthsDescription: "Công trình đẹp cần nền tảng từ hồ sơ, giám sát, vật tư và các mốc duyệt rõ ràng với chủ đầu tư.",
      projectApproach: "Cách triển khai",
      location: "Địa điểm",
      similarProject: "Tư vấn công trình tương tự"
    },
    form: {
      title: "Đăng ký tư vấn",
      name: "Họ và tên",
      namePlaceholder: "Tên của bạn",
      phone: "Số điện thoại",
      phonePlaceholder: "091...",
      emailPlaceholder: "email@example.com",
      message: "Nội dung cần tư vấn",
      messagePlaceholder: "Cho chúng tôi biết địa điểm, quy mô, thời gian hoặc dịch vụ bạn cần.",
      sending: "Đang gửi...",
      submit: "Gửi yêu cầu",
      sent: "Đã nhận thông tin. Chúng tôi sẽ liên hệ lại sớm.",
      error: "Chưa gửi được yêu cầu. Kiểm tra cấu hình Supabase."
    },
    pages: {
      homeProjectsEyebrow: "Dự án tiêu biểu",
      homeProjectsTitle: "Công trình được triển khai bằng chi tiết thực tế và tiến độ rõ ràng",
      homeNewsEyebrow: "Tin tức",
      homeNewsTitle: "Ghi chú xây dựng dành cho gia chủ và đội dự án",
      whoWeAre: {
        eyebrow: "Duc Anh KG chúng tôi là ai?",
        title: "Đội ngũ tư vấn, thiết kế và thi công trọn gói tại Kiên Giang",
        body: "Duc Anh KG đồng hành cùng khách hàng từ ý tưởng, thiết kế, dự toán đến tổ chức thi công và bàn giao. Chúng tôi tập trung vào giải pháp thực tế, quy trình minh bạch và chất lượng hoàn thiện phù hợp với từng công trình.",
        cta: "Tìm hiểu thêm",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
      },
      about: {
        eyebrow: "Về chúng tôi",
        title: "Đội ngũ xây dựng đặt trọng tâm vào sự rõ ràng, trách nhiệm và chất lượng hoàn thiện",
        description: "Trang này được tổ chức để sau này có thể quản lý lịch sử công ty, đội ngũ, chứng chỉ và tiêu chuẩn vận hành từ admin.",
        profileEyebrow: "Hồ sơ công ty",
        profileTitle: "Đồng hành để gia chủ nắm rõ từng bước thi công",
        profileBody: "Đức Anh KG tư vấn, thiết kế và thi công trọn gói với tinh thần xây dựng tận tâm. Nội dung chi tiết có thể tiếp tục cập nhật khi có hồ sơ thương hiệu đầy đủ."
      },
      sectors: {
        eyebrow: "Lĩnh vực",
        title: "Nhà ở, thương mại, cải tạo và hoàn thiện nội thất",
        description: "Mỗi lĩnh vực đang được lưu dạng dữ liệu có cấu trúc để sau này quản lý từ admin Supabase."
      },
      projects: {
        eyebrow: "Dự án",
        title: "Các công trình xây dựng và hoàn thiện tiêu biểu",
        description: "Danh sách dự án đã tách dữ liệu để sau này có thể tải từ Supabase, thêm bộ lọc, thư viện ảnh và chỉnh sửa từ admin."
      },
      news: {
        eyebrow: "Tin tức",
        title: "Cập nhật công ty và ghi chú lập kế hoạch xây dựng",
        description: "Cấu trúc tin tức hỗ trợ chuyên mục, tác giả, trạng thái xuất bản, SEO và ảnh đại diện trong admin sau này."
      },
      careers: {
        eyebrow: "Tuyển dụng",
        title: "Gia nhập đội ngũ coi trọng kỷ luật công trường",
        description: "Danh sách tuyển dụng sau này có thể lấy từ Supabase với vị trí, địa điểm và trạng thái ứng tuyển.",
        roles: ["Kỹ sư hiện trường", "Dự toán khối lượng", "Điều phối vật tư", "Giám sát công trình"],
        formTitle: "Gửi thông tin ứng tuyển"
      },
      contact: {
        eyebrow: "Liên hệ",
        title: "Chia sẻ công trình bạn đang dự định triển khai",
        description: "Thông tin liên hệ sẽ được gửi qua API route đã sẵn sàng kết nối Supabase.",
        office: "Văn phòng"
      },
      cooperation: {
        eyebrow: "Hợp tác",
        title: "Hợp tác nhà cung cấp, thầu phụ và đối tác",
        description: "Trang này sẵn sàng nhận thông tin hợp tác và sau này có thể mở rộng thêm các trường onboarding nhà cung cấp.",
        formTitle: "Gửi thông tin hợp tác"
      },
      consultation: {
        eyebrow: "Tư vấn",
        title: "Đăng ký tư vấn từ đội ngũ Đức Anh KG",
        description: "Trang này dùng làm luồng chuyển đổi chính cho quảng cáo, chiến dịch và lời kêu gọi hành động trên trang chủ."
      },
      projectDetailBody: "Nội dung chi tiết hiện là dữ liệu mẫu. Sau này admin có thể quản lý thông tin dự án, thư viện ảnh, phạm vi, tiến độ và ghi chú bàn giao.",
      articleDetailBody: "Nội dung bài viết hiện là dữ liệu mẫu. Admin sau này có thể lưu nội dung rich text, hình ảnh, SEO metadata và trạng thái xuất bản trong Supabase."
    },
    hero: {
      eyebrow: "Xây dựng tận tâm",
      title: "Đức Anh KG tư vấn, thiết kế và thi công trọn gói",
      description: "Đồng hành cùng gia chủ từ ý tưởng ban đầu đến bàn giao công trình, tập trung vào quy trình rõ ràng, chi phí minh bạch và chất lượng hoàn thiện bền vững.",
      image: site.banner,
      video: "/VIDEO-GIOI-THIEU-WEB.mp4",
      primaryAction: { label: "Đăng ký tư vấn", href: "/dang-ky-tu-van-ho-tro" },
      secondaryAction: { label: "Xem dự án", href: "/du-an" }
    },
    services: [
      { title: "Tư vấn thiết kế", description: "Chuyển nhu cầu của gia chủ thành phương án mặt bằng, hồ sơ kỹ thuật và phạm vi thi công rõ ràng trước khi khởi công." },
      { title: "Thi công nhà ở", description: "Thi công nhà phố, biệt thự và công trình dân dụng với giám sát hiện trường, kiểm soát vật tư và hoàn thiện." },
      { title: "Hoàn thiện thương mại", description: "Triển khai văn phòng, showroom và mặt bằng kinh doanh với tiến độ rõ ràng và tiêu chuẩn bàn giao cụ thể." },
      { title: "Cải tạo sửa chữa", description: "Khảo sát hiện trạng, chia giai đoạn thi công hợp lý và nâng cấp không gian với mức gián đoạn thấp." }
    ],
    strengths: [
      "Theo dõi chi phí và phạm vi minh bạch",
      "Điều phối công trường theo ngày",
      "Duyệt vật tư và hoàn thiện bằng hồ sơ rõ ràng",
      "Bàn giao và bảo hành có quy trình"
    ],
    projects: [
      {
        slug: "urban-family-villa",
        title: "Biệt thự gia đình",
        category: "Nhà ở",
        location: "Rạch Giá, Kiên Giang",
        year: "2026",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
        summary: "Không gian sống hiện đại tập trung vào ánh sáng tự nhiên, vật liệu bền và tỷ lệ nội thất hài hòa."
      },
      {
        slug: "mixed-use-townhouse",
        title: "Nhà phố kết hợp kinh doanh",
        category: "Nhà ở và thương mại",
        location: "Kiên Giang",
        year: "2025",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
        summary: "Nhà mặt tiền với tầng trệt linh hoạt cho kinh doanh và các tầng trên dành cho sinh hoạt riêng tư."
      },
      {
        slug: "compact-office-fitout",
        title: "Văn phòng làm việc",
        category: "Thương mại",
        location: "Cần Thơ",
        year: "2025",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
        summary: "Cải tạo văn phòng với phòng họp cách âm, hệ chiếu sáng hiệu quả và khu làm việc linh hoạt."
      }
    ],
    articles: [
      {
        slug: "planning-a-townhouse-build",
        title: "Chuẩn bị gì trước khi xây nhà phố",
        category: "Hướng dẫn",
        date: "2026-04-12",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
        excerpt: "Những điểm gia chủ nên làm rõ sớm: phạm vi, dự phòng ngân sách, giấy phép, vật tư ưu tiên và điều kiện thi công."
      },
      {
        slug: "handover-quality-checklist",
        title: "Checklist bàn giao công trình nhà ở",
        category: "Chất lượng",
        date: "2026-03-18",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
        excerpt: "Bàn giao có danh mục rõ ràng giúp giảm tranh chấp và quản lý trách nhiệm bảo hành dễ hơn sau khi vào ở."
      },
      {
        slug: "choosing-finish-materials",
        title: "Chọn vật liệu hoàn thiện nhưng vẫn kiểm soát ngân sách",
        category: "Vật liệu",
        date: "2026-02-21",
        image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
        excerpt: "Dùng mẫu duyệt, phương án thay thế và mốc đặt hàng để giữ hình ảnh hoàn thiện đúng với ngân sách đã thống nhất."
      }
    ]
  },
  en: {
    nav: [
      { label: "About", href: "/ve-chung-toi" },
      { label: "Sectors", href: "/linh-vuc" },
      { label: "Projects", href: "/du-an" },
      { label: "Careers", href: "/tuyen-dung" },
      { label: "Contact", href: "/lien-he" }
    ],
    common: {
      homeAria: "home",
      mainNavigation: "Main navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      consultationCta: "Request consultation",
      pages: "Pages",
      contact: "Contact",
      footerDescription: "Design consultation and turnkey construction delivered with care and accountability.",
      call: "Call",
      zalo: "Zalo",
      readMore: "Read more",
      scope: "Scope",
      servicesHeading: "Services organized around project control",
      workingMethod: "Working method",
      strengthsHeading: "Clear process before beautiful finishing",
      strengthsDescription: "A well-finished building starts with documentation, supervision, material control, and clear owner approval points.",
      projectApproach: "Project approach",
      location: "Location",
      similarProject: "Discuss a similar project"
    },
    form: {
      title: "Request a consultation",
      name: "Full name",
      namePlaceholder: "Your name",
      phone: "Phone",
      phonePlaceholder: "091...",
      emailPlaceholder: "email@example.com",
      message: "Project notes",
      messagePlaceholder: "Tell us about the location, size, timeline, or service you need.",
      sending: "Sending...",
      submit: "Send request",
      sent: "Request received. We will contact you shortly.",
      error: "The request could not be sent. Check Supabase configuration."
    },
    pages: {
      homeProjectsEyebrow: "Selected work",
      homeProjectsTitle: "Projects delivered with practical detail and clear progress",
      homeNewsEyebrow: "News",
      homeNewsTitle: "Construction notes for owners and project teams",
      whoWeAre: {
        eyebrow: "Who is Duc Anh KG?",
        title: "A turnkey design and construction team based in Kien Giang",
        body: "Duc Anh KG supports clients from concept, design, and budgeting through site execution and handover. We focus on practical solutions, transparent process, and finish quality tailored to each project.",
        cta: "Learn more",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
      },
      about: {
        eyebrow: "About",
        title: "A construction team focused on clarity, accountability, and finish quality",
        description: "This page is structured so company history, team profiles, certifications, and operating standards can later be managed from admin.",
        profileEyebrow: "Company profile",
        profileTitle: "Keeping owners informed at every construction step",
        profileBody: "Đức Anh KG provides design consultation and turnkey construction with a careful, owner-focused working style. Detailed content can be expanded when the full brand profile is ready."
      },
      sectors: {
        eyebrow: "Sectors",
        title: "Residential, commercial, renovation, and interior finishing",
        description: "Each sector is stored as structured data so it can later be managed from a Supabase admin interface."
      },
      projects: {
        eyebrow: "Projects",
        title: "Selected construction and finishing projects",
        description: "Project data is already separated so it can later load from Supabase with filters, galleries, and admin editing."
      },
      news: {
        eyebrow: "News",
        title: "Company updates and construction planning notes",
        description: "The news structure supports categories, authors, publishing status, SEO, and featured images in the future admin."
      },
      careers: {
        eyebrow: "Careers",
        title: "Join a team that values discipline on site",
        description: "Recruitment listings can later come from Supabase with roles, locations, and application status.",
        roles: ["Site engineer", "Quantity surveyor", "Procurement coordinator", "Project supervisor"],
        formTitle: "Send your application"
      },
      contact: {
        eyebrow: "Contact",
        title: "Tell us what you are planning",
        description: "Lead submissions are sent through the Supabase-ready API route.",
        office: "Office"
      },
      cooperation: {
        eyebrow: "Partnership",
        title: "Supplier, subcontractor, and partner cooperation",
        description: "This route is ready for partnership enquiries and can later include supplier onboarding fields.",
        formTitle: "Send cooperation request"
      },
      consultation: {
        eyebrow: "Consultation",
        title: "Request advice from the Đức Anh KG team",
        description: "Use this page as the main conversion route for ads, campaign links, and homepage calls to action."
      },
      projectDetailBody: "Detail content is placeholder data. Later, the admin panel can manage project facts, galleries, scope, timeline, and handover notes.",
      articleDetailBody: "This article body is placeholder data. The future admin can store rich text, images, SEO metadata, and publishing status in Supabase."
    },
    hero: {
      eyebrow: "Built with care",
      title: "Đức Anh KG design consultation and turnkey construction",
      description: "We support owners from first idea to handover, with clear process, transparent cost control, and durable finish quality.",
      image: site.banner,
      video: "/VIDEO-GIOI-THIEU-WEB.mp4",
      primaryAction: { label: "Request consultation", href: "/dang-ky-tu-van-ho-tro" },
      secondaryAction: { label: "View projects", href: "/du-an" }
    },
    services: [
      { title: "Design consultation", description: "Translate owner needs into layouts, technical documents, and a clear construction scope before work starts." },
      { title: "Residential construction", description: "Build townhouses, villas, and residential projects with site supervision, material control, and finish management." },
      { title: "Commercial finishing", description: "Deliver offices, showrooms, and business spaces with clear schedules and defined handover standards." },
      { title: "Renovation and repair", description: "Survey existing conditions, phase the work carefully, and upgrade spaces with minimal disruption." }
    ],
    strengths: [
      "Transparent cost and scope tracking",
      "Daily site coordination routines",
      "Documented material and finish approvals",
      "Structured handover and warranty process"
    ],
    projects: [
      {
        slug: "urban-family-villa",
        title: "Family Villa",
        category: "Residential",
        location: "Rach Gia, Kien Giang",
        year: "2026",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
        summary: "A modern living space focused on natural light, durable materials, and balanced interior proportions."
      },
      {
        slug: "mixed-use-townhouse",
        title: "Mixed-use Townhouse",
        category: "Residential and commercial",
        location: "Kien Giang",
        year: "2025",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
        summary: "A street-facing house with a flexible business ground floor and private living areas above."
      },
      {
        slug: "compact-office-fitout",
        title: "Office Fit-out",
        category: "Commercial",
        location: "Can Tho",
        year: "2025",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
        summary: "An office upgrade with acoustic meeting rooms, efficient lighting, and flexible work zones."
      }
    ],
    articles: [
      {
        slug: "planning-a-townhouse-build",
        title: "What to prepare before building a townhouse",
        category: "Guide",
        date: "2026-04-12",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
        excerpt: "Key points owners should clarify early: scope, budget reserve, permits, material priorities, and site conditions."
      },
      {
        slug: "handover-quality-checklist",
        title: "A handover checklist for residential projects",
        category: "Quality",
        date: "2026-03-18",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80",
        excerpt: "A clear handover checklist helps reduce disputes and makes warranty responsibility easier to manage after move-in."
      },
      {
        slug: "choosing-finish-materials",
        title: "Choosing finish materials while controlling budget",
        category: "Materials",
        date: "2026-02-21",
        image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80",
        excerpt: "Use approval samples, alternates, and purchasing deadlines to keep the finished look aligned with the agreed budget."
      }
    ]
  }
};
