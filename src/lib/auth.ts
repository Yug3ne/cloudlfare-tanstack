import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import type { Database } from '#/db'
import { schema } from '#/db'

export function createAuth(db: Database) {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [tanstackStartCookies()],
  })
}
