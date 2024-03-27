/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  className: string
  autoComplete?: string
}

export default function Input({
  type,
  errorMessage,
  placeholder,
  name,
  register,
  rules,
  autoComplete,
  className
}: Props) {
  return (
    <div className={className}>
      <input
        className='p-3 w-full outline-none border border-gray-300
               focus:border-gray-500 rounded-sm forcus:shadow-sm'
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
