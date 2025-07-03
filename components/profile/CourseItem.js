import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { MdPlayCircle, MdStarBorder, MdStar } from 'react-icons/md';
import {
  reEnroll,
  getCourseByThinkificId,
  createUserReview,
  getReviewByUserAndCourse,
  updateUserReview,
} from '../../helpers/api';

const CourseItem = ({ course, enrollment }) => {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [courseId, setCourseId] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const { awsUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (course?.id) {
          const response = await getCourseByThinkificId(course.id);
          setCourseId(response);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [course?.id]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await getReviewByUserAndCourse(awsUser.id, courseId);
        setUserReview(response);
        if (response) {
          setRating(response.rating || 0);
          setComment(response.review || '');
        }
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    };
    courseId && fetchReview();
  }, [awsUser.id, courseId]);

  const handleStarClick = async (selectedRating) => {
    setRating(selectedRating);

    if (userReview && userReview.id) {
      await updateUserReview(userReview.id, {
        rating: selectedRating,
        review: comment || '',
      });
    } else {
      // You can add your rating submission logic here
      await createUserReview({
        lMSCourseReviewsId: courseId,
        rating: selectedRating,
        review: comment || '',
        userReviewsId: awsUser.id,
        userID: awsUser.id,
        thinkificId: course.id,
      });
    }
  };

  const handleCommentChange = async (e) => {
    setComment(e.target.value);
  };

  const handleSubmitRating = async () => {
    // You can add your comment submission logic here
    if (userReview && userReview.id) {
      await updateUserReview(userReview.id, {
        review: comment || '',
      });
    } else {
      await createUserReview({
        lMSCourseReviewsId: courseId,
        rating: rating,
        review: comment || '',
        userReviewsId: awsUser.id,
        userID: awsUser.id,
        thinkificId: course.id,
      });
    }
    setShowRatingModal(false);
  };

  const handleCancelRating = () => {
    setShowRatingModal(false);
    setComment('');
  };

  const renderStars = (isInteractive = false) => {
    return [...Array(5)].map((_, index) => {
      const ratingValue = index + 1;
      return (
        <div
          key={index}
          className={`cursor-pointer ${
            isInteractive ? 'hover:scale-110 transition-transform' : ''
          }`}
          onClick={() => isInteractive && handleStarClick(ratingValue)}
          onMouseEnter={() => isInteractive && setHoverRating(ratingValue)}
          onMouseLeave={() => isInteractive && setHoverRating(0)}
        >
          {ratingValue <= (hoverRating || rating) ? (
            <MdStar className='text-yellow-500' size={16} />
          ) : (
            <MdStarBorder className='text-yellow-800' size={16} />
          )}
        </div>
      );
    });
  };

  return (
    course && (
      <div
        key={course.id}
        className={`border flex flex-col rounded-lg space-y-3 hover:shadow-md transition-shadow bg-gray-100 p-2.5`}
      >
        <div
          className='w-full aspect-[16/9] bg-gray-200 rounded-lg flex items-center justify-center bg-cover bg-center relative'
          style={{
            backgroundImage: `url(${course.cardImage.url})`,
          }}
        >
          <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center'></div>
          <button
            onClick={() => {
              window.open(
                `https://learn.packagingschool.com/courses/take/${course.slug}`,
                '_blank'
              );
            }}
            className='text-white hover:text-clemson transition-all duration-300 text-sm font-bold relative z-10 cursor-pointer'
          >
            <MdPlayCircle size={55} />
          </button>
        </div>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-2'>
            <div className='font-semibold text-gray-900 tracking-tight leading-tight'>
              {course.title}
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 h-full justify-end'>
          {/* <div className='text-xs text-gray-100'>
            Enrolled:{' '}
            {new Date(enrollment.created_at).toISOString().split('T')[0]}
          </div> */}

          <div className='flex items-center gap-0'>
            <div className='w-full'>
              <div className='w-full h-1 bg-slate-300'>
                <div
                  className='h-1 bg-indigo-500'
                  style={{
                    width: `${enrollment.percentage_completed * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='text-xs font-bold text-gray-500'>
              {Math.round((enrollment.percentage_completed || 0) * 100)}%
              Complete
            </div>
            <div className='flex justify-end gap-1.5'>
              <div className='text-xs text-slate-500 flex items-center'>
                {renderStars(true)}
              </div>
              <div
                className='text-xs text-slate-600 cursor-pointer'
                onClick={() => setShowRatingModal(true)}
              >
                Leave a Rating
              </div>
            </div>
          </div>
        </div>
        {showRatingModal && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg w-96'>
              <h2 className='text-lg font-bold mb-4'>Leave a Rating</h2>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                  <div className='text-sm font-bold mb-2'>Rating</div>
                  <div className='flex items-center gap-1'>
                    {renderStars(true)}
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-bold'>Comment</label>
                  <textarea
                    className='border rounded-lg p-2 min-h-[100px] resize-none'
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder='Share your thoughts about this course...'
                  />
                </div>
                <div className='flex justify-end gap-2 mt-2'>
                  <button
                    onClick={handleCancelRating}
                    className='px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitRating}
                    className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg'
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default CourseItem;
