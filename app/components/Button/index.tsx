import type { FunctionComponent } from 'react'

export const Button: FunctionComponent<{ children: string, color?: string, onclick: React.MouseEventHandler<HTMLButtonElement>}> = ({ children, onclick, color }) => {
  return (
    <button onClick={onclick} className={'p-1 text-serbatic-100 rounded shadow-lg bg-primary focus:ring hover:text-serbatic-900 hover:bg-secondary transition-all active:transform active:translate-y-1'}>{children}</button>
  )
}
