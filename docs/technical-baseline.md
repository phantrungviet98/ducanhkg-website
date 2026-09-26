# Technical baseline

Baseline này được ghi nhận trong Giai đoạn 0 để so sánh với các giai đoạn refactor tiếp theo.

## Môi trường đo

- Ngày đo: 2026-09-15
- Runtime: Next.js 16.2.6, React 19.2.6
- Lighthouse: 13.4.1
- URL: production build chạy tại `http://localhost:3000/`
- Lighthouse profile: mobile mặc định, headless Chrome; số liệu là trung vị của 3 lần chạy liên tiếp

## Trạng thái kiểm tra

| Kiểm tra | Kết quả |
| --- | --- |
| `npm run lint` | Đạt, 0 lỗi và 0 cảnh báo |
| `npm run build` | Đạt, 18 trang được generate |
| `npm run build:cloudflare` | Đạt, còn cảnh báo chunk lớn hơn 500 kB |
| Desktop smoke test | Đạt |
| Mobile 390 × 844 smoke test | Đạt |

Trước khi chuẩn hóa, ESLint quét cả thư mục `dist` và báo 7.634 vấn đề. `dist/**` đã được loại khỏi phạm vi lint; lỗi nguồn trong `BrickModel` và cảnh báo dependency trong `useInView` cũng đã được xử lý.

## Lighthouse

| Hạng mục | Điểm |
| --- | ---: |
| Performance | 80 |
| Accessibility | 100 |
| Best Practices | 96 |
| SEO | 100 |

| Chỉ số | Giá trị |
| --- | ---: |
| First Contentful Paint | 1,66 giây |
| Largest Contentful Paint | 4,80 giây |
| Total Blocking Time | 82 ms |
| Cumulative Layout Shift | 0 |
| Speed Index | 3,80 giây |
| Tổng dữ liệu truyền | 17.059 KiB |

Lưu ý: bài đo headless không tạo được WebGL context, vì vậy `model-viewer` ghi lỗi vào console. Cần phân biệt lỗi môi trường đo này với lỗi trên trình duyệt thật khi so sánh các lần chạy tiếp theo.

## Kích thước tài nguyên

| Tài nguyên | Kích thước gần đúng |
| --- | ---: |
| Tổng `.next/static/chunks` | 1.924 KiB |
| Chunk JavaScript lớn nhất của Next | 1.040 KiB raw / 290 KiB gzip |
| Tổng Vinext client chunks | 1.640 KiB |
| `model-viewer` trong Vinext | 1.004 KiB raw / 280 KiB gzip |
| Video hero | 13 MiB |
| Google Sans Flex | 4 MiB raw / 2,3 MiB gzip |
| Ảnh poster hero | 336 KiB |
| Mô hình GLB | 204 KiB |

## Cơ hội tối ưu đã xác định

- Video hero và font Google Sans Flex chiếm phần lớn tổng dữ liệu truyền.
- `model-viewer` tạo chunk khoảng 1 MiB và hiện được tải ngay khi trang chủ mount.
- Lighthouse ước tính có thể giảm khoảng 219 KiB JavaScript không sử dụng.
- Poster hero có thể tiết kiệm khoảng 247 KiB khi chuyển sang WebP/AVIF hoặc nén lại.
- LCP 4,8 giây chưa đạt mục tiêu 2,5 giây.
- Vinext cảnh báo chunk lớn hơn 500 kB; cần lazy-load hoặc tách chunk trong giai đoạn tối ưu giao diện.

## Mục tiêu sau refactor

- Performance mobile từ 85 trở lên với dữ liệu production.
- LCP dưới 2,5 giây ở percentile 75 khi có dữ liệu thực tế.
- CLS dưới 0,1.
- INP dưới 200 ms.
- Không có chunk chức năng tùy chọn tải trên initial route nếu chưa được sử dụng.
- Không có lỗi console trên các trình duyệt được hỗ trợ.
