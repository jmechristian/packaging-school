import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const TextInput = ({
  label,
  placeholder,
  name,
  type,
  required,
  value,
  validate,
}) => {
  const { register, formState, setValue } = useFormContext();

  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value, name, setValue]);

  return (
    <div className='w-full'>
      <div className='flex justify-between'>
        <label
          htmlFor={name}
          className='block text-sm md:text-base font-greycliff font-semibold leading-6 text-slate-700'
        >
          {label}
        </label>
        <span className='text-sm leading-6 text-red-500' id='email-optional'>
          {required ? 'Required' : ''}
        </span>
      </div>
      <div className='mt-1 md:mt-2 w-full'>
        <input
          type={type ? type : 'text'}
          {...register(`${name}`, {
            required: required ? true : false,
            ...(validate ? { validate } : {}),
          })}
          name={name}
          id={name}
          className='block w-full rounded-md border-0 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm md:text-base sm:leading-6'
          placeholder={placeholder}
          aria-describedby={`${name} + ' ' + ${required}`}
        />
      </div>
      <div className='w-full'>
        {formState.errors.hasOwnProperty(name) && (
          <div className='text-sm text-red-600 mt-1 mb-2'>
            {typeof formState.errors[name]?.message === 'string'
              ? formState.errors[name].message
              : 'Please fill out field.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
