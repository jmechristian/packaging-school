import React, { useEffect, useMemo, useState } from 'react';

const BoosterProgress = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [progressRows, setProgressRows] = useState([]);
  const [codeRows, setCodeRows] = useState([]);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      setProgressRows([]);
      setCodeRows([]);
      return;
    }

    let ignore = false;
    const load = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch(
          `/api/booster/get-progress?userId=${encodeURIComponent(userId)}`
        );
        const json = await res.json().catch(() => ({}));
        if (ignore) return;
        if (!res.ok) {
          setError(json?.message || 'Failed to load booster progress.');
          setProgressRows([]);
          setCodeRows([]);
          return;
        }
        setProgressRows(Array.isArray(json?.progress) ? json.progress : []);
        setCodeRows(Array.isArray(json?.codes) ? json.codes : []);
      } catch (e) {
        if (!ignore) {
          setError(e?.message || 'Failed to load booster progress.');
          setProgressRows([]);
          setCodeRows([]);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [userId]);

  const codesByCourse = useMemo(() => {
    return codeRows.reduce((acc, code) => {
      const courseId = String(code?.thinkificCourseId || '').trim();
      if (!courseId) return acc;
      if (!acc[courseId]) acc[courseId] = [];
      acc[courseId].push(code);
      return acc;
    }, {});
  }, [codeRows]);

  if (isLoading) {
    return <div className='text-sm text-slate-600'>Loading booster progress...</div>;
  }

  if (error) {
    return <div className='text-sm text-red-700'>{error}</div>;
  }

  if (!progressRows.length) {
    return (
      <div className='rounded-lg border border-dashed border-gray-300 p-5 text-sm text-slate-600'>
        Complete a booster lesson quiz to start tracking progress here.
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {progressRows.map((row) => {
        const courseId = String(row?.thinkificCourseId || '').trim();
        const courseCodes = codesByCourse[courseId] || [];
        const lessons = Array.isArray(row?.completedLessonTitles)
          ? row.completedLessonTitles
          : [];
        return (
          <div
            key={row.id || `${courseId}-${row.courseTitle || 'course'}`}
            className='rounded-lg border border-gray-200 bg-white p-5'
          >
            <div className='flex items-start justify-between gap-3 mb-3'>
              <div>
                <h3 className='text-lg font-semibold text-slate-800'>
                  {row?.courseTitle || 'Course'}
                </h3>
                <div className='text-sm text-slate-500'>Course ID: {courseId}</div>
              </div>
              <div className='text-right'>
                <div className='text-2xl font-bold text-clemson'>
                  {Number(row?.percentComplete || 0)}%
                </div>
                <div className='text-xs text-slate-500'>
                  {Array.isArray(row?.completedLessonIds)
                    ? row.completedLessonIds.length
                    : 0}
                  /{Number(row?.totalLessonCount || 0)} lessons
                </div>
              </div>
            </div>

            <div className='w-full h-2.5 bg-gray-100 rounded-full mb-4'>
              <div
                className='h-2.5 rounded-full bg-clemson transition-all'
                style={{ width: `${Math.min(100, Number(row?.percentComplete || 0))}%` }}
              />
            </div>

            <div className='mb-3'>
              <div className='text-xs uppercase tracking-wide text-slate-500 mb-1'>
                Completed Lessons
              </div>
              <div className='text-sm text-slate-700'>
                {lessons.length ? lessons.join(', ') : 'No lessons tracked yet.'}
              </div>
            </div>

            <div>
              <div className='text-xs uppercase tracking-wide text-slate-500 mb-1'>
                Issued Discount Codes
              </div>
              {courseCodes.length ? (
                <div className='flex flex-wrap gap-2'>
                  {courseCodes.map((code) => (
                    <div
                      key={code.id || `${courseId}-${code.milestonePercent}`}
                      className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/20 text-xs font-semibold text-slate-900'
                    >
                      <span>{code.milestonePercent}%</span>
                      <span>{code.code}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-sm text-slate-700'>No milestone codes yet.</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoosterProgress;
