import React, { useState, useMemo, useEffect } from 'react';
import MiniProfile from '../profile/MiniProfile';
import { completeLesson, getAWSUser } from '../../helpers/api';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from '../../features/navigation/navigationSlice';
import { setAWSUser } from '../../features/auth/authSlice';
import { useUser } from '@auth0/nextjs-auth0/client';
const LessonQuiz = ({ analysis, lessonId }) => {
  const { awsUser } = useSelector((state) => state.auth);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useUser();
  // Check if lesson is already completed
  const isLessonCompleted = useMemo(() => {
    return awsUser?.lessonsCompleted?.items?.some(
      (lesson) => lesson.lessonId === lessonId
    );
  }, [awsUser?.lessonsCompleted?.items, lessonId]);

  const refreshAWSUser = async () => {
    const dbUser = await getAWSUser(user.email);
    if (dbUser) {
      dispatch(setAWSUser(dbUser));
    }
  };

  // Set initial state if lesson is completed
  useEffect(() => {
    if (isLessonCompleted) {
      setSelectedAnswer(analysis?.quizCorrectAnswer || '');
      setShowResult(true);
    }
    setIsLoading(false);
  }, [isLessonCompleted, analysis?.quizCorrectAnswer]);

  // Parse the quiz options string into an array with error handling
  const optionsArray = useMemo(() => {
    if (!analysis?.quizOptions?.[0]) return [];

    try {
      return analysis.quizOptions[0]
        .replace(/{|}/g, '') // Remove curly braces
        .split(',')
        .map((option) => {
          const [key, value] = option.split('=');
          return { key, value: value.trim() };
        });
    } catch (error) {
      console.error('Error parsing quiz options:', error);
      return [];
    }
  }, [analysis?.quizOptions]);

  const handleSubmit = async () => {
    setShowResult(true);

    // Check if the answer is correct
    if (selectedAnswer.trim() === (analysis?.quizCorrectAnswer || '').trim()) {
      // Add your logic here for correct answer
      // For example: update points, show celebration, etc.
      console.log('Correct answer submitted!');
      await completeLesson({
        lessonId: lessonId,
        userId: awsUser.id,
        xpAwarded: 5,
        pxp: awsUser.psXp,
        thinkificXp: awsUser.thinkificXp,
      });
      dispatch(
        showToast({
          message: 'Lesson Completed!',
          description: 'You have earned 5 PXP',
        })
      );
      refreshAWSUser();
    }
  };

  const isCorrect =
    selectedAnswer.trim() === (analysis?.quizCorrectAnswer || '').trim();

  return (
    <div className='p-8 bg-base-mid rounded-lg shadow-md'>
      {isLoading ? (
        <div className='flex items-center justify-center h-48'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-clemson'></div>
        </div>
      ) : analysis?.quizQuestion ? (
        <div className='grid grid-cols-12 gap-10 w-full'>
          <div className='col-span-8 w-full'>
            <h3 className='text-xl max-w-xl font-semibold mb-6 text-white'>
              {analysis.quizQuestion}
            </h3>

            <div className='space-y-4'>
              {optionsArray.map((option) => (
                <div key={option.key} className='flex items-center'>
                  <input
                    type='radio'
                    id={option.key}
                    name='quiz-option'
                    value={option.key}
                    checked={selectedAnswer === option.key}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className='mr-3'
                    disabled={showResult}
                  />
                  <label
                    htmlFor={option.key}
                    className='text-gray-100 font-medium'
                  >
                    {option.key}. {option.value}
                  </label>
                </div>
              ))}
            </div>

            {!showResult && !isLessonCompleted && (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className='mt-6 px-4 py-2 bg-clemson font-bold text-white rounded-md hover:bg-clemson-dark disabled:bg-gray-400'
              >
                Submit Answer (+5 PXP)
              </button>
            )}

            {showResult && (
              <div
                className={`mt-4 p-3 rounded-md ${
                  isCorrect
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {isCorrect ? '✓ Correct!' : `✗ Incorrect. `}
                {!isCorrect && (
                  <button
                    onClick={() => {
                      setShowResult(false);
                      setSelectedAnswer('');
                    }}
                    className='ml-4 px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700'
                  >
                    Try Again
                  </button>
                )}
              </div>
            )}
          </div>
          <div className='col-span-4'>
            <MiniProfile />
          </div>
        </div>
      ) : (
        <div className='text-white'>Quiz data not available</div>
      )}
    </div>
  );
};

export default LessonQuiz;
