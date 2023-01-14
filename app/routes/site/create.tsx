/* eslint-disable camelcase */
import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData, useTransition } from '@remix-run/react'
import { OfficeAdminsService, SiteService } from '~/services/index'
import { getSession } from '../../utils/session'
import { decodeToken } from '~/utils/jwt'
import type { SetStateAction } from 'react'
import { useState } from 'react'
import type { Office } from '~/types'

const badRequest = (data: any) => {
  return json(data, { status: 400 })
}
export async function loader ({ request }:any) {
  const session = await getSession(
    request.headers.get('Cookie')
  )
  const res: any = decodeToken(session.get('token'))
  const user = res.data
  const _officeAdmin = new OfficeAdminsService()
  const officesManaged = await _officeAdmin.getManagedOffices(user.id)
  return { officesManaged, user }
}

// maneja la accion del formulario
export const action: ActionFunction = async ({ request }:any) => {
  
  const formData = await request.formData()

  const office_id = formData.get('_officeId')
  const screen = !!formData.get('screen')
  const support_screen = !!formData.get('screenSupport')
  const support_pc = !!formData.get('pcSupport')

  const payload = {
    screen,
    support_pc,
    support_screen,
    occupied: false,
    office_id
  }

  const _siteService = new SiteService()
  let path = '/site'
  await _siteService.createSite(payload)
  setTimeout(() => {
    // TODO incluir modal para confirmar si se desea crear mas sitios y redifirgir
    if (confirm('¿Deseas seguir añadiendo sitios?')) {
      path = ''
    }
    return redirect(path)
  }, 10000)
}

export function ErrorBoundary ({ error }:any) {
  return (
    <div>
      <strong>Algo ha salido mal: { error.message }</strong>
    </div>
  )
}

export default function CreateSite () {
  const { officesManaged } = useLoaderData()
  const [office, setOffice] = useState<Office>()
  const [screen, setScreen] = useState(true)
  const [support, setSupport] = useState(false)
  const [supportPc, setSupportPc] = useState(true)

  function handleCityChange (e: { target: { value: SetStateAction<string> } }) {
    const selectedOffice = officesManaged.find((office: any) => office.city === e.target.value)
    setOffice(selectedOffice)
  }

  const handleScreen = () => setScreen(!screen)
  const handleSupport = () => setSupport(!support)
  const handleSupportPc = () => setSupportPc(!supportPc)

  return (
    <>
      <h2>Crear sitio para la oficina de {office?.city}</h2>
      <Form method='post'>
        <div>
          <label htmlFor="office">Selecciona una oficina:</label>
          <select onChange={ handleCityChange } name="office" id="office" multiple>
            { officesManaged.map((office: any) => {
              return <option value={office.city} key={office.id}>{office.city}</option>
            })
            }
          </select>
        </div>
        { office && (
          <div>
            <h3>Selecciona las características que tiene el puesto</h3>
            <input
              type="checkbox"
              name="screen"
              id="screen"
              value='true'
              checked={screen}
              onChange={handleScreen}
            /> Pantalla
            <input
              type="checkbox"
              name="screenSupport"
              id="screenSupport"
              value='true'
              checked={support}
              onChange={handleSupport}
            /> Soporte de pantalla
            <input
              type="checkbox"
              name="pcSupport"
              id="pcSupport"
              value='true'
              checked={supportPc}
              onChange={handleSupportPc}
            /> Soporte de pc
            <div>
              <input type="hidden" name='_officeId' value={office.id}/>
              <button type="submit">Crear puesto</button>
            </div>
          </div>
        )}
      </Form>
    </>
  )
}
