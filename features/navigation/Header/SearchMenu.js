import React, { useState } from 'react';
import { XMarkIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { closeSearch } from '../navigationSlice';

const SearchMenu = () => {
  const [searchText, setSearchText] = useState('');
  const { searchOpen } = useSelector((state) => state.nav);
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchText('');
    dispatch(closeSearch());
  };

  return (
    <section
      className={`w-full h-screen fixed z-50 bg-base-dark top-0 left-0 transition-all duration-300 ease-in-out ${
        searchOpen
          ? 'opacity-100 pointer-events-auto scale-100'
          : 'opacity-0 pointer-events-none scale-95'
      }`}
    >
      <div className='w-full h-full px-8 md:px-20 pt-20 flex flex-col'>
        <div
          className={`font-bold font-headline text-4xl text-white mb-8 transition-opacity duration-300 delay-100 ${
            searchOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          What do you want to <span className='text-clemson'>learn today?</span>
        </div>
        <div
          className={`relative transition-opacity duration-300 delay-150 ${
            searchOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <form className='w-full'>
            <input
              type='text'
              placeholder='Start Your Search'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className='mt-0 block w-full px-3 py-3 border-0 rounded bg-zinc-300 focus:ring-0 focus:border-black'
            />
            <div>
              <button onClick={searchHandler} type='submit'>
                <ArrowRightCircleIcon className='h-6 w-6 stroke-zinc-900 absolute right-2 top-3' />
              </button>
            </div>
          </form>
        </div>
      </div>
      <XMarkIcon
        className='w-7 h-7 stroke-zinc-900 absolute right-4 top-6'
        onClick={searchHandler}
      />
    </section>
  );
};

export default SearchMenu;
