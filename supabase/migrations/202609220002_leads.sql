create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'website',
  name text not null,
  phone text not null,
  email text,
  message text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create index if not exists leads_status_idx
  on public.leads (status);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

alter table public.leads enable row level security;

-- Không tạo policy cho anon/authenticated: dữ liệu khách hàng không được
-- đọc hoặc ghi trực tiếp từ trình duyệt. API /api/leads sử dụng
-- SUPABASE_SECRET_KEY ở server để ghi dữ liệu và bypass RLS.

comment on table public.leads is
  'Yêu cầu tư vấn gửi từ các form trên website Đức Anh KG.';
