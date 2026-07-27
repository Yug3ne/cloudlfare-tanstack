import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

import { authClient } from '#/lib/auth-client'
import { getSession } from '#/lib/auth-server'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session) {
      // Not signed in — bounce to the signin page.
      throw redirect({ to: '/signin' })
    }
    return { session }
  },
  component: DashboardPage,
})

function DashboardPage() {
  const { session } = Route.useRouteContext()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    await authClient.signOut()
    await router.invalidate()
    router.navigate({ to: '/signin' })
  }

  return (
    <div className="page-wrap rise-in py-12">
      <div className="island-shell rounded-2xl p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="island-kicker">Protected area</p>
            <h1 className="display-title mt-2 text-3xl font-semibold">
              Dashboard
            </h1>
          </div>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-lg border border-[var(--line)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] hover:bg-white disabled:opacity-60"
          >
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>

        <p className="mt-4 text-[var(--sea-ink-soft)]">
          You can only see this page with a valid session.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="feature-card rounded-xl border border-[var(--line)] p-5">
            <p className="island-kicker">Name</p>
            <p className="mt-2 text-lg font-semibold">{session.user.name}</p>
          </div>
          <div className="feature-card rounded-xl border border-[var(--line)] p-5">
            <p className="island-kicker">Email</p>
            <p className="mt-2 text-lg font-semibold">{session.user.email}</p>
          </div>
          <div className="feature-card rounded-xl border border-[var(--line)] p-5">
            <p className="island-kicker">User ID</p>
            <p className="mt-2 break-all font-mono text-sm">
              {session.user.id}
            </p>
          </div>
          <div className="feature-card rounded-xl border border-[var(--line)] p-5">
            <p className="island-kicker">Session expires</p>
            <p className="mt-2 text-lg font-semibold">
              {new Date(session.session.expiresAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
