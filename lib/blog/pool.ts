import { Pool } from 'pg';

// Singleton pool — Next.js hot-reloads modules in dev so we stash on
// globalThis to avoid leaking connections across reloads.
const globalForPg = globalThis as unknown as { __blogPool?: Pool };

export function getBlogPool(): Pool {
  if (!globalForPg.__blogPool) {
    globalForPg.__blogPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: false, // Railway internal networking doesn't use SSL
      max: 5,
    });
  }
  return globalForPg.__blogPool;
}
