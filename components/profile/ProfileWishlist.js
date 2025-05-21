import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CourseCard } from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import {
  addCourseToWishlist,
  removeCourseFromWishlist,
  registgerCourseClick,
} from '../../helpers/api';
import { useSelector, useDispatch } from 'react-redux';
import { setAWSUser } from '../../features/auth/authslice';

const ITEMS_PER_PAGE = 9;

const ProfileWishlist = ({ courses, refreshUser, awsUser }) => {
  const [initCourses, setInitCourses] = useState(courses);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const { location } = useSelector((state) => state.auth);

  const filteredCourses = useMemo(() => {
    return initCourses.filter((course) =>
      course.lMSCourse.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [initCourses, search]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToWishlist = async (courseId) => {
    if (awsUser) {
      if (
        awsUser.wishlist.items.some((item) => item.lMSCourse.id === courseId)
      ) {
        // Optimistically update the UI
        setInitCourses(
          initCourses.filter((course) => course.lMSCourse.id !== courseId)
        );

        try {
          const res = await removeCourseFromWishlist(
            awsUser.wishlist.items.find(
              (item) => item.lMSCourse.id === courseId
            ).id,
            awsUser.email
          );
          dispatch(setAWSUser(res));
        } catch (error) {
          // If the API call fails, revert the optimistic update
          console.error('Failed to remove from wishlist:', error);
          setInitCourses(courses); // Reset to original state
        }
      } else {
        try {
          const res = await addCourseToWishlist(
            courseId,
            awsUser.id,
            awsUser.email
          );
          dispatch(setAWSUser(res));
        } catch (error) {
          console.error('Failed to add to wishlist:', error);
        }
      }
    }
  };

  const cardClickHandler = async (id, slug, altlink, type) => {
    await registgerCourseClick(id, router.asPath, location, slug, 'GRID');

    altlink
      ? router.push(altlink)
      : router.push(
          `/${
            type && type === 'COLLECTION' ? 'collections' : 'courses'
          }/${slug}`
        );
  };

  const cardPurchaseHandler = async (id, link) => {
    await registgerCourseClick(id, router.asPath, location, link, 'GRID');

    router.push(link);
  };

  return courses.length > 0 ? (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between w-full border-b border-gray-300 pb-4'>
        <div className='flex items-center gap-2'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search my wishlist'
              className='pl-8 pr-4 py-1 border border-gray-300 rounded-lg focus:border-clemson focus:ring-1 focus:ring-clemson w-64 text-sm placeholder:text-gray-400'
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='text-sm text-gray-700 font-bold'>
            Wishlist: {initCourses.length}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10'>
        {paginatedCourses.map((course) => (
          <CourseCard
            key={course.lMSCourse.id}
            course={course.lMSCourse}
            isFavorite={awsUser?.wishlist?.items.some(
              (item) => item.lMSCourse.id === course.lMSCourse.id
            )}
            initialVideoState={false}
            cardFavoriteHandler={() => handleAddToWishlist(course.lMSCourse.id)}
            cardClickHandler={() =>
              cardClickHandler(
                course.lMSCourse.id,
                course.lMSCourse.slug,
                course.lMSCourse.altLink,
                course.lMSCourse.type
              )
            }
            cardPurchaseHandler={() =>
              cardPurchaseHandler(course.lMSCourse.id, course.lMSCourse.link)
            }
          />
        ))}
      </div>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-8'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
          >
            Previous
          </button>

          <div className='flex items-center gap-1'>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 h-8 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-clemson text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
          >
            Next
          </button>
        </div>
      )}
    </div>
  ) : (
    <div>No courses in wishlist</div>
  );
};

export default ProfileWishlist;
