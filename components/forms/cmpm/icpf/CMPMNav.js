import React, { useState } from 'react';
import {
  UserCircleIcon,
  BuildingOfficeIcon,
  TrophyIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const CMPMNav = () => {
  const [isSelected, setIsSelected] = useState('personal');

  const items = [
    {
      id: 'personal',
      icon: UserCircleIcon,
      label: 'Personal',
    },
    {
      id: 'professional',
      icon: BuildingOfficeIcon,
      label: 'Professional',
    },
    {
      id: 'goals',
      icon: TrophyIcon,
      label: 'Goals',
    },
    {
      id: 'session',
      icon: AcademicCapIcon,
      label: 'Session',
    },
  ];

  return (
    <div className='flex flex-col sticky top-0'>
      <div className='w-full grid grid-cols-4 bg-slate-100 shadow-sm overflow-hidden relative'>
        {items.map((item) => (
          <div
            key={item.id}
            className={`border flex gap-1 justify-center items-center col-span-1 border-slate-200 w-full py-3 text-center text-sm md:text-base font-greycliff font-semibold ${
              isSelected === item.id
                ? 'bg-base-mid text-white'
                : 'text-slate-500'
            }`}
          >
            <div className='w-12 h-12 rounded-full hidden lg:flex justify-center items-center'>
              <div>
                <item.icon
                  className={`'w-8 h-8 ${
                    isSelected === item.id
                      ? 'stroke-clemson'
                      : 'stroke-slate-500'
                  }'`}
                />
              </div>
            </div>
            <a href={`#${item.id}`} onClick={() => setIsSelected(item.id)}>
              {item.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMPMNav;
