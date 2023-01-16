import React from 'react'
import isEmail from 'validator/lib/isEmail'

export const Input: React.FunctionComponent<{type?: string, id: string, name: string, placeHolder?: string, isRequired?: boolean, minLength?: number, maxLength?: number, error?: string}> = ({ type = 'text', id, name, placeHolder, isRequired, minLength, maxLength, error }) => {
  const styleClass = 'text-white font-medium placeholder:font-normal placeholder:text-slate-200 bg-gray-400 rounded px-2 max-w-sm py-1 w-full lg:w-full lg:mx-auto'

  return (
    <div className='my-3 text-center'>
      {isRequired
        ? <input className = {styleClass}
          type={type} id={id} name={name} placeholder={placeHolder} maxLength={maxLength} minLength={minLength} required/>
        : <input className = {styleClass}
          type={type} id={id} name={name} placeholder={placeHolder} maxLength={maxLength} minLength={minLength} />
      }
      {error && <small className="text-red-600">{error}</small>}

    </div>
  )
}
