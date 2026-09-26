create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  category text not null default 'Hướng dẫn',
  published_at date not null default current_date,
  image text not null,
  excerpt text not null default '',
  body jsonb not null default '[]'::jsonb check (jsonb_typeof(body) = 'array'),
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at before update on public.articles
for each row execute function public.set_updated_at();

alter table public.articles enable row level security;
create policy "Published articles are public" on public.articles
for select to anon, authenticated using (published or public.is_admin());
create policy "Admins can create articles" on public.articles
for insert to authenticated with check (public.is_admin());
create policy "Admins can update articles" on public.articles
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete articles" on public.articles
for delete to authenticated using (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('article-media', 'article-media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set public = excluded.public;

create policy "Article media is public" on storage.objects
for select to public using (bucket_id = 'article-media');
create policy "Admins upload article media" on storage.objects
for insert to authenticated with check (bucket_id = 'article-media' and public.is_admin());
create policy "Admins update article media" on storage.objects
for update to authenticated using (bucket_id = 'article-media' and public.is_admin());
create policy "Admins delete article media" on storage.objects
for delete to authenticated using (bucket_id = 'article-media' and public.is_admin());

insert into public.articles (slug, title, category, published_at, image, excerpt, body, sort_order)
values
  ('planning-a-townhouse-build', 'Chuẩn bị gì trước khi xây nhà phố', 'Hướng dẫn', '2026-04-12', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80', 'Những điểm gia chủ nên làm rõ sớm: phạm vi, dự phòng ngân sách, giấy phép, vật tư ưu tiên và điều kiện thi công.', '["Trước khi đưa ra quyết định, gia chủ nên thống nhất nhu cầu sử dụng, mức đầu tư dự kiến và các mốc thời gian quan trọng.","Các lựa chọn về mặt bằng, vật liệu và thiết bị nên được ghi nhận theo từng mốc duyệt."]'::jsonb, 0),
  ('handover-quality-checklist', 'Checklist bàn giao công trình nhà ở', 'Chất lượng', '2026-03-18', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80', 'Bàn giao có danh mục rõ ràng giúp giảm tranh chấp và quản lý trách nhiệm bảo hành dễ hơn sau khi vào ở.', '["Kiểm tra từng hạng mục hoàn thiện, hệ thống điện nước và hồ sơ thiết bị trước khi nhận bàn giao.","Ghi nhận các vấn đề còn tồn tại và thống nhất thời hạn khắc phục bằng biên bản."]'::jsonb, 1),
  ('choosing-finish-materials', 'Chọn vật liệu hoàn thiện nhưng vẫn kiểm soát ngân sách', 'Vật liệu', '2026-02-21', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=80', 'Dùng mẫu duyệt, phương án thay thế và mốc đặt hàng để giữ hình ảnh hoàn thiện đúng với ngân sách đã thống nhất.', '["Lập bảng vật liệu theo khu vực, kèm mẫu duyệt và mức giá dự kiến cho từng hạng mục.","Thống nhất phương án thay thế trước khi đặt hàng để tránh gián đoạn tiến độ."]'::jsonb, 2)
on conflict (slug) do nothing;
