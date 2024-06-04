import { useState, useEffect } from 'react';
import { PlayIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { API } from 'aws-amplify';
import { listTestimonials } from '../../src/graphql/queries';

const ScrollingTestimonials = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTestimonials, setIsTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const res = await API.graphql({ query: listTestimonials });
      if (res.data) {
        setIsTestimonials(() =>
          res.data.listTestimonials.items.filter(
            (test) =>
              test.tags.includes('CMPM') ||
              test.tags.includes('CPS') ||
              test.tags.includes('APC')
          )
        );
      }
    };

    getTestimonials();
  }, []);

  return (
    <div className='bg-white relative'>
      <div className='px-4 pt-4 overflow-x-hidden relative'>
        <div className='flex items-center mb-4'>
          <TestimonialList
            list={isTestimonials.slice(0, 3)}
            duration={125}
            fn={() => setIsOpen(true)}
            setSelected={(val) => setIsSelectedVid(val)}
          />
          <TestimonialList
            list={isTestimonials.slice(0, 3)}
            duration={125}
            fn={() => setIsOpen(true)}
            setSelected={(val) => setIsSelectedVid(val)}
          />
          <TestimonialList
            list={isTestimonials.slice(0, 3)}
            duration={125}
            fn={() => setIsOpen(true)}
            setSelected={(val) => setIsSelectedVid(val)}
          />
        </div>
        <div className='flex items-center mb-2'>
          <TestimonialList
            list={isTestimonials.slice(5, 9)}
            duration={75}
            reverse
            fn={() => setIsOpen(true)}
            setSelected={(val) => setIsSelectedVid(val)}
          />
          <TestimonialList
            list={isTestimonials.slice(5, 9)}
            duration={75}
            reverse
            fn={() => setIsOpen(true)}
            setSelected={(val) => setIsSelectedVid(val)}
          />
          <TestimonialList
            list={isTestimonials.slice(5, 9)}
            duration={75}
            reverse
            fn={() => setIsOpen(true)}
            setSelected={(val) => setIsSelectedVid(val)}
          />
        </div>
      </div>
    </div>
  );
};

const TestimonialList = ({
  list,
  reverse = false,
  duration = 50,
  fn,
  setSelected,
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      className='flex gap-4 px-2'
    >
      {list.map((t) => {
        return (
          <div
            key={t.id}
            className='shrink-0 w-[500px] h-[265px] flex flex-col overflow-hidden group items-start relative border-2 border-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0px_rgba(0,0,0,0.20)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.20)]'
          >
            <div className='absolute right-2 top-2 z-20'>
              {t.tags.includes('CMPM') ? (
                <div className='border border-black p-1 text-xs uppercase'>
                  CMPM
                </div>
              ) : t.tags.includes('CPS') ? (
                <div className='border border-black p-1 text-xs uppercase'>
                  CPS
                </div>
              ) : t.tags.includes('APC') ? (
                <div className='border border-black p-1 text-xs uppercase'>
                  apc
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className='flex items-start gap-3 px-4 w-fit py-4'>
              <div className='h-full'>
                <div
                  className='aspect-[1/1] rounded-full bg-indigo-400 w-9 mx-auto bg-cover bg-center border-2 border-black'
                  style={{ backgroundImage: `url(${t.headshot})` }}
                ></div>
              </div>
              <div className='flex w-full'>
                <div className='flex flex-col justify-center h-full'>
                  <span className='block font-semibold leading-tight'>
                    {t.author}
                  </span>
                  <span className='block text-sm font-medium text-neutral-600'>
                    {t.title}, {t.company}
                  </span>
                </div>
              </div>
            </div>
            {/* <img src={t.img} className='w-full h-44 object-cover' /> */}
            <div className='px-4 pb-9'>
              <span className='block leading-snug text-sm'>{t.content}</span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default ScrollingTestimonials;
