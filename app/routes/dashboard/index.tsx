import { redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
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

  return (
    <>
      <h1>Dashboard</h1>
      <p>Hola {user.name}, tu rol es: {(user.role).toLowerCase()}</p>
      <nav>
        {
          user.role === 'ADMIN'
            ? (adminMenu())
            : (userMenu())
        }

      </nav>
    </>
  )
}

const adminMenu = () => (
  <ul>
    <li>
      <Link to='/site/create'>
        Crear sitio
      </Link>
    </li>
    <li>
      <Link to='/site'>
        Reservar sitio
      </Link>
    </li>
  </ul>
)
const userMenu = () => (
  <ul>
    <li>
      <Link to=''>
        Reservar sitio
      </Link>
    </li>
  </ul>
)
