import { env } from 'cloudflare:workers'
import { drizzle } from 'drizzle-orm/d1'

import * as schema from './schema.ts'

/**
 * Creates a Drizzle client backed by the `tanapp_db` D1 binding.
 *
 * Call this per request (inside server functions / handlers) instead of
 * caching a client in global scope — Cloudflare may reuse isolates with
 * stale bindings otherwise.
 * https://developers.cloudflare.com/workers/runtime-apis/bindings/
 */
export function getDb(database = env.tanapp_db) {
  // Note: drizzle-orm v1 removed the `schema` driver option — `db.query`
  // is now built from `relations` (defineRelations) instead. We don't use
  // the relational API, and better-auth gets the schema via its own
  // adapter options, so no config is needed here.
  return drizzle(database)
}

export type Database = ReturnType<typeof getDb>

export { schema }
