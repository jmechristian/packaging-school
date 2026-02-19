import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/legacy/image';
import { useDispatch, useSelector } from 'react-redux';
import { showSearch, showMobileMenu } from '../navigationSlice';
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const MobileNavigation = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.layout);
  const [showMenu, setShowMenu] = useState(false);
  const mobileMenuRef = useRef();

  useEffect(() => {
    const handleScroll = () => setShowMenu(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={mobileMenuRef}
      className={`w-full fixed top-0 left-0 right-0 block lg:hidden z-40 transition-shadow duration-200 ${
        darkMode ? 'bg-slate-900' : 'bg-white'
      } ${showMenu ? 'shadow-md' : ''}`}
    >
      <section className='h-20 w-full container__inner'>
        <div className='w-full h-full flex justify-between items-center'>
          <div className='w-40'>
            {darkMode ? (
              <Image
                src='https://res.cloudinary.com/dno7xxmmy/image/upload/v1664295580/pschool/logo_white_krqpbc.svg'
                alt='Packaging School'
                layout='responsive'
                width={1163}
                height={267}
              />
            ) : (
              <Image
                src='https://res.cloudinary.com/dno7xxmmy/image/upload/v1664295580/pschool/logo_dark_craqzu.svg'
                alt='Packaging School'
                layout='responsive'
                width={1163}
                height={267}
              />
            )}
          </div>
          <div className='flex gap-3'>
            <MagnifyingGlassIcon
              className='w-6 h-6 stroke-slate-900 stroke-2 dark:stroke-white cursor-pointer'
              onClick={() => dispatch(showSearch())}
            />
            <EllipsisVerticalIcon
              className='w-6 h-6 stroke-slate-900 stroke-2 dark:stroke-white cursor-pointer'
              onClick={() => dispatch(showMobileMenu())}
            />
          </div>
        </div>
      </section>
    </header>
  );
};

export default MobileNavigation;
