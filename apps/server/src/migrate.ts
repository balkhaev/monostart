import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// В production миграции лежат в /app/migrations
// В development - в packages/db/src/migrations
const migrationsFolder =
  process.env.NODE_ENV === "production"
    ? path.resolve("/app/migrations")
    : path.resolve(__dirname, "../../packages/db/src/migrations");

async function runMigrations() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not defined");
  }

  const pool = new pg.Pool({ connectionString: url });
  const db = drizzle(pool);

  console.log("🔄 Running migrations from:", migrationsFolder);

  await migrate(db, { migrationsFolder });

  console.log("✅ Migrations completed successfully");

  await pool.end();
}

runMigrations()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  });
