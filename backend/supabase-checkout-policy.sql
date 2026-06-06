-- Run this in the Supabase SQL editor for the project that owns public.checkout.
-- It lets the storefront's publishable anon key create checkout rows.

alter table public.checkout enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.checkout to anon, authenticated;

drop policy if exists "Allow storefront checkout inserts" on public.checkout;
create policy "Allow storefront checkout inserts"
on public.checkout
for insert
to anon, authenticated
with check (true);
