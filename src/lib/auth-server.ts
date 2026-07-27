import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

import { getDb } from '#/db'
import { createAuth } from '#/lib/auth'

/**
 * Returns the current better-auth session (or null) by reading the cookies
 * of the incoming request. Use in route `beforeLoad`/`loader` to guard pages.
 */
export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await createAuth(getDb()).api.getSession({
      headers: getRequestHeaders(),
    })
    return session
  },
)
