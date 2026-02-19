import React, { useState } from 'react';
import RotatingCaret from '../../../components/RotatingCaret';

const MobileMenuItemWrapper = ({ component, title, dropdown }) => {
  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  return (
    <div className='border-b border-b-slate-400/50'>
      <div className='flex flex-col'>
        <div
          className='flex justify-between px-6 md:px-9 py-4 md:py-6'
          onClick={() => setMobileDropdownOpen(!isMobileDropdownOpen)}
        >
          <div className='font-bold text-xl md:text-3xl'>{title}</div>
          {dropdown && (
            <RotatingCaret
              styling='h-6 w-6 fill-slate-900'
              open={isMobileDropdownOpen}
            />
          )}
        </div>
        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            isMobileDropdownOpen
              ? 'max-h-screen opacity-100'
              : 'max-h-0 opacity-0'
          }`}
          style={{ transformOrigin: 'top' }}
          onClick={() => setMobileDropdownOpen(false)}
        >
          {component}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuItemWrapper;
