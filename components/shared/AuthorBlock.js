import { useEffect, useState } from 'react';
import { API } from 'react';
import { getAuthors } from '../../helpers/api';

const AuthorBlock = ({ id }) => {
  const [isAuthor, setIsAuthor] = useState(null);

  useEffect(() => {
    id && getAuthors(id).then((res) => setIsAuthor(res));
  }, [id]);

  return isAuthor ? (
    <div className=' flex flex-col gap-0 leading-none'>
      <div>
        <a
          href={isAuthor.getAuthor.linkedIn ? isAuthor.getAuthor.linkedIn : '#'}
          rel='noreferrer'
          target='_blank'
          className='font-bold uppercase text-sm dark:text-white'
        >
          {isAuthor.getAuthor.name}
        </a>
      </div>
      <div>
        <a
          href={isAuthor.getAuthor.linkedIn ? isAuthor.getAuthor.linkedIn : '#'}
          rel='noreferrer'
          target='_blank'
          className='text-xs dark:text-white/60'
        >
          {isAuthor.getAuthor.title}
        </a>
      </div>
    </div>
  ) : (
    <div className='w-48 h-2 bg-neutral-200 rounded-full animate-pulse my-1'></div>
  );
};

export default AuthorBlock;
