import { Form, useActionData, useTransition } from '@remix-run/react'
import { UserService } from '~/services/user'
import { json, redirect } from '@remix-run/node'

const badRequest = (data: any) => {
  return json(data, { status: 400 })
}

// SERVIDOR
export const action = async ({ request }: any) => {
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')
  const password2 = form.get('password2')
  const name = form.get('name')
  const surname = form.get('surname')

  const fieldErrors = {
    name: name.length < 4 ? 'Name must be at least 4 characters' : null,
    surname:
      surname.length < 4 ? 'Surname must be at least 10 characters' : null,
    notEquals:
      password !== password2 ? 'Both password fields must be equals' : null,
    password:
      password.length < 8 ? 'Password must be at least 8 characters' : null,
    password2:
      password.length < 8 ? 'Password must be at least 8 characters' : null
  }

  const hasErrors = Object.values(fieldErrors).some(Boolean)
  const fields = { name, surname, password, password2 }

  if (hasErrors) {
    return badRequest({ fieldErrors, fields })
  }

  const encodedPassword = btoa(password)
  const userData = {
    email,
    password: encodedPassword,
    name,
    surname,
    role_id: 1
  }

  const _user = new UserService()
  await _user.createUser(userData)

  return redirect('/login')
}

export function ErrorBoundary ({ error }: any) {
  return (
    <div>
      <strong>Algo ha salido mal: {error.message}</strong>
    </div>
  )
}

export default function CreateUser () {
  const { state } = useTransition()
  const acctionData = useActionData()
  const { fieldErrors } = acctionData ?? {}
  const {
    name: nameError,
    surname: surnameError,
    notEquals: notEqualsError,
    password: passwordError,
    password2: password2Error
  } = fieldErrors ?? {}
  const isSubmitting = state === 'submitting'

  return (
    <>
      <h2>Registrar</h2>
      <Form method="POST" disabled={isSubmitting}>
        <div>
          <label htmlFor="name">
            Nombre{' '}
            {nameError && <small style={{ color: 'red' }}>{nameError}</small>}
          </label>
          <input type="name" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="surname">
            Apellido{' '}
            {surnameError && (
              <small style={{ color: 'red' }}>{surnameError}</small>
            )}
          </label>
          <input type="surname" id="surname" name="surname" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div>
          <label htmlFor="password">
            {' '}
            Password{' '}
            {passwordError && (
              <small style={{ color: 'red' }}>{passwordError}</small>
            )}
          </label>
          <input id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="password2">
            {' '}
            Repita el password{' '}
            {password2Error && (
              <small style={{ color: 'red' }}>{password2Error}</small>
            )}
            {notEqualsError && (
              <small style={{ color: 'red' }}>{notEqualsError}</small>
            )}
          </label>
          <input id="password2" name="password2" required />
        </div>
        <button type="submit">
          {isSubmitting ? 'Wait for it ...' : 'Register'}
        </button>
      </Form>
    </>
  )
}
