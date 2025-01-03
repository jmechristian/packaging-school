import React, { useId } from 'react';
import clsx from 'clsx';
import Image from "next/legacy/image";
import FadeIn from '../../helpers/FadeIn';
import VideoPlayer from '../VideoPlayer';

const styles = {
  xs: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-2',
  sm: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12',
  md: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-5xl lg:px-8',
  lg: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-7xl lg:px-8',
};

export function Container({ size = 'sm', className, ...props }) {
  return <div className={clsx(styles[size], className)} {...props} />;
}

export function GridPattern(props) {
  let patternId = useId();

  return (
    <svg aria-hidden='true' className='absolute inset-0 h-full w-full'>
      <defs>
        <pattern
          id={patternId}
          width='128'
          height='128'
          patternUnits='userSpaceOnUse'
          {...props}
        >
          <path d='M0 128V.5H128' fill='none' stroke='currentColor' />
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill={`url(#${patternId})`} />
    </svg>
  );
}

const Testimonial = ({ id, author, children }) => {
  return (
    <aside
      id={id}
      aria-label={`Testimonial from ${author.name}`}
      className='relative bg-slate-200 dark:bg-dark-mid py-16 sm:py-32'
    >
      <FadeIn>
        <div className='grid lg:grid-cols-2 gap-16 max-w-7xl md:max-w-2xl lg:max-w-7xl mx-auto px-5 xl:px-0'>
          <div className='w-full h-full aspect-[16/9] shadow-2xl'>
            <VideoPlayer
              videoEmbedLink={
                'https://youtu.be/opvsR5BB35g?si=bYAV-d_FHEf68Jt8'
              }
              light={true}
            />
          </div>
          <Container
            size='md'
            className='flex justify-center items-center rounded-2xl border py-10 xl:py-0 border-neutral-300'
          >
            <figure>
              <blockquote className='font-display text-lg md:text-xl xl:text-2xl font-medium tracking-tight text-slate-900 dark:text-white '>
                {children}
              </blockquote>
              <figcaption className='mt-10 flex items-center sm:justify-center'>
                {author.image && (
                  <div className='overflow-hidden rounded-full h-12 w-12 bg-slate-200'>
                    <Image
                      className='h-12 w-12 object-cover'
                      src={author.image}
                      alt={author.name}
                      width={48}
                      height={48}
                    />
                  </div>
                )}
                <div className='ml-4'>
                  <div className='text-base font-medium leading-6 tracking-tight text-slate-900 dark:text-clemson'>
                    {author.name}
                  </div>
                  <div className='mt-1 text-sm text-slate-600 dark:text-gray-500'>
                    {author.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          </Container>
        </div>
      </FadeIn>
    </aside>
  );
};

export default Testimonial;
