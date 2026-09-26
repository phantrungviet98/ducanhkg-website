-- Run after 202609220001_projects.sql and 202609220002_leads.sql.
-- Existing leads are retained and mapped to the three CRM states.
alter table public.leads add column if not exists admin_note text not null default '';

alter table public.leads drop constraint if exists leads_status_check;
update public.leads set status = case
  when status in ('contacted', 'qualified', 'closed', 'consulted') then 'consulted'
  when status = 'exception' then 'exception'
  else 'pending'
end;
alter table public.leads alter column status set default 'pending';
alter table public.leads add constraint leads_status_check
  check (status in ('pending', 'consulted', 'exception'));

-- Public submissions continue through the server-only /api/leads endpoint.
-- Only accounts listed in admin_users can read or update customer data.
drop policy if exists "Admins can read leads" on public.leads;
create policy "Admins can read leads" on public.leads
for select to authenticated using (public.is_admin());
drop policy if exists "Admins can update leads" on public.leads;
create policy "Admins can update leads" on public.leads
for update to authenticated using (public.is_admin()) with check (public.is_admin());
