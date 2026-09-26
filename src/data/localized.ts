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
    homeMostViewedEyebrow: string;
    homeMostViewedTitle: string;
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
      { label: "Thư viện", href: "/thu-vien" },
      { label: "Cẩm nang", href: "/cam-nang" },
      { label: "Dự toán", href: "/cong-cu/du-toan" },
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
      homeProjectsEyebrow: "Ý tưởng dành riêng cho bạn",
      homeProjectsTitle: "Tham khảo công trình theo diện tích, ngân sách và nhu cầu sử dụng",
      homeMostViewedEyebrow: "Ý tưởng được xem nhiều nhất",
      homeMostViewedTitle: "Những công trình nổi bật để bạn khám phá thêm",
      homeNewsEyebrow: "Bài viết mới",
      homeNewsTitle: "Kinh nghiệm thực tế để chuẩn bị cho một công trình rõ ràng hơn",
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
        description: "Tìm hiểu cách Đức Anh KG tổ chức đội ngũ, kiểm soát công trình và đồng hành cùng chủ đầu tư trong suốt quá trình triển khai.",
        profileEyebrow: "Hồ sơ công ty",
        profileTitle: "Đồng hành để gia chủ nắm rõ từng bước thi công",
        profileBody: "Đức Anh KG tư vấn, thiết kế và thi công trọn gói với tinh thần xây dựng tận tâm. Nội dung chi tiết có thể tiếp tục cập nhật khi có hồ sơ thương hiệu đầy đủ."
      },
      sectors: {
        eyebrow: "Lĩnh vực",
        title: "Nhà ở, thương mại, cải tạo và hoàn thiện nội thất",
        description: "Mỗi lĩnh vực được trình bày theo nhu cầu thực tế, phạm vi công việc và cách đội ngũ kiểm soát chất lượng."
      },
      projects: {
        eyebrow: "Dự án",
        title: "Các công trình xây dựng và hoàn thiện tiêu biểu",
        description: "Khám phá các công trình tiêu biểu qua thông tin phạm vi, bài toán thiết kế và thư viện hình ảnh."
      },
      news: {
        eyebrow: "Tin tức",
        title: "Cập nhật công ty và ghi chú lập kế hoạch xây dựng",
        description: "Kinh nghiệm thực tế về chuẩn bị xây nhà, kiểm soát chất lượng, vật liệu và bàn giao công trình."
      },
      careers: {
        eyebrow: "Tuyển dụng",
        title: "Gia nhập đội ngũ coi trọng kỷ luật công trường",
        description: "Các vị trí đang tìm kiếm cho đội ngũ thiết kế, dự toán, điều phối và thi công tại công trường.",
        roles: ["Kỹ sư hiện trường", "Dự toán khối lượng", "Điều phối vật tư", "Giám sát công trình"],
        formTitle: "Gửi thông tin ứng tuyển"
      },
      contact: {
        eyebrow: "Liên hệ",
        title: "Chia sẻ công trình bạn đang dự định triển khai",
        description: "Chia sẻ nhu cầu, địa điểm và thời gian dự kiến để đội ngũ chuẩn bị nội dung trao đổi phù hợp.",
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
      projectDetailBody: "Thông tin công trình được tổng hợp từ phạm vi triển khai, giải pháp kỹ thuật và các mốc kiểm soát chất lượng.",
      articleDetailBody: "Mỗi công trình có điều kiện riêng; hãy dùng nội dung này như một khung tham khảo và trao đổi trực tiếp với đội ngũ trước khi quyết định."
    },
    hero: {
      eyebrow: "Xây dựng tận tâm",
      title: "Đức Anh KG tư vấn, thiết kế và thi công trọn gói",
      description: "Đồng hành cùng gia chủ từ ý tưởng ban đầu đến bàn giao công trình, tập trung vào quy trình rõ ràng, chi phí minh bạch và chất lượng hoàn thiện bền vững.",
      image: site.banner,
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
        summary: "Không gian sống hiện đại tập trung vào ánh sáng tự nhiên, vật liệu bền và tỷ lệ nội thất hài hòa.",
        landArea: "Đang cập nhật",
        scale: "Biệt thự gia đình",
        scope: "Tư vấn thiết kế · Thi công trọn gói",
        challenge: "Tổ chức một không gian sống riêng tư nhưng vẫn mở, thoáng và kết nối tốt với ánh sáng tự nhiên.",
        solution: "Mặt bằng được phân lớp theo mức độ riêng tư, kết hợp các khoảng mở và vật liệu có độ bền phù hợp với khí hậu địa phương.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85", alt: "Không gian biệt thự gia đình" },
          { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85", alt: "Không gian nội thất hiện đại" },
          { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85", alt: "Phòng khách sử dụng ánh sáng tự nhiên" }
        ],
        filters: { type: "villa", province: "kien-giang", landAreaM2: 240, budgetBillion: 4.5, popularity: 98 }
      },
      {
        slug: "mixed-use-townhouse",
        title: "Nhà phố kết hợp kinh doanh",
        category: "Nhà ở và thương mại",
        location: "Kiên Giang",
        year: "2025",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
        summary: "Nhà mặt tiền với tầng trệt linh hoạt cho kinh doanh và các tầng trên dành cho sinh hoạt riêng tư.",
        landArea: "Đang cập nhật",
        scale: "Nhà phố kết hợp kinh doanh",
        scope: "Thiết kế kiến trúc · Hoàn thiện",
        challenge: "Cân bằng luồng khách hàng tại tầng trệt với nhu cầu sinh hoạt riêng tư của gia đình ở các tầng trên.",
        solution: "Giao thông được tách rõ từ lối vào, đồng thời lõi thang và khoảng thông tầng hỗ trợ chiếu sáng, thông gió cho phần ở.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85", alt: "Mặt tiền nhà phố kết hợp kinh doanh" },
          { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85", alt: "Không gian sinh hoạt nhà phố" },
          { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85", alt: "Khu vực nội thất nhà phố" }
        ],
        filters: { type: "townhouse", province: "kien-giang", landAreaM2: 120, budgetBillion: 2.8, popularity: 88 }
      },
      {
        slug: "compact-office-fitout",
        title: "Văn phòng làm việc",
        category: "Thương mại",
        location: "Cần Thơ",
        year: "2025",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
        summary: "Cải tạo văn phòng với phòng họp cách âm, hệ chiếu sáng hiệu quả và khu làm việc linh hoạt.",
        landArea: "Đang cập nhật",
        scale: "Văn phòng quy mô nhỏ",
        scope: "Thiết kế nội thất · Thi công hoàn thiện",
        challenge: "Tăng số vị trí làm việc mà vẫn giữ lối đi thoáng, khả năng tập trung và sự riêng tư cho các cuộc họp.",
        solution: "Không gian được chia bằng vách kính, hệ tủ tích hợp và các cụm ánh sáng riêng cho làm việc, họp và trao đổi nhanh.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85", alt: "Không gian văn phòng linh hoạt" },
          { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85", alt: "Khu vực làm việc chung" },
          { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85", alt: "Phòng họp văn phòng" }
        ],
        filters: { type: "commercial", province: "can-tho", landAreaM2: 180, budgetBillion: 3.2, popularity: 72 }
      },
      {
        slug: "three-storey-townhouse-rach-gia",
        title: "Nhà phố 3 tầng tại Rạch Giá",
        category: "Nhà phố",
        location: "Rạch Giá, Kiên Giang",
        year: "2026",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
        summary: "Nhà phố 3 tầng trên khu đất 96 m², ưu tiên thông gió, ánh sáng tự nhiên và không gian sinh hoạt linh hoạt cho gia đình trẻ.",
        landArea: "96 m²",
        buildingArea: "78 m²",
        totalFloorArea: "234 m²",
        scale: "3 tầng · 3 phòng ngủ",
        budget: "Khoảng 2,6 tỷ",
        scope: "Thiết kế kiến trúc · Thi công trọn gói",
        challenge: "Khu đất có mặt tiền hẹp nhưng gia đình cần ba phòng ngủ, chỗ để xe và các không gian chung luôn thông thoáng.",
        solution: "Cầu thang và khoảng thông tầng được tổ chức ở lõi nhà, giúp đưa ánh sáng xuống giữa công trình và tách rõ khu sinh hoạt chung với khu nghỉ ngơi.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85", alt: "Không gian nhà phố 3 tầng" },
          { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85", alt: "Mặt tiền nhà phố hiện đại" },
          { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85", alt: "Phòng khách nhà phố nhiều ánh sáng" }
        ],
        filters: { type: "townhouse", province: "kien-giang", landAreaM2: 96, budgetBillion: 2.6, popularity: 94 }
      },
      {
        slug: "garden-villa-phu-quoc",
        title: "Biệt thự sân vườn Phú Quốc",
        category: "Biệt thự",
        location: "Phú Quốc",
        year: "2026",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
        summary: "Biệt thự sân vườn một tầng với hiên rộng, không gian mở và các phòng sinh hoạt hướng ra mảng xanh trung tâm.",
        landArea: "420 m²",
        buildingArea: "185 m²",
        totalFloorArea: "185 m²",
        scale: "1 tầng · 4 phòng ngủ",
        budget: "Khoảng 5,8 tỷ",
        scope: "Tư vấn thiết kế · Thi công hoàn thiện",
        challenge: "Tạo cảm giác nghỉ dưỡng nhưng vẫn bảo đảm riêng tư, chống nắng mưa và dễ bảo trì trong điều kiện khí hậu biển.",
        solution: "Mái đua sâu, hiên liên tục và sân trong tạo lớp đệm khí hậu; vật liệu ngoài trời được chọn theo tiêu chí bền ẩm và dễ thay thế.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85", alt: "Biệt thự sân vườn nhìn từ hồ bơi" },
          { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85", alt: "Không gian sinh hoạt mở của biệt thự" },
          { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85", alt: "Nội thất biệt thự sân vườn" }
        ],
        filters: { type: "villa", province: "other", landAreaM2: 420, budgetBillion: 5.8, popularity: 91 }
      },
      {
        slug: "japanese-roof-level4-home",
        title: "Nhà cấp 4 mái Nhật",
        category: "Nhà cấp 4",
        location: "Hà Tiên",
        year: "2025",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
        summary: "Nhà cấp 4 mái Nhật bố trí ba phòng ngủ, bếp liên thông phòng khách và hiên trước phù hợp nhịp sống gia đình nhiều thế hệ.",
        landArea: "165 m²",
        buildingArea: "128 m²",
        totalFloorArea: "128 m²",
        scale: "1 tầng · 3 phòng ngủ",
        budget: "Khoảng 1,9 tỷ",
        scope: "Thiết kế · Hồ sơ kỹ thuật · Thi công",
        challenge: "Bố trí đủ không gian cho gia đình nhiều thế hệ trên một tầng mà vẫn giữ lối đi ngắn, riêng tư và thông thoáng.",
        solution: "Khối sinh hoạt chung đặt ở trung tâm, các phòng ngủ phân về hai phía và cùng tiếp cận khoảng sân thoáng qua hệ cửa rộng có mái che.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=85", alt: "Nhà cấp 4 mái Nhật nhìn từ sân trước" },
          { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85", alt: "Không gian bếp và phòng khách liên thông" },
          { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85", alt: "Nội thất nhà cấp 4" }
        ],
        filters: { type: "level4", province: "kien-giang", landAreaM2: 165, budgetBillion: 1.9, popularity: 86 }
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
      { label: "Library", href: "/thu-vien" },
      { label: "Guides", href: "/cam-nang" },
      { label: "Estimator", href: "/cong-cu/du-toan" },
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
      homeProjectsEyebrow: "Ideas for you",
      homeProjectsTitle: "Explore projects by area, budget, and the way you plan to use them",
      homeMostViewedEyebrow: "Most viewed ideas",
      homeMostViewedTitle: "Popular projects worth exploring",
      homeNewsEyebrow: "Latest guides",
      homeNewsTitle: "Practical experience for planning a clearer construction journey",
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
        description: "Learn how Duc Anh KG organizes its team, controls project delivery, and supports owners throughout the build.",
        profileEyebrow: "Company profile",
        profileTitle: "Keeping owners informed at every construction step",
        profileBody: "Đức Anh KG provides design consultation and turnkey construction with a careful, owner-focused working style. Detailed content can be expanded when the full brand profile is ready."
      },
      sectors: {
        eyebrow: "Sectors",
        title: "Residential, commercial, renovation, and interior finishing",
        description: "Each sector is presented through real client needs, project scope, and the team's approach to quality control."
      },
      projects: {
        eyebrow: "Projects",
        title: "Selected construction and finishing projects",
        description: "Explore selected work through project scope, design challenges, practical responses, and image galleries."
      },
      news: {
        eyebrow: "News",
        title: "Company updates and construction planning notes",
        description: "Practical guidance on planning a build, quality control, materials, and project handover."
      },
      careers: {
        eyebrow: "Careers",
        title: "Join a team that values discipline on site",
        description: "Current opportunities across design, estimating, coordination, and site delivery.",
        roles: ["Site engineer", "Quantity surveyor", "Procurement coordinator", "Project supervisor"],
        formTitle: "Send your application"
      },
      contact: {
        eyebrow: "Contact",
        title: "Tell us what you are planning",
        description: "Share your needs, location, and expected timeline so the team can prepare a relevant discussion.",
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
      projectDetailBody: "Project information is organized around delivery scope, technical responses, and quality-control milestones.",
      articleDetailBody: "Every project has different conditions; use this as a planning framework and speak with the team before making final decisions."
    },
    hero: {
      eyebrow: "Built with care",
      title: "Đức Anh KG design consultation and turnkey construction",
      description: "We support owners from first idea to handover, with clear process, transparent cost control, and durable finish quality.",
      image: site.banner,
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
        summary: "A modern living space focused on natural light, durable materials, and balanced interior proportions.",
        landArea: "To be updated",
        scale: "Family villa",
        scope: "Design consultation · Turnkey construction",
        challenge: "Create a private family home that still feels open, bright, and closely connected to natural light.",
        solution: "The plan layers spaces by privacy, combining open voids with durable materials suited to the local climate.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85", alt: "Family villa living space" },
          { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85", alt: "Modern villa interior" },
          { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85", alt: "Naturally lit living room" }
        ],
        filters: { type: "villa", province: "kien-giang", landAreaM2: 240, budgetBillion: 4.5, popularity: 98 }
      },
      {
        slug: "mixed-use-townhouse",
        title: "Mixed-use Townhouse",
        category: "Residential and commercial",
        location: "Kien Giang",
        year: "2025",
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
        summary: "A street-facing house with a flexible business ground floor and private living areas above.",
        landArea: "To be updated",
        scale: "Mixed-use townhouse",
        scope: "Architectural design · Finishing",
        challenge: "Balance customer circulation at ground level with the family's need for privacy on the floors above.",
        solution: "Access routes are separated from the entrance, while a stair core and void bring light and ventilation into the home.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85", alt: "Mixed-use townhouse facade" },
          { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85", alt: "Townhouse living space" },
          { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85", alt: "Townhouse interior" }
        ],
        filters: { type: "townhouse", province: "kien-giang", landAreaM2: 120, budgetBillion: 2.8, popularity: 88 }
      },
      {
        slug: "compact-office-fitout",
        title: "Office Fit-out",
        category: "Commercial",
        location: "Can Tho",
        year: "2025",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
        summary: "An office upgrade with acoustic meeting rooms, efficient lighting, and flexible work zones.",
        landArea: "To be updated",
        scale: "Compact office",
        scope: "Interior design · Fit-out",
        challenge: "Increase workstation capacity while retaining clear circulation, focus, and privacy for meetings.",
        solution: "Glass partitions, integrated storage, and dedicated lighting zones organize focused work, meetings, and quick collaboration.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85", alt: "Flexible office workspace" },
          { src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85", alt: "Shared office work area" },
          { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85", alt: "Office meeting room" }
        ],
        filters: { type: "commercial", province: "can-tho", landAreaM2: 180, budgetBillion: 3.2, popularity: 72 }
      },
      {
        slug: "three-storey-townhouse-rach-gia",
        title: "Three-storey Townhouse in Rach Gia",
        category: "Townhouse",
        location: "Rach Gia, Kien Giang",
        year: "2026",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
        summary: "A three-storey townhouse on a 96 m² plot, designed for natural ventilation, daylight, and flexible family living.",
        landArea: "96 m²",
        buildingArea: "78 m²",
        totalFloorArea: "234 m²",
        scale: "3 floors · 3 bedrooms",
        budget: "Approx. 2.6B VND",
        scope: "Architectural design · Turnkey construction",
        challenge: "A narrow frontage must accommodate three bedrooms, vehicle parking, and bright shared spaces for a young family.",
        solution: "The stair and central void bring daylight into the middle of the plan while separating shared living areas from private rooms.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85", alt: "Three-storey townhouse interior" },
          { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85", alt: "Modern townhouse facade" },
          { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85", alt: "Daylit townhouse living room" }
        ],
        filters: { type: "townhouse", province: "kien-giang", landAreaM2: 96, budgetBillion: 2.6, popularity: 94 }
      },
      {
        slug: "garden-villa-phu-quoc",
        title: "Garden Villa in Phu Quoc",
        category: "Villa",
        location: "Phu Quoc",
        year: "2026",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
        summary: "A single-storey garden villa with deep verandas, open living spaces, and rooms facing a central green courtyard.",
        landArea: "420 m²",
        buildingArea: "185 m²",
        totalFloorArea: "185 m²",
        scale: "1 floor · 4 bedrooms",
        budget: "Approx. 5.8B VND",
        scope: "Design consultation · Finishing construction",
        challenge: "Create a resort atmosphere while maintaining privacy, weather protection, and easy upkeep in a coastal climate.",
        solution: "Deep roof overhangs, continuous verandas, and a courtyard form a climate buffer, with exterior materials selected for humidity resistance and simple replacement.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85", alt: "Garden villa viewed from the pool" },
          { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85", alt: "Open villa living space" },
          { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85", alt: "Garden villa interior" }
        ],
        filters: { type: "villa", province: "other", landAreaM2: 420, budgetBillion: 5.8, popularity: 91 }
      },
      {
        slug: "japanese-roof-level4-home",
        title: "Japanese-roof Single-storey Home",
        category: "Single-storey home",
        location: "Ha Tien",
        year: "2025",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
        summary: "A Japanese-roof single-storey home with three bedrooms, an open kitchen and living area, and a generous front veranda.",
        landArea: "165 m²",
        buildingArea: "128 m²",
        totalFloorArea: "128 m²",
        scale: "1 floor · 3 bedrooms",
        budget: "Approx. 1.9B VND",
        scope: "Design · Technical documentation · Construction",
        challenge: "Fit a multi-generational family on one floor while keeping circulation short, private, and well ventilated.",
        solution: "Shared living spaces sit at the center, bedrooms are arranged on either side, and wide sheltered openings connect the home to the garden.",
        gallery: [
          { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=85", alt: "Japanese-roof home from the front garden" },
          { src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85", alt: "Open kitchen and living area" },
          { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85", alt: "Single-storey home interior" }
        ],
        filters: { type: "level4", province: "kien-giang", landAreaM2: 165, budgetBillion: 1.9, popularity: 86 }
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
