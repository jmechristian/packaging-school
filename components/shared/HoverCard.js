import React from 'react';
import { useRouter } from 'next/router';

const HoverCard = ({ title, subtitle, Icon, href }) => {
  const router = useRouter();

  return (
    <div
      href={href}
      className='w-full p-4 rounded-md border-[1px] border-neutral-300 dark:border-base-dark relative overflow-hidden bg-white dark:bg-base-brand cursor-pointer'
      onClick={() => router.push(href)}
    >
      <div className='absolute inset-0 bg-gradient-to-r from-base-mid to-base-dark' />

      <Icon className='mb-2 w-10 h-10 text-2xl text-white relative z-10' />
      <h2 className='font-bold mt-2 lg:mt-0 leading-snug text-xl md:text-xl text-brand-yellow relative z-10'>
        {title}
      </h2>
      <p className='text-neutral-100 dark:text-white relative z-10 leading-snug mt-1.5'>
        {subtitle}
      </p>
    </div>
  );
};

export default HoverCard;
