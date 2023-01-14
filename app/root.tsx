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
import { Nav } from './components/Nav/Nav'
import styles from './styles/app.css'
import { Logo } from './components/icons/Logo'


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
  },
  {
    rel: 'preconecct',
    href: 'https://fonts.googleapis.com'
  },
  {
    rel: 'preconnect',
    href: '"https://fonts.gstatic.com'
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
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
        <Nav routes={routes}></Nav>
      </header>
      <section className='bg-slate-300 px-5 py-10'>
        <Outlet />
      </section>
      <footer className='h-1/6 w-full bg-serbatic-900 text-serbatic-100 px-5 py-10 '>
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
