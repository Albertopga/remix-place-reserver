import type { MetaFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'

import globalStylesls from '~/styles/global.css'
import datepickerStyles from '~/styles/datepicker.css'
import { Nav } from './components/nav/Nav'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export const links = () => ([
  {
    rel: 'stylesheet',
    href: datepickerStyles
  },
  {
    rel: 'stylesheet',
    href: globalStylesls
  },
  {
    rel: 'stylesheet',
    href: 'bootstrap/dist/css/bootstrap.min.css'
  }
])
const routes = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/signup', label: 'Registrarse' }
]
function Layout () {
  return (
    <>
      <header>
        <Nav routes={routes}></Nav>
      </header>
      <Outlet />
      <footer>
        <small>© Reserva tu sitio Serbatic 2023 </small>
      </footer>
    </>

  )
}
export default function App () {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
