import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: ['.env.local', '.env'] })

/**
 * Drizzle Kit talks to D1 over the Cloudflare REST API (`d1-http` driver),
 * so commands like `db:push`, `db:pull` and `db:studio` work against the
 * real remote database. Migrations are generated with `db:generate` and
 * applied with Wrangler (see the `db:migrate*` scripts in package.json),
 * which uses the `migrations_dir` configured in wrangler.jsonc.
 */
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
})
