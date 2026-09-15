# leadgen

Publisher-model lead marketplace MVP. One vertical (roofing), one market (Denver), sold to lead networks via ping/post and pay-per-call. See `../docs/feasibility/us-lead-marketplace-feasibility.md` for why.

## Run locally

```bash
cp .env.example .env      # set ADMIN_PASSWORD and ADMIN_SESSION_SECRET
npm install
npm run db:seed           # creates ./.pglite embedded DB, registers buyers (dev log buyer active)
npm run dev               # http://localhost:3000
```

No Postgres needed for dev: with `DATABASE_URL` unset the app uses an embedded PGlite database in `./.pglite`. For production set `DATABASE_URL` (Neon, Supabase, RDS) and run `npm run db:migrate && npm run db:seed` on deploy.

## Layout

- `src/config/` verticals (question schema, scoring), markets (ZIP footprint), consent text and partner list (versioned), site.
- `src/content/` researched content pages per vertical/market (`roofing-denver.ts`).
- `src/lib/leads/` validation, qualification, dedupe, fraud, intake (the lead lifecycle).
- `src/lib/buyers/` adapter interface, Modernize ping/post, generic ping/post, dev log buyer, router (ping all, post to highest bid).
- `src/lib/tracking.ts` visits, UTM/referrer channel classification, events.
- `src/app/` landing (`/roofing/denver`), content (`/roofing/denver/<slug>`), funnel (`/quote/roofing`), legal pages, `/admin`, API routes.
- `drizzle/` SQL migrations generated from `src/db/schema.ts` (`npm run db:generate`).

## Adding a vertical or market

1. Add the vertical to `src/config/verticals.ts` (questions, timelines, scoring, disqualifiers).
2. Add the market to `src/config/markets.ts` (ZIPs, facts).
3. Add content at `src/content/<vertical>-<market>.ts` and register it in `src/content/index.ts`.
4. Add the buyer's service code to the adapter config; run `npm run db:seed`.

## Buyer onboarding

- Modernize: set `MODERNIZE_TAG_ID`, `MODERNIZE_PARTNER_SOURCE_ID`, production URLs, `MODERNIZE_ENABLED=true`. Confirm roofing field values against apidoc.modernize.com during staging test.
- Any JSON ping/post exchange: insert a `buyers` row with `adapter=generic` and a field-map config (see `src/lib/buyers/generic.ts`).
- Calls: insert `tracking_numbers` rows; point the network's disposition webhook at `/api/webhooks/calls?key=$WEBHOOK_SECRET&source=<network>`.
- Set `NEXT_PUBLIC_TRUSTEDFORM_ENABLED=true` in production. Modernize rejects posts without a TrustedForm token.

## Checks

```bash
npm run typecheck && npm run lint && npm test && npm run build
```
