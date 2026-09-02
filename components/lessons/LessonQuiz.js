import React, { useState, useMemo, useEffect } from 'react';
import {
  completeLesson,
  getAWSUser,
  getUserLevel,
  updateLastLogin,
} from '../../helpers/api';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from '../../features/navigation/navigationSlice';
import { setAWSUser, setUserXp } from '../../features/auth/authslice';
import { useUser } from '@auth0/nextjs-auth0/client';

const LessonQuiz = ({ analysis, lessonId }) => {
  const { awsUser } = useSelector((state) => state.auth);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useUser();

  const isLessonCompleted = useMemo(() => {
    return awsUser?.lessonsCompleted?.items?.some(
      (lesson) => lesson.lessonId === lessonId,
    );
  }, [awsUser?.lessonsCompleted?.items, lessonId]);

  const refreshAWSUser = async () => {
    const dbUser = await getAWSUser(user.email);
    if (dbUser) {
      dispatch(setAWSUser(dbUser));
      dispatch(setUserXp(dbUser.userXp));
    }
  };

  useEffect(() => {
    if (isLessonCompleted) {
      setSelectedAnswer(analysis?.quizCorrectAnswer || '');
      setShowResult(true);
    }
    setIsLoading(false);
  }, [isLessonCompleted, analysis?.quizCorrectAnswer]);

  const optionsArray = useMemo(() => {
    if (!analysis?.quizOptions?.[0]) return [];

    try {
      return analysis.quizOptions[0]
        .replace(/{|}/g, '')
        .split(',')
        .map((option) => {
          const parts = option.split('=');
          if (parts.length !== 2) {
            console.warn('Invalid option format:', option);
            return null;
          }
          const [key, value] = parts;
          return {
            key: key?.trim() || '',
            value: value?.trim() || '',
          };
        })
        .filter((option) => option !== null);
    } catch (error) {
      console.error('Error parsing quiz options:', error);
      return [];
    }
  }, [analysis?.quizOptions]);

  const handleSubmit = async () => {
    setShowResult(true);

    if (selectedAnswer.trim() === (analysis?.quizCorrectAnswer || '').trim()) {
      await completeLesson({
        lessonId: lessonId,
        userId: awsUser.id,
      });
      const level = getUserLevel(awsUser.userXp.totalXp + 5, awsUser);
      const updatedUserXp = await updateLastLogin(
        awsUser.userXp.id,
        parseInt(level.level, 10),
        parseInt(level.xpNeeded, 10),
        parseFloat(level.progress.toFixed(1)),
        awsUser.userXp.totalXp + 5,
      );
      dispatch(setUserXp(updatedUserXp));
      dispatch(
        showToast({
          message: 'Lesson Completed!',
          description: 'Keep going!',
        }),
      );
      await refreshAWSUser();
    }
  };

  const isCorrect =
    selectedAnswer.trim() === (analysis?.quizCorrectAnswer || '').trim();

  if (!analysis?.quizQuestion) {
    return null;
  }

  return (
    <div className='p-8 bg-base-mid rounded-lg shadow-md'>
      {isLoading ? (
        <div className='flex items-center justify-center h-48'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-clemson'></div>
        </div>
      ) : (
        <div className='w-full'>
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
              Submit Answer
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
      )}
    </div>
  );
};

export default LessonQuiz;
