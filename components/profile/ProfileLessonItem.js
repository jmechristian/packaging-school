import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getSavedLesson, handleBookmarkAdd } from '../../helpers/api';
import { MdBookmarkRemove, MdCheckCircle } from 'react-icons/md';
import { useRouter } from 'next/router';
const ProfileLessonItem = ({ lessonId }) => {
  const [isLesson, setIsLesson] = useState(false);
  const [lesson, setLesson] = useState(null);
  const { awsUser } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const fetchLesson = async () => {
      const lesson = await getSavedLesson(lessonId);
      setLesson(lesson);
    };
    fetchLesson();
  }, [lessonId]);

  // const isCompleted = useMemo(() => {
  //   return (
  //     awsUser.lessonsCompleted &&
  //     awsUser.lessonsCompleted.items &&
  //     awsUser.lessonsCompleted.items.some((item) => item.lessonId === lessonId)
  //   );
  // }, [awsUser, lessonId]);

  // console.log(isCompleted);

  if (!lesson) {
    return (
      <div className='flex flex-col gap-2 animate-pulse'>
        <div className='h-5 bg-gray-200 rounded w-3/4'></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 bg-gray-100 rounded-lg p-2 hover:bg-gray-200 border border-gray-200 cursor-pointer'>
      <div className='flex gap-3 text-gray-700'>
        <div className='flex gap-1'>
          <div className='cursor-pointer'>
            <MdCheckCircle size={18} color={'gray'} />
          </div>
          <div
            className='cursor-pointer'
            onClick={() =>
              handleBookmarkAdd(
                awsUser.savedLessons.filter((id) => id !== lesson.id),
                awsUser.id
              )
            }
          >
            <MdBookmarkRemove size={18} />
          </div>
        </div>
        <div
          className='text-xs font-medium line-clamp-1 mr-2'
          onClick={() => router.push(`/lessons/${lesson.slug}`)}
        >
          {lesson.title}
        </div>
      </div>
    </div>
  );
};

export default ProfileLessonItem;
