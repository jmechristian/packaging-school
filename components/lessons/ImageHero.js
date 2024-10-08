import React from 'react';
import AuthorBlock from '../shared/AuthorBlock';

const ImageHero = ({ title, date, author, media }) => {
  return (
    <div className='flex flex-col gap-8 lg:gap-16 md:flex-row items-center justify-between md:px-6 xl:px-0 pt-6'>
      <div
        className='aspect-[16/9] w-full max-w-[450px] bg-black bg-cover bg-center bg-no-repeat md:rounded-2xl'
        style={{ backgroundImage: `url(${media})` }}
      ></div>
      <div className='flex flex-col h-full w-full gap-5 px-6 lg:px-0'>
        <div className='w-full font-bold max-w-3xl text-3xl lg:text-4xl xl:text-5xl leading-none lg:tracking-tight tracking-tighter dark:text-white'>
          {title}
        </div>
        <div className='flex flex-col'>
          <div className='font-bold text-sm uppercase dark:text-white'>
            {date}
          </div>
          {author &&
            author.map((a) => (
              <div key={a}>
                <AuthorBlock id={a} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageHero;
