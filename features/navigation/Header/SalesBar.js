import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BoltIcon,
  AcademicCapIcon,
  FireIcon,
  LightBulbIcon,
  BookmarkIcon,
  PhoneIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { getSalesBarItems } from '../../../helpers/api';
import { API } from 'aws-amplify';
import SalesBarItem from './SalesBarItem';
import { useSelector } from 'react-redux';
import { getVariantFromDocumentCookie } from '../../../libs/abVariant';

const listSalesBars = /* GraphQL */ `
  query ListSalesBars {
    listSalesBars {
      items {
        id
        text
        link
        type
      }
    }
  }
`;

const delay = 7000;
const B_VARIANT_STATIC_TEXT =
  'A Professional Packaging Curriculum Developed at Clemson University, Licensed by SC Commission on Higher Education #5400';

const styles = `
  @keyframes slideUp {
    0% {
      opacity: 0;
      transform: translateY(1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SalesBar = ({ user }) => {
  const router = useRouter();
  const { userXp } = useSelector((state) => state.auth);
  const { salesbarText } = useSelector((state) => state.layout);
  const timeoutRef = React.useRef(null);

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const [items, setItems] = useState([]);
  const [isActive, setIsActive] = useState(0);
  const [number, setNumber] = useState(0);
  const [variant, setVariant] = useState(null);

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
    setVariant(getVariantFromDocumentCookie());
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
  }, [isActive, items.length]);

  const setIcon = (icon) => {
    switch (icon) {
      case 'ARTICLE':
        return <BookmarkIcon className='w-4 h-4 fill-amber-400' />;
      case 'COURSE':
        return <AcademicCapIcon className='w-4 h-4 fill-amber-400' />;
      case 'NEWS':
        return <BoltIcon className='w-4 h-4 fill-amber-400' />;
      default:
        return <BoltIcon className='w-4 h-4 fill-amber-400' />;
    }
  };

  if (variant === 'B') {
    return (
      <div className='bg-slate-900 flex items-center top-10 z-50'>
        <div className='w-full min-h-[36px] py-1 md:py-1.5 max-w-7xl px-3 xl:px-0 mx-auto flex items-center justify-center'>
          <div className='text-clemson text-xs md:text-base text-center leading-none font-medium'>
            {B_VARIANT_STATIC_TEXT}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-slate-900 flex items-center top-10 z-50'>
      <div className='w-full h-[36px] max-w-7xl px-3 xl:px-0 mx-auto flex items-center justify-between'>
        <div className='w-full flex gap-2 h-full items-center'>
          <div className='w-fit flex h-full items-center cursor-pointer '>
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
          <div className={`w-fit h-full flex items-center cursor-pointer`}>
            {items.length > 0 ? (
              items.length > 1 ? (
                <SalesBarItem
                  text={items.length > 0 && items[isActive].text}
                  link={items.length > 0 && items[isActive].link}
                  icon={items.length > 0 && items[isActive].type}
                />
              ) : (
                <div
                  className='flex items-center gap-2 lg:gap-1'
                  onClick={() => {
                    router.push(items[0].link);
                  }}
                >
                  <div>{setIcon(items[0].type)}</div>
                  <div className='text-white/70 text-xs md:!text-sm leading-none'>
                    {items[0].text}
                  </div>
                </div>
              )
            ) : (
              <div>Loading</div>
            )}
          </div>
        </div>
        <div
          className='hidden lg:flex items-center gap-1.5 cursor-pointer'
          onClick={() => {
            window.open(
              'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
              '_blank'
            );
          }}
        >
          <div>
            <PhoneIcon className='w-4 h-4 fill-clemson' />
          </div>
          <div className='text-sm text-white/70 font-medium whitespace-nowrap hover:text-white transition-all duration-300 relative overflow-hidden'>
            <div
              key={salesbarText}
              className='animate-slide-up opacity-0 transform translate-y-4'
              style={{
                animation: 'slideUp 0.5s ease-out forwards',
              }}
            >
              {salesbarText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesBar;
