import React, { InputHTMLAttributes, ReactNode } from 'react'
import { TextInput } from '@tremor/react'

type InputProps = {
  icon?:ReactNode
  label?:string 
  errorMessage?:string 
  error?:boolean
  disabled?:boolean
  className?:string
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({icon,label,errorMessage,error,disabled,className='',...props}:InputProps) => {
  return (
    <div className=''>
      {icon}
      {label && <label htmlFor={props?.id || props?.name}>
          {label}
      </label>}
      <input disabled={disabled} className={`border  p-2 ${className}`} {...props} />
      {error && <span>{errorMessage}</span>}
    </div>
  )
}

export default Input