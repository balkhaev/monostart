import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config({
  path: "../../apps/server/.env",
});

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsFolder = path.join(__dirname, "migrations");

export async function runMigrations(connectionUrl?: string) {
  const url = connectionUrl || process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not defined");
  }

  const pool = new pg.Pool({ connectionString: url });
  const db = drizzle(pool);

  console.log("🔄 Running migrations...");

  await migrate(db, { migrationsFolder });

  console.log("✅ Migrations completed successfully");

  await pool.end();
}

// Запуск напрямую через CLI
const isMainModule = process.argv[1]?.endsWith("migrate.ts");

if (isMainModule) {
  runMigrations()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Migration failed:", error);
      process.exit(1);
    });
}
