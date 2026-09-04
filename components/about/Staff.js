import React from 'react';
import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';

const Staff = ({ staff }) => {
  if (!staff || staff.length === 0) return null;

  const sorted = [...staff].sort((a, b) =>
    (a.fullName || '').localeCompare(b.fullName || ''),
  );

  return (
    <div className='bg-slate-900 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold font-greycliff text-white sm:text-4xl'>
            Our team
          </h2>
        </div>
        <ul
          role='list'
          className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3'
        >
          {sorted.map((person) => (
            <li key={person.id || person.fullName}>
              <div className='relative aspect-[14/13] w-full overflow-hidden rounded-2xl'>
                <Image
                  src={
                    person.image ||
                    'https://packschool.s3.amazonaws.com/avatar_default.jpeg'
                  }
                  alt={person.fullName || 'Team member'}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                  className='object-cover'
                  loading='lazy'
                />
              </div>
              <h3 className='mt-6 text-lg font-semibold leading-8 tracking-tight text-white font-greycliff'>
                {person.fullName}
              </h3>
              <p className='text-base leading-7 text-slate-500'>
                {person.title}
              </p>
              {person.linkedIn && (
                <SocialIcon
                  url={person.linkedIn}
                  className='mt-1'
                  style={{ width: 24, height: 24 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Staff;
