import React, { useCallback, useEffect, useMemo, useState } from 'react';

const BoosterProgress = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [progressRows, setProgressRows] = useState([]);
  const [codeRows, setCodeRows] = useState([]);
  const [redeemingId, setRedeemingId] = useState('');
  const [redeemError, setRedeemError] = useState('');

  const load = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      setProgressRows([]);
      setCodeRows([]);
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(
        `/api/booster/get-progress?userId=${encodeURIComponent(userId)}`
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json?.message || 'Failed to load booster progress.');
        setProgressRows([]);
        setCodeRows([]);
        return;
      }
      setProgressRows(Array.isArray(json?.progress) ? json.progress : []);
      setCodeRows(Array.isArray(json?.codes) ? json.codes : []);
    } catch (e) {
      setError(e?.message || 'Failed to load booster progress.');
      setProgressRows([]);
      setCodeRows([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleRedeem = useCallback(
    async (codeId) => {
      if (!userId || !codeId) return;
      const confirmed = window.confirm(
        'Redeem this code? You can only use one discount code per course, so redeeming this will lock in this tier and you will not be able to climb to a higher discount.'
      );
      if (!confirmed) return;

      setRedeemingId(codeId);
      setRedeemError('');
      try {
        const res = await fetch('/api/booster/redeem-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, codeId }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          setRedeemError(json?.message || 'Failed to redeem code.');
          return;
        }
        await load();
      } catch (e) {
        setRedeemError(e?.message || 'Failed to redeem code.');
      } finally {
        setRedeemingId('');
      }
    },
    [userId, load]
  );

  const codesByCourse = useMemo(() => {
    return codeRows.reduce((acc, code) => {
      const courseId = String(code?.thinkificCourseId || '').trim();
      if (!courseId) return acc;
      if (!acc[courseId]) acc[courseId] = [];
      acc[courseId].push(code);
      return acc;
    }, {});
  }, [codeRows]);

  const milestones = [10, 15, 25, 50];

  const header = (
    <div className='rounded-xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-6 mb-5'>
      <h2 className='text-2xl font-bold text-slate-800 mb-2'>Booster Lessons</h2>
      <p className='text-sm text-slate-600 leading-relaxed mb-4'>
        Booster Lessons are free lessons tied to a full Packaging School course.
        Pass the lesson assessment and you earn credit toward that course&apos;s
        completion. The more booster lessons you finish, the higher your progress
        climbs.
      </p>

      <div className='flex flex-wrap items-center gap-2 mb-4'>
        <span className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
          Discount Milestones
        </span>
        {milestones.map((milestone) => (
          <span
            key={milestone}
            className='inline-flex items-center px-3 py-1 rounded-full bg-clemson/10 text-sm font-semibold text-clemson'
          >
            {milestone}% off
          </span>
        ))}
      </div>

      <div className='rounded-lg bg-amber-50 border border-amber-200 px-4 py-3'>
        <p className='text-sm text-amber-900 leading-relaxed'>
          <span className='font-semibold'>One code, one chance.</span> Each
          discount code can be redeemed a single time. Redeeming locks in that
          tier &mdash; for example, if you use your 10% code, you can&apos;t keep
          climbing to unlock 15%, 25%, or 50%. Hold out for a higher milestone
          before redeeming to maximize your savings.
        </p>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div>
        {header}
        <div className='text-sm text-slate-600'>Loading booster progress...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {header}
        <div className='text-sm text-red-700'>{error}</div>
      </div>
    );
  }

  if (!progressRows.length) {
    return (
      <div>
        {header}
        <div className='rounded-lg border border-dashed border-gray-300 p-5 text-sm text-slate-600'>
          Complete a booster lesson quiz to start tracking progress here.
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {header}
      {progressRows.map((row) => {
        const courseId = String(row?.thinkificCourseId || '').trim();
        const courseCodes = (codesByCourse[courseId] || [])
          .slice()
          .sort((a, b) => (a?.milestonePercent || 0) - (b?.milestonePercent || 0));
        const redeemedCode = courseCodes.find((c) => c?.isRedeemed);
        const ladderLocked = Boolean(redeemedCode);
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
              <div className='flex items-center justify-between mb-1'>
                <div className='text-xs uppercase tracking-wide text-slate-500'>
                  Discount Codes
                </div>
                {ladderLocked && (
                  <div className='text-xs font-semibold text-amber-700'>
                    {redeemedCode.milestonePercent}% code redeemed &mdash; ladder
                    locked
                  </div>
                )}
              </div>
              {courseCodes.length ? (
                <div className='flex flex-col gap-2'>
                  {courseCodes.map((code) => {
                    const isRedeemed = Boolean(code?.isRedeemed);
                    const isLockedOut = ladderLocked && !isRedeemed;
                    const isRedeeming = redeemingId === code.id;
                    return (
                      <div
                        key={code.id || `${courseId}-${code.milestonePercent}`}
                        className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 ${
                          isRedeemed
                            ? 'border-green-300 bg-green-50'
                            : isLockedOut
                              ? 'border-gray-200 bg-gray-50 opacity-60'
                              : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className='flex items-center gap-3 min-w-0'>
                          <span className='inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-clemson/10 text-sm font-bold text-clemson shrink-0'>
                            {code.milestonePercent}%
                          </span>
                          <span
                            className={`font-mono text-sm truncate ${
                              isLockedOut
                                ? 'text-slate-400 line-through'
                                : 'text-slate-800'
                            }`}
                          >
                            {code.code}
                          </span>
                        </div>
                        {isRedeemed ? (
                          <span className='text-xs font-semibold text-green-700 shrink-0'>
                            Redeemed
                          </span>
                        ) : isLockedOut ? (
                          <span className='text-xs font-semibold text-slate-400 shrink-0'>
                            Locked
                          </span>
                        ) : (
                          <button
                            type='button'
                            onClick={() => handleRedeem(code.id)}
                            disabled={isRedeeming}
                            className='shrink-0 rounded-md bg-clemson px-3 py-1.5 text-xs font-semibold text-white hover:bg-clemson-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
                          >
                            {isRedeeming ? 'Redeeming...' : 'Redeem code'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                  {redeemError && (
                    <div className='text-xs text-red-700'>{redeemError}</div>
                  )}
                </div>
              ) : (
                <div className='text-sm text-slate-700'>
                  No milestone codes yet. Keep completing booster lessons to
                  unlock discounts.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoosterProgress;
