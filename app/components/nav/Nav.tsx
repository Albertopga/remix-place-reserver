import { Link } from '@remix-run/react'
import type { FunctionComponent } from 'react'
import type { NavRoute } from '~/types'

export const Nav: FunctionComponent<{ routes: NavRoute[] }> = ({ routes }) => {
  return (
    <nav>
      {routes.length && (
        <ul>
          {
            routes.map((route: NavRoute, index: number) => {
              return <li key={index}><Link to={ route.to }>{ route.label }</Link></li>
            })
          }
        </ul>
      )}
    </nav>
  )
}
