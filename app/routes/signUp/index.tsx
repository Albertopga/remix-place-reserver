import { Form, useActionData, useTransition } from '@remix-run/react'
import { UserService } from '~/services/user'
import { json, redirect } from '@remix-run/node'
import { Label } from '~/components/FormCoponents/Label/Label'
import { Input } from '~/components/FormCoponents/Input/Input'
import { Button } from '~/components/Button'

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
    <section className='border-2 bg-serbatic-900 shadow-2xl rounded-md py-8 p-5 sm:w-1/2 lg:w-1/3 mx-auto text-center'>
      <h2 className='t-h2 text-center w text-white font-semibold'>Registrarse</h2>

      <Form method="POST" disabled={isSubmitting}>

        <Input type="text" id="name" name="name" isRequired={true} error={nameError} placeHolder='Nombre' />
        <Input type="text" id="surname" name="surname" isRequired={true} error={surnameError} placeHolder='Apellido' />
        <Input type="text" id="email" name="email" isRequired={true} placeHolder='Email'/>
        <Input type='password' id="password" name="password" isRequired={true} error={passwordError} placeHolder='Password'/>
        <Input type='password' id="password" name="password2" isRequired={true} error={password2Error || notEqualsError}
          placeHolder='Repita la password'/>

        <Button type='submit' size='full' >{isSubmitting ? 'Wait for it ...' : 'Dar de alta'}</Button>
      </Form>
    </section>
  )
}
