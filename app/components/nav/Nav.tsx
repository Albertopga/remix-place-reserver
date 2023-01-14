import { Link } from '@remix-run/react'
import type { FunctionComponent } from 'react'
import type { NavRoute } from '~/types'

export const Nav: FunctionComponent<{ routes: NavRoute[] }> = ({ routes }) => {
  return (
    <>
      <nav className='flex flex-row-reverse bg-white'>
        {routes.length && (
          routes.map((route: NavRoute, index: number) => {
            return <Link className='px-4 py-2 text-black uppercase font-medium' key={ index } to={ route.to }>{ route.label }</Link>
          })
        )}
      </nav>
    </>
  )
}
