import { Link } from '@remix-run/react'
import { FunctionComponent, useState } from 'react'
import type { NavRoute } from '~/types'

export const Nav: FunctionComponent<{ routes: NavRoute[] }> = ({ routes }) => {
  const [hidden, setHidden] = useState(true)
  // const [hiddenClass, setHiddenClass] = useState('hidden')

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setHidden(!hidden)
  }

  const parseHiddenClass = () => {
    return hidden ? 'hidden' : ''
  }
  return (
    <>
      <div className="my-3" onClick={handleClick}>
        <div className={`w-7 h-1 bg-primary my-1 mx-0 transition-all ${!hidden ? 'rotate-45 translate-x-1 translate-y-2' : ''}`}></div>
        <div className={`w-7 h-1 bg-primary my-1 mx-0 transition-all ${!hidden ? 'opacity-0' : ''}`}></div>
        <div className={`w-7 h-1 bg-primary my-1 mx-0 transition-all ${!hidden ? '-rotate-45 translate-x-1 -translate-y-2' : ''}`}></div>
      </div>

      <nav className={`flex flex-col bg-white d ${parseHiddenClass()} z-50 relative`}>
        {routes.length && (
          routes.map((route: NavRoute, index: number) => {
            return <Link className='px-4 py-2 text-black uppercase font-medium' key={ index } to={ route.to }>{ route.label }</Link>
          })
        )}
      </nav>
    </>
  )
}
