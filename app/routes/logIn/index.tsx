import { Form, useActionData, useTransition } from '@remix-run/react'
import { UserService } from '~/services/user'
import type { Session, TypedResponse } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import type { User } from '@prisma/client'
import { getSession, commitSession } from '../../utils/session'
import { createToken } from '~/utils/jwt'
import { Input } from '~/components/FormCoponents/Input/Input'
import { Button } from '~/components/Button'

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
      <section className='border-2 bg-serbatic-900 shadow-2xl rounded-md py-8 p-5 sm:w-1/2 lg:w-1/3 mx-auto text-center'>
        <h2 className='t-h2 text-center w text-white font-semibold'>Login</h2>

        <Form method="POST" disabled={isSubmitting}>

          <Input type="text" id="email" name="email" isRequired={true} placeHolder='Email'/>
          <Input type='password' id="password" name="password" isRequired={true} placeHolder='Password'/>

          <Button type='submit' size='full' >{isSubmitting ? 'Wait for it ...' : 'Acceder'}</Button>
        </Form>
      </section>
    </>
  )
}
