import React, { useEffect, useState } from 'react';
import HomeTestimonials from '../components/home/HomeTestimonials';
import Meta from '../components/shared/Meta';
import { getAllTestimonials } from '../helpers/api';

const Page = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const testimonials = await getAllTestimonials();
      setTestimonials(testimonials);
    };
    fetchTestimonials();
  }, []);

  return (
    <>
      <Meta
        title={'Packaging School Testimonials'}
        description={
          "Discover real success stories from the tens of thousands we've empowered. Explore testimonials showcasing our impactful collaborations and achievements."
        }
      />
      <div className='py-16 px-5 xl:px-0 max-w-[1600px] mx-auto'>
        <div className='w-full text-center flex flex-col gap-3'>
          <div className='text-xl uppercase tracking-wider text-base-brand font-bold'>
            Testimonials
          </div>
          <div className='h3-base text-center text-neutral-900 max-w-4xl mx-auto'>
            Discover real success stories from the tens of thousands we have
            empowered. Explore testimonials showcasing our impactful
            collaborations and achievements.
          </div>
        </div>
        <div className='flex flex-wrap gap-5 justify-center mt-12'>
          {testimonials.map((t) => (
            <div
              key={t.id}
              className='shrink-0 bg-white w-[500px] h-[275px] flex flex-col overflow-hidden group justify-center items-start relative border-2 border-black transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.20)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.20)]'
            >
              <div className='absolute bottom-2 right-2 z-20 cursor-pointer'></div>
              <div className='absolute right-2 top-2 z-20 w-full max-w-[33%] flex justify-end flex-wrap gap-1'>
                {t.tags.map((t) => (
                  <div
                    className='border border-black p-1 text-xs uppercase'
                    key={t}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className='flex items-start gap-3 px-4 w-fit'>
                <div className='h-full'>
                  <div
                    className='aspect-[1/1] rounded-full bg-indigo-400 w-9 mx-auto bg-cover bg-center border-2 border-black'
                    style={{
                      backgroundImage: `url(${
                        t.headshot
                          ? t.headshot
                          : 'https://packschool.s3.amazonaws.com/avatar_default.jpeg'
                      })`,
                    }}
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
              <div className='px-4 mt-2'>
                <span className='block leading-snug text-sm'>{t.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
