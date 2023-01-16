import { redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { NavRoute } from '~/types'
import { decodeToken } from '~/utils/jwt'
import { getSession } from '../../utils/session'

export const loader = async ({ request }: any) => {
  const session = await getSession(
    request.headers.get('Cookie')
  )
  const token: any = decodeToken(session.get('token'))

  if (token.message === 'ERROR: jwt expired') {
    session.unset('token')
    redirect('/login')
  }
  const user = token.data

  return { user }
}

// export async function action ({ request }: any) {
// }

export function ErrorBoundary (error: any) {
  return (
    <div>
      <strong>Algo ha salido mal: {error}</strong>
    </div>
  )
}

export default function Dashboard () {
  const { user } = useLoaderData()
  const routes: NavRoute[] = [{ to: '/site', label: 'Reservar ' }]

  if (user.role === 'ADMIN') routes.push({ to: '/site/create', label: 'Crear sitio ' })

  return (
    <section className='mx-auto text-center'>
      <h2 className='t-h2 mb-3'> Hola {user.name}, tu rol es: {(user.role).toLowerCase()}</h2>
      <p>¿Qué deseas hacer?</p>
      <nav className='mt-2'>
        {routes.map((route: NavRoute, index: number) => {
          return (
            <Link
              className='px-4 py-2 uppercase font-medium hover:bg-serbatic-300'
              key={ index }
              to={ route.to }
            >
              { route.label }
            </Link>)
        })}
      </nav>
    </section>
  )
}
