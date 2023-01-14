import { createCookieSessionStorage } from '@remix-run/node' // or cloudflare/deno

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: '__session'
    }
  })

export { getSession, commitSession, destroySession }
