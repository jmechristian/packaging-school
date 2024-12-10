import React from 'react';
import { useRouter } from 'next/router';
const ChapterDropdown = ({ chapter, isOpen, toggleChapter, content }) => {
  const router = useRouter();
  return (
    <div className='border-b border-gray-300'>
      <div
        className='flex justify-between items-center py-4 cursor-pointer'
        onClick={() => toggleChapter(chapter.id)}
      >
        <div className='flex items-center'>
          <h2 className='text-xl font-bold'>{chapter.name}</h2>
        </div>
        <div className='text-sm text-gray-600'>
          {Math.floor(chapter.duration_in_seconds / 60)} min
        </div>
      </div>
      {isOpen && (
        <div className='p-4 bg-gray-100'>
          <div className='flex flex-col gap-2'>
            {content.content.items.map((item) => (
              <div
                className='flex items-center gap-2 justify-between'
                key={item.id}
                onClick={() => router.push(`${item.take_url}`)}
              >
                <div className='text-sm text-gray-600'>{item.name}</div>
                <div className='text-sm text-gray-600'>
                  {item.contentable_type}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterDropdown;
