# UX và design system — Đức Anh KG

Tài liệu này là baseline thiết kế cho các giai đoạn triển khai tiếp theo. MM2 được dùng để tham khảo cách tổ chức nội dung và luồng tìm dự án; trải nghiệm và nhận diện vẫn thuộc Đức Anh KG.

## 1. Định hướng trải nghiệm

### Đối tượng chính

- Gia chủ đang chuẩn bị xây mới hoặc cải tạo nhà tại Kiên Giang và khu vực lân cận.
- Chủ đầu tư cần đánh giá năng lực thiết kế, thi công và mức chi phí dự kiến.
- Khách hàng đã biết Đức Anh KG và cần kênh liên hệ nhanh.

### Nhiệm vụ chính

Người dùng cần hoàn thành một trong ba việc sau mà không phải tự tìm hiểu cấu trúc công ty:

1. Tìm một công trình tương đồng với nhu cầu của mình.
2. Ước tính khoảng chi phí xây dựng.
3. Gửi yêu cầu để được tư vấn.

### Visual thesis

**Hồ sơ kiến trúc đương đại:** giao diện kết hợp tỷ lệ chữ mang tính biên tập, lưới kỹ thuật và các mảng ảnh công trình lớn. Màu đỏ nâu thể hiện thương hiệu, màu cát tạo độ ấm của vật liệu, màu đen tạo cảm giác chính xác và cao cấp.

Không biến mọi section thành card. Card chỉ dùng cho nội dung có thể chọn, so sánh hoặc mở chi tiết.

## 2. Sitemap đã chốt

```text
/
├── /ve-chung-toi
├── /linh-vuc
├── /du-an
│   └── /du-an/[slug]
├── /thu-vien
│   ├── /thu-vien/hinh-anh
│   └── /thu-vien/video
├── /cam-nang
│   ├── /cam-nang/[category]
│   └── /cam-nang/[category]/[slug]
├── /cong-cu
│   └── /cong-cu/du-toan-chi-phi
├── /tuyen-dung
├── /lien-he
├── /lien-he-hop-tac
└── /dang-ky-tu-van-ho-tro
```

Quy ước:

- Giai đoạn chuyển đổi tiếp tục hỗ trợ các URL bài viết hiện tại.
- Khi triển khai locale routing, đặt toàn bộ route nội dung dưới `/vi` và `/en`.
- Không thêm menu dẫn đến route chưa tồn tại. Menu mở rộng được đưa vào hoạt động cùng route tương ứng ở Giai đoạn 3–4.

## 3. Điều hướng

### Desktop

- Logo bên trái.
- Menu chính: Giới thiệu, Lĩnh vực, Dự án, Thư viện, Cẩm nang, Công cụ, Liên hệ.
- CTA “Đăng ký tư vấn” luôn nhìn thấy.
- Chuyển ngôn ngữ ở cuối header.
- Header trong suốt trên hero và chuyển sang nền sáng khi cuộn.

### Mobile

- Logo và nút menu trong header 70–76 px.
- Menu mở toàn màn hình, khóa cuộn trang nền.
- Thứ tự menu giống desktop.
- CTA tư vấn nằm cuối menu nhưng vẫn xuất hiện trong viewport đầu nếu chiều cao cho phép.
- Có nút đóng, hỗ trợ Escape và trả focus về nút mở menu.

## 4. Wireframe trang chủ

### Desktop

```text
┌──────────────────────────────────────────────────────────────────┐
│ Logo       Menu chính                  Tư vấn        VI / EN     │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Thông điệp chính                 Hồ sơ quy trình / ảnh dự án    │
│  Mô tả ngắn                       Chỉ số năng lực                 │
│  [Đăng ký tư vấn] [Xem dự án]                                    │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  Tìm mẫu nhà phù hợp: Loại | Diện tích | Ngân sách | Địa điểm   │
├──────────────────────────────────────────────────────────────────┤
│  01 Tư vấn thông minh | 02 Dự toán | 03 Cẩm nang                │
├──────────────────────────────────────────────────────────────────┤
│  Ý tưởng dành cho bạn                        [Xem tất cả]        │
│  Card lớn dự án      Card dự án      Card dự án                 │
├──────────────────────────────────────────────────────────────────┤
│  Dịch vụ / Quy trình / Năng lực thi công                         │
├──────────────────────────────────────────────────────────────────┤
│  Dự án nổi bật → Công cụ → Bài viết → Video                     │
├──────────────────────────────────────────────────────────────────┤
│  CTA tư vấn                                                       │
├──────────────────────────────────────────────────────────────────┤
│  Footer nhiều cột                                                 │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile

```text
┌────────────────────────────┐
│ Logo                  Menu │
├────────────────────────────┤
│ Thông điệp chính           │
│ Mô tả                      │
│ [Đăng ký tư vấn]           │
│ [Xem dự án]                │
│ Hồ sơ quy trình            │
├────────────────────────────┤
│ Tìm mẫu nhà phù hợp        │
│ [Loại công trình]          │
│ [Diện tích]                │
│ [Ngân sách]                │
│ [Tìm dự án]                │
├────────────────────────────┤
│ Các giá trị chính          │
├────────────────────────────┤
│ Dự án dạng carousel        │
├────────────────────────────┤
│ Dịch vụ dạng accordion     │
├────────────────────────────┤
│ Công cụ / Bài viết / Video │
├────────────────────────────┤
│ CTA và Footer              │
└────────────────────────────┘
```

Quy tắc viewport đầu:

- Desktop phải hiển thị thông điệp, CTA và bằng chứng năng lực.
- Mobile phải hiển thị trọn tiêu đề, mô tả và ít nhất một CTA trước hoặc ngay sát fold.
- Video chỉ đóng vai trò nền; nội dung không phụ thuộc vào việc video tải thành công.

## 5. Wireframe danh sách dự án

### Desktop

```text
┌──────────────────────────────────────────────────────────────────┐
│ Breadcrumb                                                        │
│ Dự án                         Mô tả ngắn                          │
├──────────────────────────────────────────────────────────────────┤
│ [Tìm kiếm........................] [Sắp xếp ▼]                    │
│ [Loại ▼] [Địa điểm ▼] [Diện tích ▼] [Ngân sách ▼] [Năm ▼]      │
│ 24 kết quả                                      [Xóa bộ lọc]     │
├──────────────────────────────────────────────────────────────────┤
│ Project card       Project card       Project card               │
│ Project card       Project card       Project card               │
├──────────────────────────────────────────────────────────────────┤
│                     Phân trang                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile

- Search chiếm toàn chiều rộng.
- Nút “Bộ lọc” mở bottom sheet; badge thể hiện số filter đang áp dụng.
- Sắp xếp là select riêng.
- Kết quả hiển thị một cột.
- Filter và pagination phải được phản ánh trên URL.

Trạng thái bắt buộc:

- Loading: skeleton giữ nguyên tỷ lệ card.
- Empty: giải thích ngắn, nút xóa filter và CTA tư vấn.
- Error: cho phép thử lại mà không mất filter.
- Loaded: hiển thị tổng kết quả và filter đang chọn.

## 6. Wireframe chi tiết dự án

### Desktop

```text
┌──────────────────────────────────────────────────────────────────┐
│ Breadcrumb                                                        │
├──────────────────────────────────────────────────────────────────┤
│ Gallery ảnh lớn 2/3                   Tên dự án                  │
│                                       Địa điểm · Năm             │
│                                       Bảng thông số              │
│                                       [Nhận tư vấn]              │
├──────────────────────────────────────────────────────────────────┤
│ Bài toán công trình       Giải pháp thiết kế và thi công         │
├──────────────────────────────────────────────────────────────────┤
│ Album phối cảnh / bản vẽ / ảnh thực tế                           │
├──────────────────────────────────────────────────────────────────┤
│ Dự án tương tự                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile

- Gallery trước, thông tin dự án sau.
- Bảng thông số chuyển thành definition list hai cột.
- CTA tư vấn không che điều khiển gallery.
- Lightbox hỗ trợ nút đóng, phím Escape, vuốt và focus trap.

## 7. Wireframe công cụ dự toán

Calculator là working surface; người dùng phải bắt đầu nhập liệu ngay ở viewport đầu, không đặt hero marketing phía trên.

### Desktop

```text
┌──────────────────────────────────────────────────────────────────┐
│ Dự toán chi phí xây dựng               Bước 1 / 4                │
├─────────────────────────────────┬────────────────────────────────┤
│ Form theo từng bước             │ Tóm tắt luôn hiển thị          │
│                                 │ Loại công trình                │
│ Địa điểm                        │ Quy mô                         │
│ Loại công trình                 │ Khoảng chi phí tạm tính        │
│                                 │                                │
│ [Quay lại]        [Tiếp tục]    │ Ngày cập nhật đơn giá          │
└─────────────────────────────────┴────────────────────────────────┘
```

### Mobile

- Progress bar và nhãn bước ở đầu.
- Một cột, control cao tối thiểu 48 px.
- Tóm tắt thu gọn phía dưới form.
- Thanh hành động sticky chỉ xuất hiện trong calculator và không chồng sticky call/Zalo.
- Không yêu cầu thông tin cá nhân trước khi hiển thị kết quả.

Trạng thái bắt buộc:

- Validation theo field khi người dùng rời field hoặc bấm tiếp tục.
- Kết quả đang tính.
- Kết quả thành công.
- Không có bảng giá phù hợp.
- Lỗi hệ thống có thể thử lại.

## 8. Design tokens

Nguồn chuẩn được lưu tại `src/styles/tokens.css`.

### Màu sắc

| Token | Vai trò |
| --- | --- |
| `--color-accent` | Thương hiệu, CTA chính, điểm nhấn |
| `--color-accent-soft` | CTA trên nền tối, bề mặt phụ |
| `--color-paper` | Nền nội dung chính |
| `--color-surface` | Card/form sáng |
| `--color-ink` | Nội dung chính |
| `--color-muted` | Mô tả và metadata |
| `--color-line` | Border và phân cách |

Không dùng màu sắc làm tín hiệu duy nhất cho lỗi, thành công hoặc trạng thái đang chọn.

### Typography

- Serif: tiêu đề, tên dự án và các con số mang tính editorial.
- Sans serif: body, menu, form, button và metadata.
- Script: chỉ dùng cho eyebrow mang tính thương hiệu; không dùng cho nội dung hoặc điều khiển.
- Body mặc định tối thiểu 16 px.
- Label điều khiển tối thiểu 14 px.
- Metadata được phép dùng 12–13 px nếu vẫn đủ tương phản.

### Spacing và layout

- Hệ spacing gốc 4 px, ưu tiên các token `--space-1` đến `--space-8`.
- Khoảng cách section dùng `--section-space`.
- Chiều rộng nội dung tối đa dùng `--page-max`.
- Gutter responsive dùng `--page-gutter`.
- Grid desktop chính có 12 cột; tablet 6 cột; mobile 4 cột.

### Breakpoints

| Breakpoint | Phạm vi |
| --- | --- |
| Mobile | dưới 640 px |
| Tablet | 640–899 px |
| Small desktop | 900–1179 px |
| Large desktop | từ 1180 px |

Không đưa CSS custom property vào điều kiện `@media` vì trình duyệt không hỗ trợ cách dùng đó. Giá trị breakpoint được quản lý bằng tài liệu và quy ước CSS.

### Shape, shadow và motion

- Radius nhỏ 14 px cho control/card nhỏ.
- Radius vừa 24 px cho section card.
- Radius lớn 36 px chỉ dùng cho media hoặc khối hero.
- Button dùng pill radius.
- Animation tương tác 180–260 ms.
- Animation vào viewport 450–700 ms và phải tắt với `prefers-reduced-motion`.

## 9. UI primitives

Các primitive đầu tiên:

- `ButtonLink`: link có hình thức CTA với variant primary/secondary.
- `ContentSection`: section nội dung có tone mặc định hoặc muted.
- `SectionHeading`: eyebrow và tiêu đề section có animation vào viewport.

Quy tắc mở rộng:

- Primitive chỉ chứa cấu trúc và hành vi dùng chung, không chứa nội dung nghiệp vụ.
- Variant phải hữu hạn và có tên theo vai trò, không theo màu cụ thể.
- Component nghiệp vụ như ProjectCard, SearchFilters hoặc CalculatorStep đặt trong thư mục domain tương ứng.
- Không thêm primitive nếu chỉ được sử dụng một lần và không mang quy tắc thiết kế dùng chung.

## 10. Accessibility baseline

- Focus indicator rõ ràng cho link, button, input, select và control tùy chỉnh.
- Kích thước vùng bấm tối thiểu 44 × 44 px; form và CTA chính ưu tiên 48–50 px.
- Heading không bỏ cấp.
- Icon trang trí dùng `aria-hidden`; icon-only button phải có accessible name.
- Menu và lightbox quản lý focus đúng vòng đời.
- Error message liên kết với field bằng `aria-describedby`.
- Carousel không tự động chuyển nội dung nếu không có nút dừng.
- Nội dung cốt lõi vẫn sử dụng được khi video, animation hoặc WebGL không hoạt động.

## 11. Nội dung cần chuẩn bị trước Giai đoạn 3

- 6–12 dự án có ảnh đại diện và thông số chuẩn hóa.
- Ít nhất 3 dự án có album ảnh hoàn chỉnh để xây gallery.
- Danh sách dịch vụ đã được duyệt.
- 6 bài cẩm nang theo 3 danh mục ưu tiên.
- 3 video hoặc liên kết video có quyền sử dụng.
- Thông tin liên hệ thật và URL Zalo/Facebook.
- Quyết định có công khai ngân sách từng dự án hay chỉ hiển thị khoảng giá.

## 12. Tiêu chí hoàn thành Giai đoạn 1

- Sitemap và các luồng chính được mô tả đầy đủ.
- Có wireframe desktop/mobile cho bốn bề mặt trọng tâm.
- Design token chỉ có một nguồn chuẩn.
- UI primitive đầu tiên được sử dụng trong giao diện hiện tại.
- Không tạo route chết trong navigation.
- Lint, build Next.js và build Vinext thành công.
- Giao diện hiện tại không bị thay đổi ngoài các khác biệt không đáng kể do refactor nội bộ.
