import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {

  const url = process.env.DATABASE_URL;
  if (!url) { console.error("DATABASE_URL is required for db:migrate"); process.exit(1); }
  const client = postgres(url, { max: 1 });
  await migrate(drizzle(client), { migrationsFolder: "./drizzle" });
  await client.end();
  console.log("migrated");
}

main().catch((e) => { console.error(e); process.exit(1); });
