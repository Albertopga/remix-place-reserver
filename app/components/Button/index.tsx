import { btnSize } from "~/types"

export const Button: React.FunctionComponent<{ type: any, children: string, onclick?: React.MouseEventHandler<HTMLButtonElement>, size: btnSize}> = ({ type, children, onclick, size = 'min' }) => {
  return (
    <button type={type} onClick={onclick} className={`p-2 mt-8 text-serbatic-100 w-${size} rounded shadow-lg bg-primary focus:ring hover:text-serbatic-900 hover:bg-secondary transition-all active:transform active:translate-y-1`}>{children}</button>
  )
}
