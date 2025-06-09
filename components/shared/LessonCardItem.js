import React, { useState, useEffect } from 'react';
import { getAuthor, lessonTagsByLessonId } from '../../src/graphql/queries';
import { registgerLessonClick } from '../../helpers/api';
import {
  MdVideocam,
  MdCampaign,
  MdAccountCircle,
  MdExitToApp,
} from 'react-icons/md';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import BrutalCircleIconTooltip from './BrutalCircleIconTooltip';

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

const LessonCardItem = ({ less }) => {
  const router = useRouter();
  const [isTags, setIsTags] = useState([]);
  const { location } = useSelector((state) => state.auth);
  const clickHandler = async () => {
    await registgerLessonClick(less.id, router.asPath, location, 'GRID');
    router.push(`/lessons/${less.slug}`);
  };

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

  return (
    <div
      className={`w-full h-full border border-black flex flex-col relative cursor-pointer select-none ${
        less.type === 'LOTM'
          ? 'bg-brand-yellow/20'
          : less.type === 'REGULATORY'
          ? 'bg-clemson/20'
          : 'bg-base-brand/20'
      } transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[0px_0px_0px_black] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.20)]`}
      onClick={clickHandler}
    >
      {/* MEDIA */}
      <div>
        <div
          className='w-full aspect-[16/9] max-h-full bg-brand-indigo-light bg-cover bg-center'
          style={{ backgroundImage: `url(${less.seoImage})` }}
        ></div>
      </div>
      {/* CONTENT */}
      <div className='bg-white flex flex-col gap-1 p-4 h-full relative'>
        <div className='absolute w-full h-16 bg-gradient-to-t from-white via-white z-10 bottom-0 left-0 right-0'></div>
        <div className='text-sm'>{newDate}</div>
        <div className='text-lg !leading-[1.2] font-semibold'>{less.title}</div>
        <div className='flex flex-wrap gap-x-1.5 gap-y-1'>
          {less.author.map((auth, index) => (
            <div className='flex items-center gap-0.5' key={auth}>
              <AuthorName id={auth} />
              {index < less.author.length - 1 && (
                <span className='text-xs'>/</span>
              )}
            </div>
          ))}
        </div>
        <div
          className='text-sm leading-tight text-gray-500 mt-2'
          id='scrollers'
        >
          {less.subhead}
        </div>
      </div>
      {/* BUTTONS */}
      <div className='flex w-full items-center justify-between gap-2.5 py-1.5'>
        {/* <div className='flex items-center gap-2'>
          <BrutalCircleIconTooltip
            tooltip={'View'}
            bgColor={'bg-[#ff9321]'}
            fn={clickHandler}
          >
            <MdExitToApp color='black' size={20} />
          </BrutalCircleIconTooltip>
          {less.mediaType === 'VIDEO' ? (
            <BrutalCircleIconTooltip
              tooltip={'Watch'}
              bgColor={'bg-white'}
              fn={() => setIsPlaying(!isPlaying)}
            >
              <MdVideocam color='black' size={24} />
            </BrutalCircleIconTooltip>
          ) : (
            <></>
          )}
          <BrutalCircleIconTooltip
            tooltip={'Share'}
            bgColor={'bg-base-brand'}
            fn={() => setIsPlaying(!isPlaying)}
          >
            <MdCampaign color='white' size={24} />
          </BrutalCircleIconTooltip>
        </div> */}
      </div>
    </div>
  );
};

export default LessonCardItem;
