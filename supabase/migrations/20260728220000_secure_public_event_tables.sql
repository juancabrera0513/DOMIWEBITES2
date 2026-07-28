-- These tables are written by Edge Functions with the service role.
-- RLS prevents direct access through the public Data API while preserving
-- authenticated account-member visibility in the dashboard.

alter table public.chat_leads enable row level security;
alter table public.visitor_events enable row level security;

drop policy if exists chat_leads_select_members on public.chat_leads;
create policy chat_leads_select_members
on public.chat_leads
for select
to authenticated
using (
  exists (
    select 1
    from public.conversations c
    join public.account_users au on au.account_id = c.account_id
    where c.id = chat_leads.conversation_id
      and au.user_id = auth.uid()
  )
);

drop policy if exists visitor_events_select_members on public.visitor_events;
create policy visitor_events_select_members
on public.visitor_events
for select
to authenticated
using (
  exists (
    select 1
    from public.sites s
    join public.account_users au on au.account_id = s.account_id
    where s.id = visitor_events.site_id
      and au.user_id = auth.uid()
  )
);
