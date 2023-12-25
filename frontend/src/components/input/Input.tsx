/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from '../../shared/classNames';
import { useState } from 'react';
import './Input.css'

export const Input = (props: FormFieldProps<UseFormRegisterReturn>) => {
  const { labelText, fieldRegister, error, min, max, type, placeholder, ...restProps } = props;

  const [inputType, setType] = useState(type)
  const toggleType = () => {
    inputType === 'password' ? setType('text') : setType('password')
  }

  return (
    <div className="flex flex-col mb-4">
      <label className="text-left font-semibold mb-1 text-green-900">{labelText}</label>
      <div className='relative'>
        <input
          className={cn(`w-full rounded-lg h-8 py-6 px-4 border-2 border-green-700 bg-white outline-none focus:shadow-lg focus:border-[3px]`, error && 'border-red-500')}
          type={inputType || 'text'}
          min={min}
          max={max}
          placeholder={placeholder}
          {...restProps}
          {...fieldRegister}
        />
        {type === 'password' && <span
          className="absolute top-1/2 right-3 -translate-y-1/2 fill-light-100 cursor-pointer"
          onClick={toggleType}
        >
          {inputType === 'password' ? <img src='/Eye-outlineIcon.svg' alt='' /> : <img src='/EyeOffOutlineIcon.svg' alt='' />}
        </span>}
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
