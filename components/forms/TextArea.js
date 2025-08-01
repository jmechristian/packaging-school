import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const TextArea = ({ label, name, required, value, placeholder }) => {
  const { register, formState, setValue } = useFormContext();
  useEffect(() => {
    if (value) {
      setValue(name, value);
    }
  }, [value]);

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <label
          htmlFor={name}
          className='block font-greycliff font-semibold leading-5 text-slate-700 max-w-[75%] text-sm md:text-base'
        >
          {label}
        </label>
        <span className='text-sm leading-6 text-red-500' id='email-optional'>
          {required ? 'Required' : ''}
        </span>
      </div>
      <div className='mt-2 md:mt-2'>
        <textarea
          {...register(`${name}`, { required: required ? true : false })}
          name={name}
          rows={3}
          id={name}
          className='block w-full rounded-md border-0 py-1.5 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-gray-400 text-sm md:text-base focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6'
          aria-describedby={`${name} + ' ' + ${required}`}
          placeholder={placeholder}
        />
      </div>
      {formState.errors.hasOwnProperty(name) && (
        <div className='text-sm text-red-600 mt-1 mb-2'>
          Please fill out field.
        </div>
      )}
    </div>
  );
};

export default TextArea;
