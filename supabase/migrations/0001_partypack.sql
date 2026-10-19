-- =====================================================================
-- Partypack – vlastní schéma ve sdílené databázi Supabase
-- Spusťte celé v Supabase → SQL Editor. Skript lze spustit opakovaně.
-- Potom v Supabase → Project Settings → Data API → Exposed schemas
-- přidejte schéma "partypack".
-- =====================================================================

create schema if not exists partypack;
grant usage on schema partypack to anon, authenticated, service_role;

-- ---------------------------------------------------------------------
-- Akce v galerii (včetně importu z původního webu)
-- ---------------------------------------------------------------------
create table if not exists partypack.events (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title       text not null check (char_length(title) between 1 and 200),
  event_date  date not null default current_date,
  service     text check (service in ('fotokoutek', 'ai-fotokoutek', 'partyspin', 'ai-draw-bot', 'hostesky', 'jine')),
  event_type  text check (event_type in ('event', 'svatba', 'ples', 'narozeniny')),
  album_url   text check (album_url is null or album_url ~* '^https?://'),
  description text check (description is null or char_length(description) <= 2000),
  cover_key   text,            -- klíč obrázku v R2 bez přípony .webp
  cover_w     integer,
  cover_h     integer,
  published   boolean not null default true,
  legacy_id   bigint unique,   -- ID příspěvku na původním WordPressu
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists events_published_date_idx on partypack.events (published, event_date desc);
create index if not exists events_service_idx on partypack.events (service);
create index if not exists events_type_idx on partypack.events (event_type);

-- ---------------------------------------------------------------------
-- Poptávky z kontaktního formuláře
-- ---------------------------------------------------------------------
create table if not exists partypack.inquiries (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 200),
  email      text not null check (char_length(email) between 3 and 320),
  phone      text not null check (char_length(phone) between 3 and 50),
  source     text check (source is null or char_length(source) <= 200),
  services   text[] not null default '{}',
  message    text check (message is null or char_length(message) <= 2000),
  page       text check (page is null or char_length(page) <= 300),
  status     text not null default 'nova' check (status in ('nova', 'resi-se', 'hotovo')),
  note       text check (note is null or char_length(note) <= 2000)
);
create index if not exists inquiries_created_idx on partypack.inquiries (created_at desc);

-- ---------------------------------------------------------------------
-- Kdo smí do administrace (e-mail účtu v Supabase Auth)
-- ---------------------------------------------------------------------
create table if not exists partypack.admins (
  email      text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

create or replace function partypack.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from partypack.admins a
    where a.email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function partypack.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists events_touch_updated_at on partypack.events;
create trigger events_touch_updated_at
  before update on partypack.events
  for each row execute function partypack.touch_updated_at();

-- ---------------------------------------------------------------------
-- Oprávnění a Row Level Security
-- ---------------------------------------------------------------------
grant select on partypack.events to anon, authenticated;
grant insert, update, delete on partypack.events to authenticated;
grant select, update on partypack.inquiries to authenticated;
grant select on partypack.admins to authenticated;
grant all on all tables in schema partypack to service_role;
grant execute on function partypack.is_admin() to anon, authenticated, service_role;

alter table partypack.events enable row level security;
alter table partypack.inquiries enable row level security;
alter table partypack.admins enable row level security;

drop policy if exists "events_select" on partypack.events;
create policy "events_select" on partypack.events
  for select to anon, authenticated
  using (published or partypack.is_admin());

drop policy if exists "events_insert_admin" on partypack.events;
create policy "events_insert_admin" on partypack.events
  for insert to authenticated
  with check (partypack.is_admin());

drop policy if exists "events_update_admin" on partypack.events;
create policy "events_update_admin" on partypack.events
  for update to authenticated
  using (partypack.is_admin())
  with check (partypack.is_admin());

drop policy if exists "events_delete_admin" on partypack.events;
create policy "events_delete_admin" on partypack.events
  for delete to authenticated
  using (partypack.is_admin());

-- Poptávky zapisuje jen server (service_role obchází RLS), číst a měnit je smí admin.
drop policy if exists "inquiries_select_admin" on partypack.inquiries;
create policy "inquiries_select_admin" on partypack.inquiries
  for select to authenticated
  using (partypack.is_admin());

drop policy if exists "inquiries_update_admin" on partypack.inquiries;
create policy "inquiries_update_admin" on partypack.inquiries
  for update to authenticated
  using (partypack.is_admin())
  with check (partypack.is_admin());

drop policy if exists "admins_select_self" on partypack.admins;
create policy "admins_select_self" on partypack.admins
  for select to authenticated
  using (email = lower(coalesce(auth.jwt() ->> 'email', '')));

-- ---------------------------------------------------------------------
-- Přidání administrátora: nejdřív vytvořte uživatele v Authentication → Users,
-- pak sem doplňte jeho e-mail a odkomentujte řádek.
-- insert into partypack.admins (email) values ('mia@partypack.cz') on conflict do nothing;
-- ---------------------------------------------------------------------
