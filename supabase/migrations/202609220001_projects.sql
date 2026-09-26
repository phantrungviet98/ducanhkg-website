create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  category text not null default 'Nhà ở',
  location text not null default 'Kiên Giang',
  year text not null default extract(year from now())::text,
  status text not null default 'completed' check (status in ('completed', 'in_progress', 'planned')),
  image text not null,
  summary text not null default '',
  land_area text,
  building_area text,
  total_floor_area text,
  scale text,
  budget text,
  scope text,
  challenge text,
  solution text,
  gallery jsonb not null default '[]'::jsonb check (jsonb_typeof(gallery) = 'array'),
  project_type text not null default 'townhouse' check (project_type in ('townhouse', 'villa', 'level4', 'commercial')),
  province text not null default 'kien-giang' check (province in ('kien-giang', 'can-tho', 'other')),
  land_area_m2 numeric not null default 0,
  budget_billion numeric not null default 0,
  popularity integer not null default 0,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;

create policy "Users can verify their own admin membership" on public.admin_users
for select to authenticated using (user_id = auth.uid());

create policy "Published projects are public" on public.projects
for select to anon, authenticated using (published or public.is_admin());
create policy "Admins can create projects" on public.projects
for insert to authenticated with check (public.is_admin());
create policy "Admins can update projects" on public.projects
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete projects" on public.projects
for delete to authenticated using (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('project-media', 'project-media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set public = excluded.public;

create policy "Project media is public" on storage.objects
for select to public using (bucket_id = 'project-media');
create policy "Admins upload project media" on storage.objects
for insert to authenticated with check (bucket_id = 'project-media' and public.is_admin());
create policy "Admins update project media" on storage.objects
for update to authenticated using (bucket_id = 'project-media' and public.is_admin());
create policy "Admins delete project media" on storage.objects
for delete to authenticated using (bucket_id = 'project-media' and public.is_admin());

comment on table public.projects is 'Public portfolio managed from /admin.';

