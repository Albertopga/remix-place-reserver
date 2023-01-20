import { useActionData, useTransition } from '@remix-run/react'
import { UserService } from '~/services/user'
import type { Session } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'

import { getSession, commitSession } from '../../utils/session'
import { createToken } from '~/utils/jwt'
import type { User } from '~/types'
import { errorMessage } from '~/utils/errors'
import { getFormDataValues } from '~/utils/form'
import { LoginForm } from '~/components/LoginForm/LoginForm'

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

export const action = async ({ request }: any) => {
  const valuesToRecover = ['email', 'password']
  const { email, password } = await getFormDataValues(request, valuesToRecover)

  const _user = new UserService()
  const user = await _user.getUserByEmail(email) as User | null
  const encodedPassword = btoa(password)
  const loginError = {
    error: !user || user.password !== encodedPassword ? errorMessage.login : null
  }

  const hasErrors = Object.values(loginError).some(Boolean)

  if (hasErrors || !user) return errorMessage.login

  const session = await createUserSesion(user)

  if (!session) return errorMessage.session

  return redirect('/dashboard', { headers: { 'Set-Cookie': await commitSession(session) } })
}

async function createUserSesion (user: User): Promise<Session> {
  delete user.password
  const session = await getSession()
  session.set('token', createToken(user))
  return session
}
export default function LoginUser () {
  return (
    <>
      <LoginForm error={useActionData()} headText='Login' buttonText='Acceder' />
    </>
  )
}
