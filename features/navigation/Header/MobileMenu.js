import React from 'react';
import { useSelector } from 'react-redux';
import MobileMenuContent from '../MobileMenu/MobileMenuContent';

const MobileMenu = () => {
  const { mobileMenuOpen } = useSelector((state) => state.nav);

  return (
    <div
      className={`w-full h-full min-h-screen overflow-auto fixed z-50 bg-slate-200 top-0 left-0 transform transition-transform duration-300 ease-in-out ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='relative'>
        <MobileMenuContent />
      </div>
    </div>
  );
};

export default MobileMenu;
