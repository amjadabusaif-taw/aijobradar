-- Run this in your Supabase SQL Editor before first deployment

create table if not exists audits (
  id            uuid default gen_random_uuid() primary key,
  created_at    timestamp with time zone default now(),
  email         text,
  role          text,
  experience    text,
  industry      text,
  location      text,
  fears         text[],
  activities    text[],
  overall_score integer,
  risk_level    text,
  audit_data    jsonb
);

alter table audits enable row level security;

create policy "Service role full access"
  on audits for all
  using (true)
  with check (true);
