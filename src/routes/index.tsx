import { Link, createFileRoute } from '@tanstack/react-router'

import { getSession } from '#/lib/auth-server'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const session = await getSession()
    return { session }
  },
  component: Home,
})

function Home() {
  const { session } = Route.useRouteContext()

  return (
    <div className="page-wrap rise-in py-12">
      <div className="island-shell rounded-2xl p-8">
        <p className="island-kicker">TanStack Start</p>
        <h1 className="display-title mt-2 text-4xl font-semibold">
          Welcome{session ? ` back, ${session.user.name}` : ''}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-[var(--sea-ink-soft)]">
          TanStack Start + Drizzle + Cloudflare D1 + Better Auth, all wired up
          and working.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {session ? (
            <Link
              to="/dashboard"
              className="rounded-lg bg-[var(--lagoon-deep)] px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-[#246f76]"
            >
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="rounded-lg bg-[var(--lagoon-deep)] px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-[#246f76]"
              >
                Create an account
              </Link>
              <Link
                to="/signin"
                className="rounded-lg border border-[var(--line)] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline hover:bg-white"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
