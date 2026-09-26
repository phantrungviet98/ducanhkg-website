# Cấu hình Supabase cho dự án Đức Anh KG

## 1. Tạo database và Storage

1. Tạo một project trên Supabase.
2. Mở **SQL Editor**, chạy lần lượt:
   - `supabase/migrations/202609220001_projects.sql`
   - `supabase/seed.sql`
   - `supabase/migrations/202609260001_articles.sql` (CRM Cẩm nang; chỉ chạy sau migration dự án vì dùng chung quyền admin)
   - `supabase/migrations/202609220002_leads.sql` (nếu chưa chạy)
   - `supabase/migrations/202609260002_leads_crm.sql` (CRM đăng ký tư vấn; chạy sau hai migration gốc)
3. Schema tạo bảng `projects`, `articles`, danh sách `admin_users`, các bucket ảnh công khai và RLS policy.

## 2. Tạo tài khoản quản trị

1. Trong **Authentication → Users**, tạo user bằng email/mật khẩu.
2. Sao chép UUID của user.
3. Trong SQL Editor chạy:

```sql
insert into public.admin_users (user_id)
values ('UUID_CUA_USER');
```

Không có màn hình đăng ký công khai. Nên tắt **Allow new users to sign up** trong Supabase Authentication sau khi tạo tài khoản quản trị.

## 3. Kết nối website

Tạo `.env.local` từ `.env.example` và điền:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
SUPABASE_SECRET_KEY=sb_secret_YOUR_KEY
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` được dùng trong trình duyệt và vẫn chịu sự kiểm soát của RLS. `SUPABASE_SECRET_KEY` chỉ được dùng trong API phía server (hiện tại là API tiếp nhận liên hệ); tuyệt đối không thêm tiền tố `NEXT_PUBLIC_` cho secret key.

Khởi động lại `npm run dev`, sau đó truy cập `/admin`.

Website dùng dữ liệu mẫu làm fallback nếu Supabase chưa được cấu hình. Khi kết nối thành công, danh sách công khai đọc từ `projects` và `articles`; chỉ bản ghi có `published = true` được hiển thị. Nếu chưa chạy migration Cẩm nang, phần quản trị sẽ báo thiếu bảng; hãy chạy SQL ở bước 1.

## 4. Quản lý ảnh

Trang admin có ba tab **Dự án**, **Cẩm nang** và **Đăng ký tư vấn**. Bạn có thể thêm, sửa, xóa, ẩn/hiện bài cẩm nang, soạn nội dung theo đoạn, chọn ngày đăng và tải ảnh đại diện JPG, PNG, WebP hoặc AVIF (tối đa 10 MB) lên bucket `article-media`. Ảnh dự án dùng bucket `project-media`. Ảnh trong bộ bàn giao ban đầu đã được tối ưu và lưu tại `public/projects`.

Tab **Đăng ký tư vấn** hiển thị các yêu cầu từ form, cho phép lọc theo trạng thái **Chưa tư vấn / Đã tư vấn / Ngoại lệ** và lưu ghi chú nội bộ. Quyền đọc/cập nhật chỉ dành cho user trong `admin_users`. Form gửi qua `/api/leads` và chỉ báo thành công sau khi Supabase lưu thành công. Thông báo qua ứng dụng chat chưa bật; cần chọn kênh và cấu hình token/webhook riêng trên server.

Để nhập lại ảnh từ các ZIP gốc:

```bash
python3 scripts/import_project_media.py
```

Script chỉ tạo lại ảnh web trong `public/projects`; không sửa hoặc xóa dữ liệu gốc ở Downloads.
