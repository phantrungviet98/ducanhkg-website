with source as (
  select
    item->>'slug' as slug,
    item->>'title' as title,
    item->>'category' as category,
    item->>'location' as location,
    coalesce(item->>'year', '2026') as year,
    coalesce(item->>'status', 'completed') as status,
    coalesce(item->>'project_type', 'townhouse') as project_type,
    ordinality::integer as sort_order
  from jsonb_array_elements($json$
[
  {"slug":"cong-trinh-anh-chieu","title":"Công trình Anh Chiêu","category":"Nhà ở","location":"Kiên Giang"},
  {"slug":"cong-trinh-anh-phat","title":"Công trình Anh Phát","category":"Nhà ở","location":"Kiên Giang"},
  {"slug":"cong-trinh-chu-hieu","title":"Công trình Chú Hiếu","category":"Nhà ở","location":"Kiên Giang"},
  {"slug":"cong-trinh-chu-hoan","title":"Công trình Chú Hoan","category":"Nhà ở","location":"Kiên Giang"},
  {"slug":"cong-trinh-chu-ho","title":"Công trình Chú Hổ","category":"Nhà ở","location":"Kiên Giang"},
  {"slug":"cong-trinh-chi-hoa-k4","title":"Công trình Chị Hoa K4","category":"Nhà ở","location":"Kiên Giang"},
  {"slug":"cong-trinh-chi-lien","title":"Công trình Chị Liên","category":"Nhà ở","location":"Kiên Giang"},
  {"slug":"cong-trinh-giuc-tuong","title":"Công trình Giục Tượng","category":"Nhà ở","location":"Giục Tượng, Kiên Giang"},
  {"slug":"cong-trinh-go-quao","title":"Công trình Gò Quao","category":"Nhà ở","location":"Gò Quao, Kiên Giang"},
  {"slug":"cong-trinh-le-quy-don","title":"Công trình Lê Quý Đôn","category":"Nhà ở","location":"Rạch Giá, Kiên Giang"},
  {"slug":"cong-trinh-lac-hong","title":"Công trình Lạc Hồng","category":"Nhà ở","location":"Rạch Giá, Kiên Giang"},
  {"slug":"cong-trinh-minh-luong","title":"Công trình Minh Lương","category":"Nhà ở","location":"Minh Lương, Kiên Giang"},
  {"slug":"thao-house","title":"Thảo House","category":"Nhà ở","location":"Kiên Giang"},
  {"slug":"cong-trinh-dien-bien-phu","title":"Công trình Điện Biên Phủ","category":"Nhà ở","location":"Rạch Giá, Kiên Giang"},
  {"slug":"cua-hang-duc-anh","title":"Cửa hàng Đức Anh","category":"Thương mại","location":"Kiên Giang","project_type":"commercial"},
  {"slug":"noi-that-phong-ngu","title":"Nội thất phòng ngủ","category":"Nội thất","location":"Kiên Giang","project_type":"commercial"},
  {"slug":"van-phong-duc-anh","title":"Văn phòng Đức Anh","category":"Văn phòng","location":"Kiên Giang","project_type":"commercial"},
  {"slug":"cong-trinh-vuon","title":"Công trình vườn","category":"Cảnh quan · 3D","location":"Kiên Giang"},
  {"slug":"cong-trinh-xeo-ro","title":"Công trình Xẻo Rô","category":"Nhà ở","location":"Xẻo Rô, Kiên Giang","status":"in_progress"},
  {"slug":"trinh-house","title":"Trinh House","category":"Nhà ở","location":"Kiên Giang","status":"planned"},
  {"slug":"tt-villa","title":"TT Villa","category":"Biệt thự","location":"Kiên Giang","status":"planned","year":"2027","project_type":"villa"},
  {"slug":"nha-pho-2027","title":"Nhà phố 2027","category":"Nhà phố","location":"Kiên Giang","status":"planned","year":"2027"}
]
$json$::jsonb) with ordinality as items(item, ordinality)
)
insert into public.projects
  (slug, title, category, location, year, status, image, summary, gallery, project_type, province, popularity, sort_order)
select
  slug,
  title,
  category,
  location,
  year,
  status,
  '/projects/' || slug || '/1.jpg',
  case status
    when 'planned' then 'Sắp thi công'
    when 'in_progress' then 'Đang thi công'
    else 'Đã thi công'
  end || ' · Hồ sơ hình ảnh thực tế và phương án thiết kế của ' || title || '.',
  case when slug = 'nha-pho-2027' then
    jsonb_build_array(
      jsonb_build_object('src', '/projects/' || slug || '/1.jpg', 'alt', title || ' — hình 1'),
      jsonb_build_object('src', '/projects/' || slug || '/2.jpg', 'alt', title || ' — hình 2')
    )
  else
    jsonb_build_array(
      jsonb_build_object('src', '/projects/' || slug || '/1.jpg', 'alt', title || ' — hình 1'),
      jsonb_build_object('src', '/projects/' || slug || '/2.jpg', 'alt', title || ' — hình 2'),
      jsonb_build_object('src', '/projects/' || slug || '/3.jpg', 'alt', title || ' — hình 3')
    )
  end,
  project_type,
  'kien-giang',
  100 - sort_order,
  sort_order
from source
on conflict (slug) do update set
  title = excluded.title, category = excluded.category, location = excluded.location,
  year = excluded.year, status = excluded.status, image = excluded.image,
  summary = excluded.summary, gallery = excluded.gallery, project_type = excluded.project_type,
  sort_order = excluded.sort_order;

-- After creating the first user in Supabase Authentication, grant access with:
-- insert into public.admin_users (user_id) values ('USER_UUID_HERE');
