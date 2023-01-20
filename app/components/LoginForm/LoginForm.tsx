import { Form } from '@remix-run/react'
import type { FunctionComponent } from 'react'

import { Button } from '../Button'
import { Input } from '../FormCoponents/Input/Input'

export const LoginForm: FunctionComponent<{error: string | undefined, headText: string, buttonText: string}> = ({ error, headText, buttonText }) => {
  return (
    <>
      <section className='border-2 bg-serbatic-900 shadow-2xl rounded-md py-8 p-5 sm:w-1/2 lg:w-1/3 mx-auto text-center'>
        <h2 className='t-h2 text-center w text-white font-semibold'>{headText}</h2>

        <Form method="post">

          <Input type="text" id="email" name="email" isRequired={true} placeHolder='Email'/>
          <Input type='password' id="password" name="password" isRequired={true} placeHolder='Password'/>

          <Button type='submit' size='full' >{buttonText}</Button>
        </Form>
      </section>
      { error
        ? (<div className='mt-4 text-center'>
            <strong className='text-red-600'>{error}</strong>
          </div>
          )
        : ''
      }
    </>
  )
}
