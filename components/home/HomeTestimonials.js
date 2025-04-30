'use client';
import React, { useState, useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const initTags = [
  {
    tag: 'APC',
  },
  {
    tag: 'CPS',
  },
  {
    tag: 'CMPM',
  },
  {
    tag: 'CSP',
  },

  {
    tag: 'Foundations',
  },
  {
    tag: 'Bootcamp',
  },
  {
    tag: 'PackDesign',
  },

  {
    tag: 'APS',
  },

  {
    tag: 'Courses',
  },
];

const HomeTestimonials = ({ testimonials }) => {
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const tagHandler = (tag) => {
    if (tags.includes(tag)) {
      setTags([...tags].filter((t) => t != tag));
    }

    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const testimonialsToShow = useMemo(() => {
    if (tags.length > 0) {
      return testimonials.filter((t) => tags.includes(...t.tags));
    } else {
      return testimonials.filter(
        (t) =>
          t.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [testimonials, tags, searchTerm]);

  return (
    <div className='w-full flex flex-col gap-6 max-w-[1600px] mx-auto'>
      {/* <div className='flex items-center bg-white pl-6 rounded-xl border'>
        <div>
          <MagnifyingGlassIcon className='w-6 h-6 text-neutral-700' />
        </div>
        <div className='w-full'>
          <input
            type='text'
            name='search'
            id='search'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            className='w-full text-lg text-neutral-700 bg-transparent placeholder:text-neutral-400 border-0 px-2 focus:ring-0'
            placeholder='Search by Name, Company, or Content'
          />
        </div>
      </div> */}
      <div className='w-full text-center flex flex-col gap-3'>
        <div className='text-xl uppercase tracking-wider text-base-brand font-bold'>
          Testimonials
        </div>
        <div className='h3-base text-center text-neutral-900 max-w-4xl mx-auto'>
          Discover real success stories from the tens of thousands we have
          empowered. Explore testimonials showcasing our impactful
          collaborations and achievements.
        </div>
        {/* <div className='flex flex-wrap gap-3'>
          {initTags.map((t) => (
            <div
              className={`border transition-all ease-in group ${
                tags.includes(t.tag)
                  ? 'border-clemson-dark bg-clemson text-white'
                  : 'border-neutral-300 bg-neutral-200 text-neutral-400'
              } cursor-pointer hover:bg-brand-yellow w-fit px-3 min-w-[100px] h-10 flex justify-center items-center rounded-lg`}
              key={t.tag}
              onClick={() => tagHandler(t.tag)}
            >
              <div className={` font-bold text-sm group-hover:text-black`}>
                {t.tag}
              </div>
            </div>
          ))}
        </div> */}
      </div>
      <div className='w-full mt-16'>
        <div className='flex flex-wrap gap-5'>
          {testimonialsToShow.map((t) => (
            <div
              key={t.id}
              className='shrink-0 bg-white w-[500px] h-[265px] flex flex-col overflow-hidden group items-start relative border-2 border-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0px_rgba(0,0,0,0.20)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.20)]'
            >
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonials;
