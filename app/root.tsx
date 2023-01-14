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
import styles from './styles/app.css'
import { Logo } from './components/icons/Logo'
import { Button } from './components/Button'

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
    href: styles
  }
])
const routes = [
  { to: '/', label: 'Home' },
  { to: '/login', label: 'Login' },
  { to: '/signup', label: 'Registrarse' }
]
function Layout () {
  return (
    <div className='gri grid-rows-3 h-screen'>
      <header className='m-5 h-min'>
        <Logo color={'#009ade'}/>
        <div >
          <Nav routes={routes}></Nav>
        </div>
      </header>
      <section className='h-full bg-slate-300 px-5 py-10'>
        <Outlet />
      </section>
      <footer className='fixed bottom-0 h-1/6 w-full bg-serbatic-900 text-serbatic-100 px-5 py-10 '>
        <small>© Reserva tu sitio Serbatic 2023 </small>
      </footer>
    </div>

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
