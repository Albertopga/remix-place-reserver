import { Form, useActionData, useTransition } from '@remix-run/react'
import { UserService } from '~/services/user'
import type { Session, TypedResponse } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import type { User } from '@prisma/client'
import { getSession, commitSession } from '../../utils/session'
import { createToken } from '~/utils/jwt'

export async function loader ({ request }:any) {
  const session = await getSession(
    request.headers.get('Cookie')
  ) 

  if (session.has('token')) {
    session.unset('token')
  }

  const data = { error: session.get('error') }

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session)
    }
  })
}

// maneja la accion del formulario
export const action = async ({ request }: any) => {
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')

  const _user = new UserService()
  const user = await _user.getUserByEmail(email) as User | null
  const encodedPassword = btoa(password)

  const loginError = {
    error: !user || user.password !== encodedPassword ? 'User or password invalid' : null
  }

  const hasErrors = Object.values(loginError).some(Boolean)
  const fields = { password }

  if (hasErrors || !user) {
    return badRequest({ loginError, fields })
  }

  const session = await createUserSesion(user)

  if (!session) redirect('/')

  return redirect('/dashboard', { headers: { 'Set-Cookie': await commitSession(session) } })
}

export function ErrorBoundary ({ error }: any) {
  return (
    <div>
      <strong>Algo ha salido mal: {error.message}</strong>
    </div>
  )
}

function badRequest (data: any): TypedResponse<any> {
  return json(data, { status: 400 })
}

async function createUserSesion (user: User): Promise<Session> {
  delete user.password
  const session = await getSession()
  session.set('token', createToken(user))
  return session
}
export default function LoginUser () {
  const { state } = useTransition()
  const acctionData = useActionData()
  const { loginError } = acctionData ?? {}
  const { error } = loginError ?? {}
  const isSubmitting = state === 'submitting'

  return (
    <>
      <h2>Registrar</h2>
      <Form method="POST" disabled={isSubmitting}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" required />
        </div>
        <button type="submit">
          {isSubmitting ? 'Wait for it ...' : 'Register'}
        </button>
        <p>{error && (
          <small style={{ color: 'red' }}>{error}</small>
        )}</p>
      </Form>
    </>
  )
}
