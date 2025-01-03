import React from 'react';
import Image from "next/legacy/image";

const ArticleMedia = ({ media, title }) => {
  return (
    <div className='w-full h-full flex justify-center items-center relative aspect-[16/9] max-w-[1440px] mx-auto'>
      <Image src={media} alt={title} layout='fill' className='object-cover' />
    </div>
  );
};

export default ArticleMedia;
