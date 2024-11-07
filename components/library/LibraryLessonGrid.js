import React, { useEffect, useMemo, useState, useRef } from 'react';
import { MdArrowOutward, MdSearch } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { getAuthors } from '../../helpers/api';
import Pagination from '../shared/Pagination';

const createDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

const AuthorBlock = ({ id, pic, small }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const setCurrent = async (id) => {
      const auth = await getAuthors(id);
      setAuthor(auth.getAuthor);
    };

    setCurrent(id);
  }, [id]);

  return (
    <div
      key={author.id}
      className='flex items-center gap-1 cursor-pointer'
      onClick={() => window.open(author.linkedIn, '_blank')}
    >
      <div
        className={`${pic ? 'block' : 'hidden'} ${
          small ? 'w-5 h-5' : 'w-7 h-7'
        } rounded-full bg-center bg-cover`}
        style={{
          backgroundImage: `url(${
            author.headshot
              ? author.headshot
              : 'https://packschool.s3.amazonaws.com/avatar_default.jpeg'
          })`,
        }}
      ></div>
      <div className={`${small ? 'text-xs' : 'text-sm'} text-neutral-500`}>
        {author.name}
      </div>
    </div>
  );
};

const SocialGridItem = ({ lesson }) => {
  return (
    <div className='flex flex-1 h-[500px] justify-between flex-col group cursor-pointer bg-white p-4 border border-black'>
      <div
        key={lesson.id}
        className='w-full flex flex-col gap-2'
        onClick={() =>
          window.open(
            `https://www.packagingschool.com/lessons/${lesson.slug}`,
            '_blank'
          )
        }
      >
        <div
          className='w-full h-[200px] border border-black bg-cover bg-center group-hover:-translate-x-1 group-hover:shadow-[6px_6px_0px_black] group-hover:-translate-y-2 transition-all ease-in-out'
          style={{
            backgroundImage: `url(${
              lesson.screengrab ? lesson.screengrab : lesson.seoImage
            })`,
          }}
        ></div>
        <div className='flex w-full items-center flex-wrap gap-x-3 gap-y-1'>
          {lesson.author && lesson.author.length > 0 ? (
            lesson.author.map((au) => (
              <AuthorBlock id={au} key={au} pic={false} small={true} />
            ))
          ) : (
            <></>
          )}
        </div>
        <div>
          <div className='h4-base'>{lesson.title}</div>
        </div>
        <div className='line-clamp-6 text-sm'>{lesson.subhead}</div>
      </div>
      <div className='flex justify-between w-full items-end'>
        <div className='w-full flex flex-col'>
          <div className='text-sm font-medium text-clemson-dark'>
            {lesson.backdate
              ? createDate(lesson.backdate)
              : createDate(lesson.createdAt)}
          </div>
        </div>
        <div className='flex w-full max-w-1/2 items-center'>
          <div
            className='flex items-center justify-end gap-1 mt-2 cursor-pointer w-full'
            onClick={() =>
              window.open(
                `https://www.packagingschool.com/lessons/${lesson.slug}`,
                '_blank'
              )
            }
          >
            <div className='text-sm uppercase font-semibold underline'>
              View Article
            </div>
            <div>
              <MdArrowOutward size={20} color='black' />
            </div>
          </div>
        </div>
        {/* <div className='flex items-center gap-1 mt-3'>
          <LinkedinShareButton
            url={`https://www.packagingschool.com/lessons/${lesson.slug}`}
            title={lesson.title}
            summary={lesson.subhead}
            source={`https://www.packagingschool.com/lessons/${lesson.slug}`}
          >
            <LinkedinIcon size={22} round bgStyle={{ fill: 'black' }} />
          </LinkedinShareButton>
          <FacebookShareButton
            url={`https://www.packagingschool.com/lessons/${lesson.slug}`}
            title={lesson.title}
          >
            <FacebookIcon size={22} round bgStyle={{ fill: 'black' }} />
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://www.packagingschool.com/lessons/${lesson.slug}`}
            title={lesson.title}
          >
            <XIcon size={22} round bgStyle={{ fill: 'black' }} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={`https://www.packagingschool.com/lessons/${lesson.slug}`}
            title={lesson.title}
          >
            <WhatsappIcon size={22} round bgStyle={{ fill: 'black' }} />
          </WhatsappShareButton>
        </div> */}
      </div>
    </div>
  );
};

const LibraryLessonGrid = () => {
  const [isSearchTerm, setIsSearchTerm] = useState('');
  const [isCurrentPage, setIsCurrentPage] = useState(1);
  const { allLessons } = useSelector((state) => state.course_filter);

  const libraryRef = useRef();

  const lessonsToShow = useMemo(() => {
    const lotm =
      allLessons &&
      [...allLessons]
        .filter((less) => less.type === 'LOTM')
        .sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          if (a.createdAt > b.createdAt) {
            return -1;
          }
        });

    return lotm.filter(
      (o) =>
        o.title.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
        o.subhead.toLowerCase().includes(isSearchTerm.toLowerCase())
    );
  }, [allLessons, isSearchTerm]);

  const GFG = (array, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
  };

  const paginatedItems = useMemo(() => {
    if (lessonsToShow) {
      const currentPageData = GFG(lessonsToShow, isCurrentPage, 7);
      return currentPageData;
    }
  }, [lessonsToShow, isCurrentPage]);

  return (
    <div className='w-full flex flex-col gap-10'>
      <div className='flex justify-end items-center gap-1 py-2 border-y border-y-black'>
        <div className='flex justify-end items-center w-full'>
          <input
            type='text'
            value={isSearchTerm}
            className='w-full max-w-[50%] bg-transparent focus:ring-0 border-0 text-right placeholder:text-sm placeholder:text-neutral-400'
            placeholder='Search the Learning of the Month Library'
            onChange={(e) => setIsSearchTerm(e.target.value)}
          />
          <div>
            <MdSearch size={24} color='black' />
          </div>
        </div>
      </div>
      {paginatedItems.length > 0 ? (
        <>
          <div
            className='w-full grid lg:grid-cols-2 items-center group py-2.5 scroll-mt-10'
            ref={libraryRef}
          >
            <div
              className='w-full border max-h-[400px] aspect-[16/9] bg-cover bg-center group-hover:-translate-x-1 group-hover:shadow-[6px_6px_0px_black] group-hover:-translate-y-2 transition-all ease-in-out'
              style={{
                backgroundImage: `url(${paginatedItems[0].seoImage})`,
              }}
              onClick={() =>
                window.open(
                  `https://www.packagingschool.com/lessons/${paginatedItems[0].slug}`,
                  '_blank'
                )
              }
            ></div>
            <div className='flex flex-col gap-10 p-6 lg:p-10'>
              <div className='w-full flex flex-col gap-2'>
                <div className='w-full flex flex-col'>
                  <div className=' font-medium text-clemson-dark'>
                    {paginatedItems[0].backdate
                      ? createDate(paginatedItems[0].backdate)
                      : createDate(paginatedItems[0].createdAt)}
                  </div>
                </div>
                <div className='h2-base'>{paginatedItems[0].title}</div>
                <div className='flex w-full items-center flex-wrap gap-x-2 gap-y-1'>
                  {paginatedItems[0].authors &&
                  paginatedItems[0].authors.length > 0 ? (
                    paginatedItems[0].authors.map((au) => (
                      <AuthorBlock id={au} key={au} pic={true} small={true} />
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                <div className='line-clamp-6'>{paginatedItems[0].subhead}</div>
                <div
                  className='flex items-center justify-between'
                  onClick={() =>
                    window.open(
                      `https://www.packagingschool.com/lessons/${paginatedItems[0].slug}`,
                      '_blank'
                    )
                  }
                >
                  <div className='flex items-center gap-1.5 mt-2 cursor-pointer border-b-black border-b pb-1 w-fit'>
                    <div className='text-sm uppercase font-semibold'>
                      View Article
                    </div>
                    <div>
                      <MdArrowOutward size={20} color='black' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-10'>
              {paginatedItems.splice(1).map((les) => (
                <div key={les.id}>
                  <SocialGridItem lesson={les} />
                </div>
              ))}
            </div>
          </div>
          <div className='w-full flex justify-center items-center gap-1 mt-3'>
            <Pagination
              totalItems={lessonsToShow && lessonsToShow.length}
              itemsPerPage={7}
              currentPage={isCurrentPage}
              onPageChange={(page) => {
                setIsCurrentPage(page);
                libraryRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </>
      ) : (
        <div className='w-full aspect-[16/5] flex items-center justify-center'>
          <div className='h3-base text-center'>
            No results, please refine your search.
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryLessonGrid;
