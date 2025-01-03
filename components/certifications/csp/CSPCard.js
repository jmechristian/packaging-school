import React from 'react';
import { KeyIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { TrophyIcon } from '@heroicons/react/24/outline';
import Image from "next/legacy/image";

const CSPCard = () => {
  return (
    <div className='rounded-2xl bg-base-light/60 dark:bg-dark-mid dark:text-white p-6 lg:p-10 flex flex-col gap-12 shadow-xl'>
      <div className='w-full h-full divide-x divide-y divide-solid border-b border-b-base-brand border-r border-r-base-brand divide-base-brand flex flex-col lg:grid lg:grid-cols-2 mx-auto'>
        <div className='w-full bg-base-brand py-3 col-span-2'>
          <div className='flex items-center px-6 gap-2'>
            <div>
              <TrophyIcon className='w-6 h-6 stroke-white' />
            </div>
            <div className='text-white font-bold text-2xl'>
              <h3>Sustainability Leader</h3>
            </div>
          </div>
        </div>
        <div className='col-span-2 w-full p-6 border-b border-b-base-brand'>
          <div className='text-lg'>
            This 40-hour workshop unlocks the Sustainability Leader achievement,
            empowering companies to cultivate internal heroes mastering the dos
            and don&apos;ts of sustainable packaging, transforming intentions
            into impactful actions.
          </div>
        </div>
        <div className='p-6 flex flex-col w-full'>
          <div className='relative aspect-[1/1] mb-6 lg:mb-0'>
            <div className='w-full h-full absolute inset-0 z-10 lg:px-6 max-w-xl mx-auto'>
              <Image
                src={'https://packschool.s3.amazonaws.com/V2-Patch-2-sm.png'}
                alt='sustainable leader patch'
                width={800}
                height={808}
                layout='responsive'
                className=' shadow-xl'
              />
            </div>
          </div>
          <div className='flex flex-col gap-3 divide-y-2 divide-base-brand'>
            <div className='w-full flex justify-between items-center'>
              <div className='text-sm uppercase'>Challenge Progress</div>
              <div className='text-sm uppercase'>[0/6]</div>
            </div>
            <div className='w-full flex pt-1.5 items-center gap-2'>
              <div className='cursor-pointer'>
                <ArrowRightCircleIcon className='w-6 h-6 fill-black dark:fill-brand-yellow' />
              </div>
              <div>Enroll today to start your journey!</div>
            </div>
          </div>
        </div>
        <div className='p-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
              <div className='w-full flex gap-2 items-center'>
                <div>
                  <KeyIcon className='w-5 h-5 fill-clemson' />
                </div>
                <div className='text-lg font-semibold'>Objective 1</div>
              </div>
              <div className='pl-7'>
                Define the key terminology needed to speak the language of
                sustainability with colleagues and customers
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-full flex gap-2 items-center'>
                <div>
                  <KeyIcon className='w-5 h-5 fill-clemson' />
                </div>
                <div className='text-lg font-semibold'>Objective 2</div>
              </div>
              <div className='pl-7'>
                Construct UN-based sustainability targets and goals
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-full flex gap-2 items-center'>
                <div>
                  <KeyIcon className='w-5 h-5 fill-clemson' />
                </div>
                <div className='text-lg font-semibold'>Objective 3</div>
              </div>
              <div className='pl-7'>
                Develop sustainable system designs (on the material level)
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-full flex gap-2 items-center'>
                <div>
                  <KeyIcon className='w-5 h-5 fill-clemson' />
                </div>
                <div className='text-lg font-semibold'>Objective 4</div>
              </div>
              <div className='pl-7'>
                Measure the carbon footprint of your packaging
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-full flex gap-2 items-center'>
                <div>
                  <KeyIcon className='w-5 h-5 fill-clemson' />
                </div>
                <div className='text-lg font-semibold'>Objective 5</div>
              </div>
              <div className='pl-7'>
                Select relevant offset programs to achieve carbon neutrality at
                a per product/package
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='w-full flex gap-2 items-center'>
                <div>
                  <KeyIcon className='w-5 h-5 fill-clemson' />
                </div>
                <div className='text-lg font-semibold'>Objective 6</div>
              </div>
              <div className='pl-7'>
                Assess your environmental performance criteria through a license
                to cutting-edge sustainability tools (ISO 14040/14044 compliant
                life cycle analysis software) into your concept development and
                material selection steps of packaging design
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSPCard;
