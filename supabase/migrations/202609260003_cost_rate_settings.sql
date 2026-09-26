-- Run after 202609220001_projects.sql (uses public.is_admin and public.set_updated_at).
-- All prices are VND; factors are dimensionless multipliers.
create table if not exists public.cost_rate_settings (
  id text primary key check (id = 'active'),
  version text not null check (length(trim(version)) > 0),
  note text not null default '',
  config jsonb not null check (jsonb_typeof(config) = 'object'),
  updated_at timestamptz not null default now()
);

drop trigger if exists cost_rate_settings_set_updated_at on public.cost_rate_settings;
create trigger cost_rate_settings_set_updated_at before update on public.cost_rate_settings
for each row execute function public.set_updated_at();

alter table public.cost_rate_settings enable row level security;
drop policy if exists "Public can read cost rates" on public.cost_rate_settings;
create policy "Public can read cost rates" on public.cost_rate_settings
for select to anon, authenticated using (id = 'active');
drop policy if exists "Admins can update cost rates" on public.cost_rate_settings;
create policy "Admins can update cost rates" on public.cost_rate_settings
for update to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.cost_rate_settings (id, version, note, config)
values (
  'active',
  'DAKG-STATIC-2026.09',
  'Bảng hệ số phục vụ ước tính sơ bộ, chưa thay thế dự toán theo hồ sơ thiết kế.',
  '{
    "constructionRates": {
      "townhouse": {"rawMin": 3650000, "rawMax": 4250000},
      "villa": {"rawMin": 4050000, "rawMax": 4850000},
      "level4": {"rawMin": 3350000, "rawMax": 3950000}
    },
    "finishRates": {
      "essential": {"min": 2100000, "max": 2850000},
      "standard": {"min": 2850000, "max": 4000000},
      "premium": {"min": 4000000, "max": 5800000}
    },
    "foundationFactors": {"single": 0.35, "strip": 0.5, "pile": 0.65},
    "roofFactors": {"flat": 0.5, "metal": 0.3, "tile": 0.7},
    "accessFactors": {"wide": 1, "medium": 1.06, "narrow": 1.13},
    "provinceFactors": {"kien-giang": 1, "can-tho": 1.03, "other": 1.08},
    "basementFactor": 1.5,
    "elevatorMin": 420000000,
    "elevatorMax": 650000000
  }'::jsonb
)
on conflict (id) do nothing;
