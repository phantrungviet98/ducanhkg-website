# Kế hoạch refactor website Đức Anh KG

## 1. Mục tiêu

Refactor website Đức Anh KG dựa trên cách tổ chức nội dung và các luồng chức năng của [MM2](https://mm2.vn/vn/), đồng thời giữ nguyên nhận diện thương hiệu Đức Anh KG.

Mục tiêu chính:

- Biến website từ trang giới thiệu doanh nghiệp thành nền tảng nội dung kiến trúc và tạo khách hàng tiềm năng.
- Giúp khách hàng dễ tìm dự án phù hợp theo loại công trình, diện tích, ngân sách và địa điểm.
- Cung cấp công cụ dự toán chi phí xây dựng có dữ liệu riêng của Đức Anh KG.
- Cho phép đội ngũ công ty tự cập nhật dự án, bài viết, hình ảnh và đơn giá.
- Cải thiện SEO, tốc độ tải trang, khả năng sử dụng trên mobile và khả năng đo lường chuyển đổi.

Không sao chép mã nguồn, nội dung, hình ảnh hoặc nhận diện của MM2. Trang tham chiếu chỉ được dùng làm benchmark về kiến trúc thông tin và luồng sử dụng.

## 2. Đánh giá hiện trạng

### Điểm có thể tái sử dụng

- Next.js 16 và React 19.
- Hệ thống route cho dự án, bài viết, giới thiệu, liên hệ và tuyển dụng.
- Giao diện hiện tại có phong cách hiện đại, phù hợp phân khúc thiết kế và thi công cao cấp.
- Cơ chế song ngữ Việt/Anh.
- API lưu lead vào Supabase.
- Các thành phần dùng chung như header, footer, form liên hệ và sticky actions.

### Vấn đề cần xử lý

- Nội dung dự án và bài viết đang được khai báo tĩnh trong `src/data`.
- `src/app/globals.css` dài hơn 3.400 dòng và có nhiều nhóm CSS, token và media query trùng lặp.
- `src/components/Sections.tsx` chứa quá nhiều section trong một file.
- Nhiều trang được đánh dấu `use client`, làm giảm lợi ích của Server Components và SEO.
- Chuyển ngôn ngữ bằng `localStorage`, chưa tạo URL riêng cho từng ngôn ngữ.
- Dữ liệu dự án chưa có gallery, diện tích, ngân sách, quy mô và các thuộc tính để lọc.
- Chưa có tìm kiếm toàn site, bộ lọc dự án, thư viện ảnh/video và công cụ dự toán.
- Metadata mới chỉ có cấu hình chung, chưa có metadata riêng cho dự án và bài viết.
- Form lead chưa có schema validation, rate limit và chống spam.
- ESLint đang quét cả thư mục `dist`, tạo hàng nghìn cảnh báo không liên quan.
- `BrickModel` đang có lỗi lint liên quan đến ref và custom element.

## 3. Phạm vi sản phẩm

### 3.1. Cấu trúc điều hướng

- Trang chủ
- Giới thiệu
- Lĩnh vực hoạt động
- Dự án
  - Tất cả dự án
  - Nhà phố
  - Biệt thự
  - Nhà cấp 4
  - Công trình thương mại
  - Công trình thực tế
- Thư viện
  - Hình ảnh
  - Video
- Cẩm nang
  - Kinh nghiệm xây nhà
  - Vật liệu
  - Phong thủy
  - Thủ tục và quy định
- Công cụ
  - Dự toán chi phí xây dựng
- Tuyển dụng
- Liên hệ

Các công cụ phong thủy khác như xem tuổi hoặc thước Lỗ Ban không nằm trong MVP. Chúng có thể được bổ sung sau khi công cụ dự toán vận hành ổn định.

### 3.2. Trang chủ

Thứ tự nội dung đề xuất:

1. Header cố định với menu desktop, mobile drawer, chuyển ngôn ngữ và CTA tư vấn.
2. Hero slider hoặc video với hai CTA: xem dự án và dự toán chi phí.
3. Ba giá trị chính: tư vấn thông minh, dự toán trực tuyến và cẩm nang xây dựng.
4. Thanh tìm kiếm nhanh theo loại công trình, diện tích, ngân sách và địa điểm.
5. Khu vực "Ý tưởng dành cho bạn" hiển thị các dự án phù hợp.
6. Dịch vụ thiết kế, thi công, cải tạo và hoàn thiện.
7. Dự án nổi bật.
8. Các công cụ trực tuyến.
9. Dự án được xem nhiều.
10. Bài viết và cẩm nang mới.
11. Video và hình ảnh thực tế.
12. CTA đăng ký tư vấn.
13. Footer nhiều cột và nút gọi điện/Zalo cố định.

Trên mobile, các card chuyển về một cột hoặc carousel. Nút gọi điện và Zalo phải gọn, không che nội dung hay form.

### 3.3. Danh sách dự án

Chức năng cần có:

- Tìm theo từ khóa.
- Lọc theo loại công trình.
- Lọc theo tỉnh/thành.
- Lọc theo diện tích đất.
- Lọc theo khoảng ngân sách.
- Lọc theo năm thực hiện.
- Sắp xếp theo mới nhất, phổ biến hoặc ngân sách.
- Phân trang hoặc nút tải thêm.
- Lưu filter trên URL để có thể chia sẻ và hỗ trợ SEO.
- Trạng thái rỗng có hướng dẫn thay đổi bộ lọc và CTA đăng ký tư vấn.

Mỗi card dự án hiển thị:

- Ảnh đại diện.
- Tên dự án.
- Loại công trình.
- Địa điểm và năm thực hiện.
- Diện tích và khoảng ngân sách nếu được phép công khai.
- Số lượng ảnh trong album.

### 3.4. Chi tiết dự án

- Hero hoặc gallery toàn màn hình.
- Breadcrumb.
- Tên, địa điểm, loại công trình và năm thực hiện.
- Bảng thông số công trình.
- Bài toán của khách hàng.
- Giải pháp thiết kế và thi công.
- Album phối cảnh, bản vẽ và ảnh thực tế.
- Lightbox hỗ trợ bàn phím và thao tác vuốt.
- Dự án tương tự.
- Form đăng ký tư vấn có gắn mã dự án.
- Metadata và structured data riêng.

Mô hình dữ liệu dự án tối thiểu:

```ts
type Project = {
  id: string;
  slug: string;
  locale: "vi" | "en";
  title: string;
  summary: string;
  content: string;
  category: string;
  location: string;
  year: number;
  landArea?: number;
  buildingArea?: number;
  totalFloorArea?: number;
  floors?: number;
  bedrooms?: number;
  budgetMin?: number;
  budgetMax?: number;
  services: string[];
  coverImage: string;
  gallery: ProjectImage[];
  featured: boolean;
  publishedAt: string;
};
```

### 3.5. Công cụ dự toán chi phí

Triển khai dưới dạng wizard nhiều bước.

#### Bước 1: Thông tin cơ bản

- Tỉnh/thành xây dựng.
- Loại công trình: nhà phố, biệt thự hoặc nhà cấp 4.

#### Bước 2: Quy mô

- Diện tích đất.
- Diện tích xây dựng tầng một.
- Số tầng.
- Loại và diện tích tum/mái.

#### Bước 3: Điều kiện thi công

- Kết cấu móng.
- Chiều rộng đường tiếp cận.
- Hiện trạng nhà lân cận.
- Số mặt tiền.
- Tầng hầm hoặc bán hầm.
- Thang máy và số điểm dừng.
- Hồ bơi.

#### Bước 4: Kết quả

- Diện tích xây dựng quy đổi.
- Khoảng chi phí phần thô.
- Khoảng chi phí hoàn thiện.
- Các yếu tố có thể làm thay đổi dự toán.
- Phiên bản và ngày cập nhật đơn giá.
- Gợi ý các dự án có quy mô hoặc ngân sách tương tự.
- CTA nhận tư vấn và lưu kết quả.

Yêu cầu nghiệp vụ:

- Công thức và đơn giá phải được người phụ trách dự toán của Đức Anh KG xác nhận.
- Bảng đơn giá được lưu theo tỉnh/thành, loại công trình và thời gian áp dụng.
- Mỗi lần cập nhật công thức phải tạo phiên bản mới để truy vết.
- Kết quả chỉ là khoảng tham khảo và phải có điều khoản miễn trừ phù hợp.
- Không tuyên bố độ chính xác nếu chưa có dữ liệu kiểm chứng.

### 3.6. Cẩm nang và thư viện

- Trang danh sách bài viết theo danh mục.
- Trang chi tiết bài viết có mục lục, bài liên quan và dự án liên quan.
- Thư viện hình ảnh theo dự án hoặc chủ đề.
- Danh sách video với thumbnail, thời lượng và mô tả.
- Tìm kiếm toàn site cho dự án, bài viết và video.
- Cho phép biên tập viên tạo nội dung nháp, xuất bản và đặt lịch.

### 3.7. Lead và chuyển đổi

- Tiếp tục lưu lead trong Supabase.
- Kiểm tra dữ liệu bằng schema ở cả client và server.
- Rate limit theo IP hoặc fingerprint phù hợp.
- Chống spam bằng honeypot; chỉ bổ sung CAPTCHA khi thực sự cần.
- Lưu nguồn lead, URL, mã dự án, kết quả dự toán và UTM.
- Trang cảm ơn sau khi gửi thành công.
- Trạng thái lỗi rõ ràng và không làm mất dữ liệu người dùng đã nhập.
- Theo dõi sự kiện gọi điện, nhấn Zalo, gửi form và hoàn thành dự toán.

## 4. Kiến trúc kỹ thuật đề xuất

### 4.1. Routing và rendering

- Dùng App Router và Server Components mặc định.
- Chỉ dùng Client Components cho menu, filter, slider, lightbox, form và calculator.
- Chuyển ngôn ngữ sang URL `/vi/...` và `/en/...` hoặc dùng middleware với locale segment.
- Tạo metadata động cho từng dự án và bài viết.
- Tạo `sitemap.xml`, `robots.txt`, canonical URL và hreflang.

### 4.2. Dữ liệu

Phương án đề xuất cho MVP:

- Supabase Postgres cho dự án, bài viết, danh mục, đơn giá và lead.
- Supabase Storage cho ảnh dự án và thumbnail.
- Một khu vực quản trị tối giản có đăng nhập để chỉnh sửa nội dung.

Các bảng chính:

- `projects`
- `project_images`
- `project_categories`
- `articles`
- `article_categories`
- `videos`
- `cost_rate_versions`
- `cost_rate_rules`
- `leads`
- `calculator_results`

### 4.3. Tổ chức component và CSS

```text
src/
  app/
    [locale]/
      page.tsx
      du-an/
      cam-nang/
      thu-vien/
      cong-cu/
      lien-he/
  components/
    layout/
    home/
    projects/
    articles/
    gallery/
    calculator/
    forms/
    ui/
  data/
  lib/
  services/
  styles/
    tokens.css
    base.css
    utilities.css
```

- Tách token màu, typography, spacing, radius, shadow và breakpoint.
- Component không phụ thuộc class toàn cục của một trang khác.
- Dùng CSS Modules hoặc một quy ước layer rõ ràng.
- Giữ animation có chủ đích và hỗ trợ `prefers-reduced-motion`.

### 4.4. Hình ảnh và hiệu năng

- Chuyển ảnh dự án sang WebP hoặc AVIF.
- Khai báo kích thước và `sizes` chính xác cho mọi ảnh.
- Chỉ ưu tiên tải ảnh hero đầu tiên.
- Lazy-load gallery, video và mô hình 3D.
- Không tải `model-viewer` nếu section 3D chưa đi vào viewport hoặc bị loại khỏi thiết kế mới.
- Cân nhắc giảm hoặc thay thế video hero 13 MB hiện tại trên mobile.
- Dùng cache và revalidation cho nội dung đã xuất bản.

## 5. Kế hoạch thực hiện

### Giai đoạn 0: Chuẩn hóa codebase — 2 đến 3 ngày

**Trạng thái:** Hoàn thành ngày 2026-09-15. Kết quả baseline được lưu tại `docs/technical-baseline.md`.

- [x] Thêm `dist/**` vào ESLint ignore.
- [x] Sửa lỗi `BrickModel` và cảnh báo hook.
- [x] Kiểm tra build Next.js và Cloudflare/Vinext.
- [x] Ghi lại baseline Lighthouse và kích thước bundle.
- [x] Hợp nhất nhóm design token bị khai báo trùng lặp; giữ nguyên giao diện hiện tại.

Đầu ra:

- Lint và build thành công.
- Không thay đổi chức năng hiện tại.
- Có baseline để so sánh sau refactor.

### Giai đoạn 1: UX và design system — 4 đến 5 ngày

**Trạng thái:** Hoàn thành ngày 2026-09-15. Sitemap, wireframe và quy chuẩn được lưu tại `docs/ux-design-system.md`.

- [x] Chốt sitemap.
- [x] Vẽ wireframe desktop/mobile cho trang chủ, dự án, chi tiết và calculator.
- [x] Chốt typography, màu, grid, spacing, card, form và trạng thái tương tác.
- [x] Chốt menu và thứ tự các section trang chủ.
- [x] Xây các UI primitive dùng chung.

Đầu ra:

- Wireframe được duyệt.
- Design tokens và bộ component cơ bản.

### Giai đoạn 2: Mô hình dữ liệu và CMS — 4 đến 6 ngày

**Trạng thái:** Hoãn theo quyết định ngày 2026-09-15. Website tiếp tục dùng dữ liệu tĩnh trong `src/data`; Supabase schema và CMS sẽ được dựng ở giai đoạn sau.

- Thiết kế schema Supabase.
- Tạo migration và dữ liệu mẫu.
- Tạo cơ chế upload ảnh.
- Viết repository/service để trang không truy cập database trực tiếp.
- Tạo khu vực quản trị MVP.

Đầu ra:

- Có thể tạo, sửa và xuất bản dự án/bài viết.
- Frontend đọc nội dung từ database.

### Giai đoạn 3: Giao diện cốt lõi — 7 đến 10 ngày

**Trạng thái:** Hoàn thành ngày 2026-09-15 với dữ liệu tĩnh trong `src/data`. Ngày 2026-09-17, trang chủ được tinh chỉnh lại theo nhịp khám phá nội dung của trang tham chiếu: ẩn section "Dấu ấn vật liệu", đưa tìm kiếm toàn site và ba lối vào dự án–dự toán–cẩm nang lên ngay sau hero, làm rõ nhóm công cụ, bài viết và thư viện. Database và CMS vẫn được hoãn theo quyết định ở Giai đoạn 2.

- [x] Refactor header, footer và navigation; bổ sung active state, mobile dialog, phím Escape và quản lý focus.
- [x] Xây trang chủ mới với ba lối vào theo nhu cầu và khu vực giới thiệu thư viện.
- [x] Xây danh sách và chi tiết dự án với thông số, bài toán, giải pháp, gallery, dự án liên quan và form tư vấn.
- [x] Xây cẩm nang và chi tiết bài viết; giữ redirect logic của route tin tức cũ ở giai đoạn SEO sau.
- [x] Xây landing thư viện, thư viện hình ảnh và video bằng dữ liệu tĩnh.
- [x] Hoàn thiện responsive; kiểm tra trực tiếp ở 390 px và desktop, không có tràn ngang trên các route chính.

Đầu ra:

- Hoàn chỉnh các trang chính với dữ liệu tĩnh hiện có.
- `npm run lint`, `npm run build` và `npm run build:cloudflare` thành công.

### Giai đoạn 4: Tìm kiếm, bộ lọc và dự toán — 8 đến 12 ngày

**Trạng thái:** Hoàn thành phạm vi frontend tĩnh ngày 2026-09-15. Việc lưu kết quả vào database được hoãn cùng Giai đoạn 2.

- [x] Tìm kiếm toàn site trên dữ liệu tĩnh của dự án, cẩm nang, dịch vụ và video; hỗ trợ từ khóa tiếng Việt không dấu.
- [x] Bộ lọc dự án đồng bộ với URL theo từ khóa, loại công trình, tỉnh/thành, diện tích, ngân sách, năm và sắp xếp.
- [x] Calculator wizard 4 bước và validation dữ liệu quy mô.
- [x] Engine tính toán tách riêng theo phiên bản đơn giá tĩnh, gồm hệ số địa phương, loại nhà, móng, mái, đường tiếp cận, tầng hầm, mức hoàn thiện và thang máy.
- [x] Gợi ý dự án theo loại công trình sau khi có kết quả dự toán.
- [ ] Lưu kết quả dự toán vào database; hoãn theo quyết định giữ dữ liệu tĩnh. CTA tư vấn tiếp tục dùng luồng form hiện có.

Đầu ra:

- Người dùng có thể tìm dự án và hoàn tất dự toán trên desktop/mobile.
- Kết quả calculator được kiểm thử qua luồng mặc định; công thức cần được người phụ trách dự toán xác nhận trước khi dùng làm báo giá.

### Giai đoạn 5: SEO, analytics và nội dung — 4 đến 6 ngày

**Trạng thái:** Hoàn thành phần SEO kỹ thuật ngày 2026-09-15. Analytics production, hreflang và nội dung thật đang chờ đầu vào tương ứng.

- [x] Metadata theo route, metadata động cho dự án/bài viết, Open Graph và structured data.
- [x] Sitemap, robots và canonical; chưa tạo hreflang vì website hiện chưa dùng URL riêng cho từng ngôn ngữ.
- [x] Chuẩn bị tích hợp GA4 qua `NEXT_PUBLIC_GA_MEASUREMENT_ID` và các event gọi điện, Zalo, gửi lead, hoàn thành dự toán; chưa kích hoạt khi chưa có measurement ID.
- [ ] Nhập và rà soát nội dung thật; tiếp tục dùng dữ liệu tĩnh hiện có theo yêu cầu.
- [x] Redirect 308 route tin tức cũ sang cấu trúc `/cam-nang`.

Đầu ra:

- Có sẵn điểm đo funnel từ truy cập đến lead và chỉ gửi GA4 khi được cấu hình measurement ID.
- URL bài viết cũ được chuyển hướng vĩnh viễn; sitemap chỉ liệt kê URL chuẩn mới.

### Giai đoạn 6: QA và phát hành — 3 đến 5 ngày

- Test chức năng, responsive, trình duyệt và accessibility.
- Test form lead, quyền truy cập và các trường hợp lỗi.
- Kiểm tra công thức dự toán với người phụ trách nghiệp vụ.
- Kiểm tra hiệu năng bằng dữ liệu và ảnh thực tế.
- Triển khai staging, nghiệm thu và phát hành production.

Đầu ra:

- Checklist nghiệm thu được ký xác nhận.
- Có kế hoạch rollback và theo dõi lỗi sau phát hành.

Tổng thời gian MVP dự kiến: **5 đến 7 tuần** cho một developer chính, với điều kiện nội dung, hình ảnh và bảng đơn giá được cung cấp đúng tiến độ.

## 6. Mức độ ưu tiên

### MVP — bắt buộc

- Chuẩn hóa codebase và CSS.
- Trang chủ mới.
- Danh sách và chi tiết dự án.
- Tìm kiếm và bộ lọc dự án.
- Công cụ dự toán chi phí.
- Form lead và đo lường chuyển đổi.
- CMS dự án/bài viết tối giản.
- SEO và responsive.

### Giai đoạn sau MVP

- Gợi ý dự án cá nhân hóa nâng cao.
- Xem tuổi xây nhà.
- Thước Lỗ Ban.
- Tài khoản lưu dự án yêu thích.
- Chatbot.
- Tự động gửi báo giá hoặc tài liệu qua email/Zalo.

## 7. Tiêu chí nghiệm thu

### Chức năng

- Tất cả route chính hoạt động và có trang lỗi phù hợp.
- Bộ lọc dự án phản ánh chính xác trên URL.
- Calculator cho kết quả đúng với các bộ test được nghiệp vụ duyệt.
- Lead được lưu một lần, đúng nguồn và không mất dữ liệu.
- Quản trị viên có thể thêm dự án và bài viết mà không sửa code.

### Responsive và accessibility

- Không vỡ layout ở 360, 390, 768, 1024 và 1440 px.
- Có thể sử dụng menu, filter, gallery và calculator bằng bàn phím.
- Ảnh có alt text phù hợp.
- Form có label, thông báo lỗi và trạng thái focus rõ ràng.
- Tuân thủ `prefers-reduced-motion`.

### Hiệu năng và SEO

- Lighthouse mobile Performance từ 85 trở lên với nội dung production.
- Accessibility, Best Practices và SEO từ 90 trở lên.
- Mục tiêu Core Web Vitals: LCP dưới 2,5 giây, CLS dưới 0,1 và INP dưới 200 ms ở percentile 75 khi có đủ dữ liệu thực tế.
- Không có lỗi metadata, canonical, sitemap hoặc structured data quan trọng.
- Không tải video, gallery hoặc mô hình 3D khi chưa cần thiết.

### Chất lượng kỹ thuật

- `npm run lint` và production build thành công.
- Có test unit cho calculator engine.
- Có test integration cho API lead.
- Có test end-to-end cho luồng tìm dự án, dự toán và gửi tư vấn.
- Không để service key hoặc thông tin nhạy cảm xuất hiện ở client.

## 8. Đầu vào cần chuẩn bị

- Logo và bộ nhận diện chính thức.
- Danh sách dịch vụ và nội dung giới thiệu đã duyệt.
- Ảnh/video dự án có quyền sử dụng.
- Dữ liệu tối thiểu của từng dự án.
- Danh mục dự án mong muốn.
- Bảng đơn giá và công thức dự toán do Đức Anh KG xác nhận.
- Hotline, Zalo, Facebook, email và địa chỉ chính xác.
- Người phụ trách duyệt nội dung, giao diện và công thức.
- Tài khoản hoặc quyền truy cập Supabase, analytics và môi trường triển khai.

## 9. Rủi ro và biện pháp giảm thiểu

- **Thiếu dữ liệu dự án:** tạo template nhập liệu và hoàn thành nội dung trước giai đoạn QA.
- **Công thức dự toán chưa ổn định:** tách calculator engine khỏi UI và lưu phiên bản đơn giá.
- **Ảnh quá nặng:** kiểm tra dung lượng khi upload và tự động tạo nhiều kích thước.
- **Phạm vi tăng trong quá trình làm:** đóng phạm vi MVP và đưa công cụ phụ sang backlog.
- **Mất SEO khi đổi URL:** lập bảng URL cũ/mới và redirect trước khi phát hành.
- **Spam form:** honeypot, validation, rate limit và giám sát tỷ lệ lỗi.

## 10. Thứ tự triển khai đề xuất

1. Chuẩn hóa codebase và chốt wireframe.
2. Thiết kế schema dữ liệu trước khi làm lại card và trang chi tiết dự án.
3. Hoàn thiện luồng dự án trước calculator để calculator có dữ liệu gợi ý.
4. Xây calculator với công thức đã được nghiệp vụ xác nhận.
5. Nhập nội dung thật, tối ưu SEO và hiệu năng.
6. Phát hành MVP rồi mới bổ sung chatbot và các công cụ phong thủy.
