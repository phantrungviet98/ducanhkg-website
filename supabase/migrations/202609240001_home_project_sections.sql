-- Curated project lists on the homepage. Run once in the Supabase SQL Editor.
alter table public.projects
  add column if not exists featured_for_you boolean not null default false,
  add column if not exists featured_most_viewed boolean not null default false;

-- Initial selections mirror the locally bundled portfolio. Admins can change
-- either list at /admin. Existing non-selected projects are left untouched.
update public.projects
set featured_for_you = true
where slug in (
  'cong-trinh-anh-chieu', 'cong-trinh-anh-phat', 'cong-trinh-chu-hieu',
  'cong-trinh-chu-hoan', 'cong-trinh-chu-ho', 'cong-trinh-chi-hoa-k4'
);

update public.projects
set featured_most_viewed = true
where slug in (
  'cong-trinh-chi-lien', 'cong-trinh-giuc-tuong', 'cong-trinh-go-quao',
  'cong-trinh-le-quy-don', 'cong-trinh-lac-hong', 'cong-trinh-minh-luong'
);

-- Refresh the PostgREST schema cache so the admin form can see the new fields.
notify pgrst, 'reload schema';
