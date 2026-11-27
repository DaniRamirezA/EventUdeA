-- EventUdeA: esquema inicial para Supabase (PostgreSQL)
create extension if not exists pgcrypto;

create type public.app_role as enum ('asistente','organizador','administrador');
create type public.event_status as enum ('borrador','pendiente','publicado','rechazado','finalizado');
create type public.registration_status as enum ('inscrito','cancelado','asistio','ausente');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null,
  role public.app_role not null default 'asistente',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id bigint generated always as identity primary key,
  name text not null unique,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.venues (
  id bigint generated always as identity primary key,
  name text not null unique,
  building text,
  capacity integer check (capacity is null or capacity > 0),
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references public.profiles(id),
  category_id bigint references public.categories(id),
  venue_id bigint references public.venues(id),
  title text not null,
  description text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  capacity integer not null check (capacity > 0),
  status public.event_status not null default 'pendiente',
  rejection_reason text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  attendee_id uuid not null references public.profiles(id) on delete cascade,
  status public.registration_status not null default 'inscrito',
  qr_token uuid not null default gen_random_uuid() unique,
  registered_at timestamptz not null default now(),
  unique(event_id, attendee_id)
);

create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null unique references public.registrations(id) on delete cascade,
  validated_by uuid not null references public.profiles(id),
  checked_in_at timestamptz not null default now(),
  method text not null default 'qr' check (method in ('qr','manual'))
);

create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null unique references public.registrations(id) on delete cascade,
  attendee_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  certificate_number text not null unique default upper(substr(encode(gen_random_bytes(8),'hex'),1,12)),
  file_url text,
  issued_at timestamptz not null default now()
);

create or replace function public.current_role()
returns public.app_role
language sql stable security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.venues enable row level security;
alter table public.events enable row level security;
alter table public.registrations enable row level security;
alter table public.attendance enable row level security;
alter table public.certificates enable row level security;

create policy "profiles read self or admin" on public.profiles for select to authenticated
using (id = auth.uid() or public.current_role() = 'administrador');
create policy "profiles update self" on public.profiles for update to authenticated
using (id = auth.uid()) with check (id = auth.uid());

create policy "categories public read active" on public.categories for select
using (active = true or public.current_role() = 'administrador');
create policy "categories admin manage" on public.categories for all to authenticated
using (public.current_role() = 'administrador') with check (public.current_role() = 'administrador');

create policy "venues public read active" on public.venues for select
using (active = true or public.current_role() = 'administrador');
create policy "venues admin manage" on public.venues for all to authenticated
using (public.current_role() = 'administrador') with check (public.current_role() = 'administrador');

create policy "published events public read" on public.events for select
using (status = 'publicado' or organizer_id = auth.uid() or public.current_role() = 'administrador');
create policy "organizers create own events" on public.events for insert to authenticated
with check (organizer_id = auth.uid() and public.current_role() in ('organizador','administrador'));
create policy "organizers update own pending events or admin" on public.events for update to authenticated
using ((organizer_id = auth.uid() and status in ('borrador','pendiente')) or public.current_role() = 'administrador')
with check ((organizer_id = auth.uid() and status in ('borrador','pendiente')) or public.current_role() = 'administrador');
create policy "organizers delete own drafts or admin" on public.events for delete to authenticated
using ((organizer_id = auth.uid() and status = 'borrador') or public.current_role() = 'administrador');

create policy "attendees read own registrations and event owners" on public.registrations for select to authenticated
using (attendee_id = auth.uid() or exists(select 1 from public.events e where e.id = event_id and e.organizer_id = auth.uid()) or public.current_role() = 'administrador');
create policy "attendees register themselves" on public.registrations for insert to authenticated
with check (attendee_id = auth.uid() and public.current_role() = 'asistente' and exists(select 1 from public.events e where e.id = event_id and e.status = 'publicado'));
create policy "attendees cancel own registration" on public.registrations for update to authenticated
using (attendee_id = auth.uid()) with check (attendee_id = auth.uid() and status = 'cancelado');

create policy "attendance visible to attendee or event team" on public.attendance for select to authenticated
using (exists(select 1 from public.registrations r where r.id = registration_id and r.attendee_id = auth.uid())
or exists(select 1 from public.registrations r join public.events e on e.id = r.event_id where r.id = registration_id and (e.organizer_id = auth.uid() or public.current_role() = 'administrador')));
create policy "organizers validate attendance" on public.attendance for insert to authenticated
with check (validated_by = auth.uid() and exists(select 1 from public.registrations r join public.events e on e.id = r.event_id where r.id = registration_id and (e.organizer_id = auth.uid() or public.current_role() = 'administrador')));

create policy "certificates read own or admin" on public.certificates for select to authenticated
using (attendee_id = auth.uid() or public.current_role() = 'administrador' or exists(select 1 from public.events e where e.id = event_id and e.organizer_id = auth.uid()));
create policy "admin issues certificates" on public.certificates for insert to authenticated
with check (public.current_role() = 'administrador' or exists(select 1 from public.events e where e.id = event_id and e.organizer_id = auth.uid()));

insert into public.categories(name,description) values
('Académico','Conferencias, seminarios y actividades académicas'),
('Cultura','Arte, música y expresiones culturales'),
('Bienestar','Actividades de salud, deporte y bienestar'),
('Investigación','Encuentros y divulgación científica')
on conflict (name) do nothing;

-- Crear el primer administrador manualmente después del registro:
-- update public.profiles set role = 'administrador' where email = 'correo-institucional@udea.edu.co';
