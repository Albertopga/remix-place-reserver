import { Form, useLoaderData, useSubmit } from '@remix-run/react'
import type { SetStateAction } from 'react'
import { OfficeService } from '~/services'
import type { User } from '~/types'
import { decodeToken } from '~/utils/jwt'
import { getSession } from '../../utils/session'

export const loader = async ({ request }: any) => {
  const session = await getSession(
    request.headers.get('Cookie')
  )
  const res: any = decodeToken(session.get('token'))
  const user: User = res.data
  const _officeService = new OfficeService()
  const offices = await _officeService.getOffices()
  return { offices, user }
}

export default function Site () {
  const { offices } = useLoaderData()
  const submit = useSubmit()

  function handleCityChange (e: { target: { value: SetStateAction<string> } }) {
    const selectedOffice = offices.find((office: any) => office.city === e.target.value)
    submit(null, { method: 'post', action: `site/${selectedOffice.id}` })
  }

  return (
    <>
      <h1>Reservar sitio en la oficina</h1>
      <Form method='post'>
        {offices && (<div>
          <label htmlFor="office">Selecciona una oficina:</label>
          <select onChange={ handleCityChange } name="office" id="office" multiple>
            { offices.map((office: any) => <option value={office.city} key={office.id}>{office.city}</option>) }
          </select>
        </div>)}
      </Form>
    </>
  )
}
