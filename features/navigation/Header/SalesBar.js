import React from 'react';

const B_VARIANT_STATIC_TEXT =
  'A Professional Packaging Curriculum Developed at Clemson University, Licensed by SC Commission on Higher Education #5400';

const SalesBar = () => {
  return (
    <div className='bg-slate-900 flex items-center top-10 z-50'>
      <div className='w-full min-h-[36px] py-1 md:py-1.5 max-w-7xl px-3 xl:px-0 mx-auto flex items-center justify-center'>
        <div className='text-clemson text-xs md:text-base text-center leading-none font-medium'>
          {B_VARIANT_STATIC_TEXT}
        </div>
      </div>
    </div>
  );
};

export default SalesBar;
