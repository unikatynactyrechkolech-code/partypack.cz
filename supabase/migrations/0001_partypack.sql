-- =====================================================================
-- Partypack – tabulky ve sdílené databázi Supabase (stejný projekt jako web Majdy Martinské)
-- Vše je ve schématu public s předponou partypack_, takže se nic nemíchá s ostatními weby
-- a není potřeba měnit nastavení API. Skript lze spustit opakovaně.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Akce v galerii (včetně importu z původního webu)
-- ---------------------------------------------------------------------
create table if not exists public.partypack_events (
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
create index if not exists partypack_events_published_date_idx on public.partypack_events (published, event_date desc);
create index if not exists partypack_events_service_idx on public.partypack_events (service);
create index if not exists partypack_events_type_idx on public.partypack_events (event_type);

-- ---------------------------------------------------------------------
-- Poptávky z kontaktního formuláře
-- ---------------------------------------------------------------------
create table if not exists public.partypack_inquiries (
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
create index if not exists partypack_inquiries_created_idx on public.partypack_inquiries (created_at desc);
create index if not exists partypack_inquiries_email_idx on public.partypack_inquiries (lower(email), created_at desc);

-- ---------------------------------------------------------------------
-- Kdo smí do administrace (e-mail účtu v Supabase Auth, malými písmeny)
-- ---------------------------------------------------------------------
create table if not exists public.partypack_admins (
  email      text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Funkce
-- ---------------------------------------------------------------------
create or replace function public.partypack_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.partypack_admins a
    where a.email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- Smí si tento e-mail v administraci nastavit heslo? (jen e-maily v partypack_admins)
create or replace function public.partypack_can_register(p_email text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.partypack_admins a where a.email = lower(trim(coalesce(p_email, ''))));
$$;

-- Uložení poptávky z webu bez tajného klíče. Kontroluje vstup a brání zahlcení
-- (nejvýš 5 poptávek ze stejného e-mailu za hodinu).
create or replace function public.partypack_submit_inquiry(
  p_name text, p_email text, p_phone text, p_source text, p_services text[], p_message text, p_page text
)
returns uuid
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_email text := lower(trim(coalesce(p_email, '')));
  v_allowed text[] := array['Fotokoutek', 'Hostesky', 'AI fotokoutek', 'AI Draw Bot', '360° Partyspin', 'Něco jiného'];
begin
  if char_length(trim(coalesce(p_name, ''))) not between 1 and 200 then raise exception 'invalid name'; end if;
  if v_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' or char_length(v_email) > 320 then raise exception 'invalid email'; end if;
  if char_length(trim(coalesce(p_phone, ''))) not between 3 and 50 then raise exception 'invalid phone'; end if;
  if coalesce(cardinality(p_services), 0) = 0 or not (p_services <@ v_allowed) then raise exception 'invalid services'; end if;
  if (select count(*) from public.partypack_inquiries i
      where lower(i.email) = v_email and i.created_at > now() - interval '1 hour') >= 5 then
    raise exception 'too many inquiries';
  end if;
  insert into public.partypack_inquiries (name, email, phone, source, services, message, page)
  values (
    trim(p_name), v_email, trim(p_phone),
    nullif(left(trim(coalesce(p_source, '')), 200), ''),
    p_services,
    nullif(left(trim(coalesce(p_message, '')), 2000), ''),
    case when p_page like '/%' then left(p_page, 300) end
  )
  returning id into v_id;
  return v_id;
end;
$$;

create or replace function public.partypack_touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists partypack_events_touch_updated_at on public.partypack_events;
create trigger partypack_events_touch_updated_at
  before update on public.partypack_events
  for each row execute function public.partypack_touch_updated_at();

-- ---------------------------------------------------------------------
-- Oprávnění: Supabase dává v public všem rolím plná práva, proto je nejdřív odebereme.
-- ---------------------------------------------------------------------
revoke all on public.partypack_events, public.partypack_inquiries, public.partypack_admins from anon, authenticated;
grant select on public.partypack_events to anon, authenticated;
grant insert, update, delete on public.partypack_events to authenticated;
grant select, update on public.partypack_inquiries to authenticated;
grant select on public.partypack_admins to authenticated;
grant all on public.partypack_events, public.partypack_inquiries, public.partypack_admins to service_role;

revoke all on function public.partypack_is_admin() from public;
revoke all on function public.partypack_can_register(text) from public;
revoke all on function public.partypack_submit_inquiry(text, text, text, text, text[], text, text) from public;
revoke all on function public.partypack_touch_updated_at() from public;
grant execute on function public.partypack_is_admin() to anon, authenticated, service_role;
grant execute on function public.partypack_can_register(text) to anon, authenticated, service_role;
grant execute on function public.partypack_submit_inquiry(text, text, text, text, text[], text, text) to anon, authenticated, service_role;

alter table public.partypack_events enable row level security;
alter table public.partypack_inquiries enable row level security;
alter table public.partypack_admins enable row level security;

drop policy if exists "partypack_events_select" on public.partypack_events;
create policy "partypack_events_select" on public.partypack_events
  for select to anon, authenticated
  using (published or public.partypack_is_admin());

drop policy if exists "partypack_events_insert_admin" on public.partypack_events;
create policy "partypack_events_insert_admin" on public.partypack_events
  for insert to authenticated
  with check (public.partypack_is_admin());

drop policy if exists "partypack_events_update_admin" on public.partypack_events;
create policy "partypack_events_update_admin" on public.partypack_events
  for update to authenticated
  using (public.partypack_is_admin())
  with check (public.partypack_is_admin());

drop policy if exists "partypack_events_delete_admin" on public.partypack_events;
create policy "partypack_events_delete_admin" on public.partypack_events
  for delete to authenticated
  using (public.partypack_is_admin());

drop policy if exists "partypack_inquiries_select_admin" on public.partypack_inquiries;
create policy "partypack_inquiries_select_admin" on public.partypack_inquiries
  for select to authenticated
  using (public.partypack_is_admin());

drop policy if exists "partypack_inquiries_update_admin" on public.partypack_inquiries;
create policy "partypack_inquiries_update_admin" on public.partypack_inquiries
  for update to authenticated
  using (public.partypack_is_admin())
  with check (public.partypack_is_admin());

drop policy if exists "partypack_admins_select_self" on public.partypack_admins;
create policy "partypack_admins_select_self" on public.partypack_admins
  for select to authenticated
  using (email = lower(coalesce(auth.jwt() ->> 'email', '')));
