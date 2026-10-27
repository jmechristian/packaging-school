import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { MdPlayCircle, MdStarBorder, MdStar, MdEvent } from 'react-icons/md';
import {
  reEnroll,
  getCourseByThinkificId,
  createUserReview,
  getReviewByUserAndCourse,
  updateUserReview,
} from '../../helpers/api';

const formatExpiry = (enrollment) => {
  if (!enrollment?.expiry_date) {
    if (enrollment?.expired) {
      return { label: 'Expired', tone: 'text-red-600' };
    }
    return { label: 'No expiration', tone: 'text-slate-500' };
  }

  const date = new Date(enrollment.expiry_date);
  if (Number.isNaN(date.getTime())) {
    return { label: 'No expiration', tone: 'text-slate-500' };
  }

  const formatted = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (enrollment.expired || date.getTime() < Date.now()) {
    return { label: `Expired ${formatted}`, tone: 'text-red-600' };
  }

  const daysUntilExpiry = (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if (daysUntilExpiry <= 30) {
    return { label: `Expires ${formatted}`, tone: 'text-amber-700' };
  }

  return { label: `Expires ${formatted}`, tone: 'text-slate-600' };
};

const CourseItem = ({ course, enrollment, navigateToThinkific }) => {
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [courseId, setCourseId] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const { awsUser, user } = useSelector((state) => state.auth);

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

  const courseTitle = course?.title || enrollment?.course_name || 'Course';
  const imageUrl = course?.cardImage?.url;
  const expiry = formatExpiry(enrollment);

  const openCourse = () => {
    if (!course?.slug) return;
    navigateToThinkific(
      `https://learn.packagingschool.com/courses/take/${course.slug}`,
      `https://learn.packagingschool.com/courses/take/${course.slug}`,
    );
  };

  const completion = Math.round(
    (Number(enrollment.percentage_completed) || 0) * 100
  );

  return (
    enrollment && (
      <div
        key={enrollment.id}
        className='flex h-full flex-col gap-3 rounded-lg border bg-white p-2.5 transition-shadow hover:shadow-md'
      >
        <div
          className='relative flex aspect-[16/9] w-full items-center justify-center rounded-lg bg-gray-200 bg-cover bg-center'
          style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
        >
          <div className='absolute inset-0 rounded-lg bg-black/40'></div>
          {course?.slug && (
            <button
              type='button'
              onClick={openCourse}
              className='relative z-10 cursor-pointer text-white transition-all duration-300 hover:text-clemson'
            >
              <MdPlayCircle size={55} />
            </button>
          )}
        </div>
        <div
          className={`font-semibold leading-tight tracking-tight text-gray-900 ${
            course?.slug ? 'cursor-pointer' : ''
          }`}
          onClick={openCourse}
        >
          {courseTitle}
        </div>
        <div className='mt-auto flex flex-col gap-2'>
          <div className='h-1 w-full bg-slate-300'>
            <div
              className='h-1 bg-indigo-500'
              style={{ width: `${completion}%` }}
            ></div>
          </div>
          <div
            className={`flex items-center gap-1 text-xs font-medium ${expiry.tone}`}
          >
            <MdEvent size={14} />
            <span>{expiry.label}</span>
          </div>
          <div className='flex flex-wrap items-center justify-between gap-x-2 gap-y-1'>
            <div className='text-xs font-bold text-gray-500'>
              {completion}% Complete
            </div>
            <div className='flex items-center gap-1.5'>
              <div className='flex items-center text-xs text-slate-500'>
                {renderStars(true)}
              </div>
              <div
                className='cursor-pointer whitespace-nowrap text-xs text-slate-600'
                onClick={() => setShowRatingModal(true)}
              >
                Leave a Rating
              </div>
            </div>
          </div>
          {course?.slug && (
            <button
              type='button'
              className='mt-2 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-base-brand p-2 font-semibold text-white transition-all duration-300 hover:bg-base-dark'
              onClick={openCourse}
            >
              Continue Course
              <MdPlayCircle size={20} />
            </button>
          )}
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
