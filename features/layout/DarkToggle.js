import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from './layoutSlice';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const DarkToggle = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.layout);
  return (
    <div className={`${darkMode ? 'dark' : ''} fixed z-50 right-5 bottom-5`}>
      <div
        className='bg-gray-300 dark:bg-dark rounded-full w-12 h-12 flex justify-center items-center shadow-xl'
        onClick={() => {
          darkMode ? dispatch(setLight()) : dispatch(setDark());
        }}
      >
        {darkMode ? (
          <MoonIcon className='w-8 h-8 stroke-white' />
        ) : (
          <SunIcon className='w-8 h-8 stroke-dark' />
        )}
      </div>
    </div>
  );
};

export default DarkToggle;
