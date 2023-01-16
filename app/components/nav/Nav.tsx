import { Link } from '@remix-run/react'
import { FunctionComponent, useState } from 'react'
import type { NavRoute } from '~/types'

export const Nav: FunctionComponent<{ routes: NavRoute[] }> = ({ routes }) => {
  const [hidden, setHidden] = useState(true)
  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setHidden(!hidden)
  }

  const parseHiddenClass = () => {
    return hidden ? 'hidden' : ''
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col relative'>
        <div className="my-3" onClick={handleClick}>
          <div className={`w-7 h-1 bg-primary my-1 mx-0 transition-all ${!hidden ? 'rotate-45 translate-x-1 translate-y-2' : ''}`}></div>
          <div className={`w-7 h-1 bg-primary my-1 mx-0 transition-all ${!hidden ? 'opacity-0' : ''}`}></div>
          <div className={`w-7 h-1 bg-primary my-1 mx-0 transition-all ${!hidden ? '-rotate-45 translate-x-1 -translate-y-2' : ''}`}></div>
        </div>
      </div>

      <nav onClick={handleClick} className={`flex flex-col z-50 absolute top-16 bg-primary text-white text-center rounded max-w-sm ${parseHiddenClass()} `}>
        {routes.length && (
          routes.map((route: NavRoute, index: number) => {
            return (
              <Link
                className='px-4 py-2 uppercase font-medium hover:bg-serbatic-300'
                key={ index }
                to={ route.to }
              >
                { route.label }
              </Link>)
          })
        )}
      </nav>
    </div>
  )
}
