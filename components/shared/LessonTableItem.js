import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { getAuthor, lessonTagsByLessonId } from '../../src/graphql/queries';
import { MdAccountCircle, MdExitToApp } from 'react-icons/md';
import { useRouter } from 'next/router';
import { registgerLessonClick } from '../../helpers/api';
import { useSelector } from 'react-redux';
import BrutalCircleIconTooltip from './BrutalCircleIconTooltip';
import ExpandableDiv from './ExpandableDiv';

const AuthorName = ({ id }) => {
  const [isName, setIsName] = useState('');

  useEffect(() => {
    const getName = async () => {
      const author = await API.graphql({
        query: getAuthor,
        variables: { id: id },
      });
      setIsName(author.data.getAuthor.name);
    };

    id && getName();
  }, [id]);

  return <div className='text-sm'>{isName}</div>;
};

const LessonTableItem = ({ less }) => {
  const router = useRouter();
  const [isTags, setIsTags] = useState([]);
  const { location } = useSelector((state) => state.auth);

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

  const clickHandler = async () => {
    await registgerLessonClick(less.id, router.asPath, location, 'TABLE');
    router.push(`/lessons/${less.slug}`);
  };

  const isDateValid = (str) => {
    !isNaN(new Date(str));
  };

  const newDateTop =
    less &&
    new Date(less.backdate ? less.backdate : less.createdAt).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
      }
    );

  const newDateBottom =
    less &&
    new Date(less.backdate ? less.backdate : less.createdAt).getFullYear();

  return (
    <div
      key={less.id}
      className={`w-full flex gap-3 cursor-pointer py-5 px-5 flex-col md:!grid md:!grid-cols-12 border-2 border-black content-center ${
        less.type === 'LOTM'
          ? 'bg-brand-yellow'
          : less.type === 'REGULATORY'
          ? 'bg-clemson'
          : 'bg-base-brand'
      } transition-all bg-opacity-20 hover:bg-opacity-40 `}
    >
      {/* DATE */}
      <div
        className='h-full max-w-full md:hidden lg:block lg:col-span-1 lg:content-center'
        onClick={clickHandler}
      >
        <div className='flex gap-1 md:flex-col w-full md:justify-center items-center'>
          <div className='font-semibold uppercase tracking-tighter text-sm'>
            {newDateTop}
          </div>
          <div className='font-semibold uppercase tracking-tighter text-sm'>
            {newDateBottom}
          </div>
        </div>
      </div>
      <div
        className='col-span-5 md:col-span-6 lg:col-span-5 lg:grid lg:grid-cols-4 lg:content-center'
        onClick={clickHandler}
      >
        {/* TITLE */}
        <div className='grid grid-cols-7 gap-2 w-full lg:col-span-4'>
          <div className='col-span-5'>
            <div className='flex flex-col gap-4 col-span-3'>
              <div className='flex flex-col gap-1'>
                <div className='hidden md:flex lg:hidden items-center gap-1 text-neutral-600'>
                  <div className='font-semibold uppercase tracking-tighter text-sm'>
                    {newDateTop}
                  </div>
                  <div className='font-semibold uppercase tracking-tighter text-sm'>
                    {newDateBottom}
                  </div>
                </div>
                <div className='text-lg font-semibold leading-tight'>
                  {less.title}
                </div>
                <div className='flex gap-x-2 flex-wrap'>
                  {less.author.map((auth) => (
                    <div className='flex items-center gap-0.5' key={auth}>
                      <div>
                        <MdAccountCircle color='gray' size={16} />
                      </div>
                      <AuthorName id={auth} />
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-wrap items-center gap-1.5'>
                {isTags && isTags.length > 0 ? (
                  isTags.map((t) => (
                    <div
                      className='text-xs bg-white/40 py-1 px-1.5 border border-black uppercase font-semibold'
                      key={t.id}
                    >
                      {t.tags.tag}
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className='col-span-2 px-1 xl:px-5'>
            {less.type === 'LOTM' ? (
              <div
                className='w-full h-full bg-contain bg-center bg-no-repeat'
                style={{
                  backgroundImage: `url('https://packschool.s3.amazonaws.com/LOTM+Logo+Final-Black.png')`,
                }}
              ></div>
            ) : less.type === 'REGULATORY' ? (
              <div
                className='w-full h-full bg-contain bg-center bg-no-repeat'
                style={{
                  backgroundImage: `url('https://packschool.s3.amazonaws.com/ROTM-logo-hor.svg')`,
                }}
              ></div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className='lg:flex justify-center items-center p-2'>
          {less.type === 'LOTM' ? (
            <div
              className='w-full h-full bg-contain bg-center bg-no-repeat'
              style={{
                backgroundImage: `url('https://packschool.s3.amazonaws.com/LOTM+Logo+Final-Black.png')`,
              }}
            ></div>
          ) : less.type === 'REGULATORY' ? (
            <div
              className='w-full h-full bg-contain bg-center bg-no-repeat'
              style={{
                backgroundImage: `url('https://packschool.s3.amazonaws.com/ROTM-logo-hor.svg')`,
              }}
            ></div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <ExpandableDiv content={less.subhead} />
      <div
        className='hidden col-span-1 md:flex flex-col gap-1.5 content-center justify-center'
        onClick={clickHandler}
      >
        <div className='content-center mx-auto'>
          <BrutalCircleIconTooltip
            tooltip={'View'}
            bgColor={'bg-[#ff9321]'}
            fn={clickHandler}
          >
            <MdExitToApp color='black' size={22} />
          </BrutalCircleIconTooltip>
        </div>
      </div>
    </div>
  );
};

export default LessonTableItem;
