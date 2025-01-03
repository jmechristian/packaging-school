import React, { useEffect, useState } from 'react';
import BrutalButton from './BrutalButton';
import AuthorName from './AuthorName';
import { MdAccountCircle } from 'react-icons/md';
import { API } from 'aws-amplify';
import { lessonTagsByLessonId } from '../../src/graphql/queries';
import Image from "next/legacy/image";

const FeaturedLesson = ({ less }) => {
  const [isTags, setIsTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      const tags = await API.graphql({
        query: lessonTagsByLessonId,
        variables: { lessonId: less.id },
      });
      setIsTags(tags.data.lessonTagsByLessonId.items);
    };

    getTags();
  }, [less]);

  const newDate =
    less &&
    new Date(less.backdate ? less.backdate : less.createdAt).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
    );
  return less ? (
    <div className=' relative w-full h-full border-2 border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.20)] flex flex-col gap-5 '>
      {less.type === 'LOTM' && (
        <div className='w-24 h-24 rounded-full border border-black bg-brand-yellow flex items-center justify-center absolute top-2.5 lg:-left-5 -left-2'>
          <div className='w-20 h-20 flex items-center justify-center'>
            {less.type === 'LOTM' ? (
              <div className='w-full flex items-center justify-center'>
                <Image
                  src={
                    'https://packschool.s3.amazonaws.com/LOTM+Logo+Final-Black.png'
                  }
                  width={1699}
                  height={874}
                  alt='LOTM Logo'
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}

      <div className='flex flex-col md:flex-row h-full gap-5 items-start'>
        <div className='lg:grid w-full h-full'>
          <div
            className='aspect-[16/9] w-full max-w-sm px-2 md:w-60 md:h-full bg-indigo-200 bg-cover bg-center'
            style={{
              backgroundImage: `url(${
                less && less.screengrab ? less.screengrab : less.seoImage
              })`,
            }}
          ></div>
        </div>
        <div className='flex flex-col gap-x-3 gap-y-1'>
          <div className='text-xs'>{newDate}</div>
          <div className='h3-base pr-4'>{less && less.title}</div>
          <div className='flex items-center flex-wrap gap-2'>
            {less.author &&
              less.author.length > 0 &&
              less.author.map((a) => (
                <div className='flex items-center gap-0.5' key={a}>
                  <div>
                    <MdAccountCircle color='gray' size={16} />
                  </div>
                  <AuthorName id={a} />
                </div>
              ))}
          </div>
          <div className='text-sm mt-3'>{less && less.subhead}</div>
        </div>
      </div>
      <div className='flex items-end justify-between w-full'>
        {/* TAGS */}
        <div className='max-w-[33%] flex flex-wrap gap-1.5'>
          {isTags && isTags.length > 0 ? (
            isTags.map((t) => (
              <div
                className='text-xs bg-white/50 py-1 px-1.5 border border-black uppercase font-semibold'
                key={t.id}
              >
                {t.tags.tag}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className='w-fit'>
          <BrutalButton
            text={'View Lesson'}
            background={'bg-clemson'}
            textColor={'text-white'}
            link={`/lessons/${less.slug}`}
            small={true}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className='w-full h-96 border-2 border-neutral-300 p-6 shadow-[6px_6px_0px_rgba(0,0,0,0.20)] flex flex-col gap-5'>
      <div className='grid gap-5 grid-cols-6 w-full h-full'>
        <div className='col-span-2 bg-neutral-200 w-full h-full rounded-lg'></div>
        <div className='col-span-4 w-full h-full'>
          <div className='flex flex-col justify-between h-full'>
            <div className='bg-neutral-200 h-7 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-7 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
            <div className='bg-neutral-200 h-3 w-full rounded-xl'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedLesson;
