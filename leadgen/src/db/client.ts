import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import type { PgDatabase } from "drizzle-orm/pg-core";
import * as schema from "./schema";

// One DB handle per process. Postgres when DATABASE_URL is set, otherwise an
// embedded PGlite instance so `npm run dev` works with zero setup.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Db = PgDatabase<any, typeof schema>;

const globalForDb = globalThis as unknown as { __leadgenDb?: Promise<Db> };

async function create(): Promise<Db> {
  const url = process.env.DATABASE_URL;
  if (url) {
    const postgres = (await import("postgres")).default;
    const client = postgres(url, { max: 5, prepare: false });
    return drizzlePg(client, { schema }) as unknown as Db;
  }
  const { PGlite } = await import("@electric-sql/pglite");
  const dataDir = process.env.PGLITE_DIR ?? (process.env.NODE_ENV === "test" ? undefined : "./.pglite");
  const client = dataDir ? new PGlite(dataDir) : new PGlite();
  await client.waitReady;
  const db = drizzlePglite(client, { schema }) as unknown as Db;
  await ensureSchema(db);
  return db;
}

// PGlite has no migration runner in dev; apply the generated SQL migrations
// idempotently on boot. Postgres deployments run `npm run db:migrate`.
async function ensureSchema(db: Db) {
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  const path = await import("node:path");
  await migrate(db as never, { migrationsFolder: path.resolve(process.cwd(), "drizzle") });
}

export function getDb(): Promise<Db> {
  if (!globalForDb.__leadgenDb) globalForDb.__leadgenDb = create();
  return globalForDb.__leadgenDb;
}

export { schema };
