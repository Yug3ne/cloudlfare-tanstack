import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { authClient } from '#/lib/auth-client'
import { getSession } from '#/lib/auth-server'

export const Route = createFileRoute('/signin')({
  beforeLoad: async () => {
    const session = await getSession()
    if (session) {
      // Already signed in — send them to the dashboard.
      throw redirect({ to: '/dashboard' })
    }
  },
  component: SigninPage,
})

function SigninPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    })

    setLoading(false)

    if (signInError) {
      setError(signInError.message ?? 'Invalid email or password.')
      return
    }

    navigate({ to: '/dashboard' })
  }

  return (
    <div className="page-wrap rise-in flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="island-shell w-full max-w-md rounded-2xl p-8">
        <p className="island-kicker">Welcome back</p>
        <h1 className="display-title mt-2 text-3xl font-semibold">
          Sign in to your account
        </h1>
        <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">
          Enter your email and password to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-lg border border-[var(--line)] bg-white/70 px-3 py-2 text-sm outline-none focus:border-[var(--lagoon-deep)]"
              placeholder="ada@example.com"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Password
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-lg border border-[var(--line)] bg-white/70 px-3 py-2 text-sm outline-none focus:border-[var(--lagoon-deep)]"
              placeholder="Your password"
            />
          </label>

          {error ? (
            <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-[var(--lagoon-deep)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#246f76] disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--sea-ink-soft)]">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
