import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BoltIcon,
  AcademicCapIcon,
  FireIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { getSalesBarItems } from '../../../helpers/api';
import { API } from 'aws-amplify';
import { listSalesBars } from '../../../src/graphql/queries';
import SalesBarItem from './SalesBarItem';

const delay = 7000;

const SalesBar = () => {
  const router = useRouter();

  const timeoutRef = React.useRef(null);

  const [items, setItems] = useState([]);
  const [isActive, setIsActive] = useState(0);
  const [number, setNumber] = useState(0);

  const getItems = async () => {
    const items = await API.graphql({ query: listSalesBars });
    setItems(items.data.listSalesBars.items);
  };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIsActive((prevIndex) =>
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [isActive]);

  return (
    // <div className='bg-gray-900 dark:bg-dark-dark flex items-center justify-center lg:grid lg:grid-cols-2'>
    //   <div className='flex min-h-10 max-w-7xl items-center justify-between w-full px-3 xl:px-0 py-3'>
    //     <div
    //       className='flex justify-center items-center lg:flex-none cursor-pointer w-full'
    //       onClick={() =>
    //         router.push('/certificate-of-mastery-in-packaging-management')
    //       }
    //     >
    //       <div className='flex gap-2 items-center font-greycliff'>
    //         <div>
    //           <BoltIcon className='w-5 h-5 fill-brand-yellow' />
    //         </div>
    //         <div className='text-neutral-200 text-sm md:text-base leading-[1.2] max-w-[70%] lg:max-w-full'>
    //           Deadline Alert! CMPM registration for Winter ends Nov. 24
    //         </div>
    //       </div>
    //     </div>
    //     <div className='flex gap-1 items-center w-fit'>
    //       <div>
    //         <ChevronLeftIcon className='w-5 h-5 fill-neutral-400' />
    //       </div>
    //       <div className='text-neutral-400 text-sm'> 1/2</div>
    //       <div>
    //         <ChevronRightIcon className='w-5 h-5 fill-neutral-400' />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    (<div className='bg-gray-900 dark:bg-dark-dark flex items-center justify-center'>
      <div className='w-full h-16 lg:h-12 max-w-7xl px-3 xl:px-0 mx-auto lg:grid lg:grid-cols-5'>
        <div className='w-full flex gap-2 cursor-pointer h-full items-center lg:col-span-4'>
          <div className='w-fit flex h-full items-center'>
            <div className='flex gap-1 items-center w-fit h-full'>
              <div
                className='cursor-pointer'
                onClick={() =>
                  setIsActive(isActive === 0 ? items.length - 1 : isActive - 1)
                }
              >
                <ChevronLeftIcon className='w-5 h-5 fill-neutral-400' />
              </div>
              <div className='text-neutral-400 text-sm'>
                {items.length > 0 && isActive + 1 + '/' + items.length}
              </div>
              <div
                className='cursor-pointer'
                onClick={() =>
                  setIsActive(isActive + 1 >= items.length ? 0 : isActive + 1)
                }
              >
                <ChevronRightIcon className='w-5 h-5 fill-neutral-400' />
              </div>
            </div>
          </div>
          <div className={`w-full h-full flex items-center`}>
            {items.length > 0 ? (
              <SalesBarItem
                text={items.length > 0 && items[isActive].text}
                link={items.length > 0 && items[isActive].link}
                icon={items.length > 0 && items[isActive].type}
              />
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
        <div className='hidden lg:flex lg:justify-end lg: items-center'>
          <a
            href='https://learn.packagingschool.com'
            target='_blank'
            rel='noreferrer'
            className='text-clemson font-semibold text-sm'
          >
            My Learning Dashboard
          </a>
        </div>
      </div>
    </div>)
  );
};

export default SalesBar;
