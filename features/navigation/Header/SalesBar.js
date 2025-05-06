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
import { useSelector } from 'react-redux';

const delay = 7000;

const SalesBar = () => {
  const router = useRouter();
  const { userXp } = useSelector((state) => state.auth);
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
    <div className='bg-slate-900 dark:bg-slate-800 flex items-center sticky top-10 z-50'>
      <div className='w-full h-10 max-w-7xl px-3 xl:px-0 mx-auto lg:grid lg:grid-cols-5'>
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
        <div className='hidden lg:flex lg:justify-end lg:items-center'>
          <div className='bg-slate-700 flex items-center w-fit gap-3'>
            <div className='w-10 h-10 flex items-center justify-center bg-clemson'>
              <div className='text-white text-2xl font-semibold'>
                {userXp.level}
              </div>
            </div>
            <div className='flex items-center gap-1.5 pr-3'>
              <div
                className='w-7 h-7 bg-contain bg-center bg-no-repeat opacity-80 p-2'
                style={{
                  backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/pxp-white.png')`,
                }}
              ></div>
              <div className='text-white/80 font-semibold'>
                {userXp.totalXp}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesBar;
