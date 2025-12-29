import React, { useCallback, useEffect, useMemo, useState } from 'react';

const CLOSE_ANIMATION_MS = 300;

const FlashSaleBanner = ({ isOpen = true, onRequestClose, onClosed }) => {
  const codesByUtcDay = useMemo(
    () => [
      { day: '2025-12-29', code: '26percentdec29' },
      { day: '2025-12-30', code: '26percentdec30' },
      { day: '2025-12-31', code: '26percentdec31' },
      { day: '2026-01-01', code: '26percentjan1' },
      { day: '2026-01-02', code: '26percentjan2' },
      { day: '2026-01-03', code: '26percentjan3' },
      { day: '2026-01-04', code: '26percentjan4' },
    ],
    []
  );

  const [remainingTime, setRemainingTime] = useState('00:00:00');
  const [today, setToday] = useState(null);
  const [next, setNext] = useState(null);
  const [showCopied, setShowCopied] = useState(false);

  const getUtcYmd = (date) => {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getTimeToEndOfUtcDayMs = (now) => {
    const endOfDayUtcMs = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23,
      59,
      59,
      999
    );
    return endOfDayUtcMs - now.getTime();
  };

  const refreshSchedule = useCallback(() => {
    const now = new Date();
    const todayUtc = getUtcYmd(now);

    const todayEntry = codesByUtcDay.find((e) => e.day === todayUtc) || null;
    const nextEntry =
      codesByUtcDay.find((e) => e.day > todayUtc) ||
      (todayEntry
        ? null
        : codesByUtcDay.find((e) => e.day >= todayUtc) || null);

    setToday(todayEntry);
    setNext(nextEntry);
  }, [codesByUtcDay]);

  useEffect(() => {
    refreshSchedule();
  }, [refreshSchedule]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const todayUtc = getUtcYmd(now);

      const firstDay = codesByUtcDay[0]?.day;
      const lastDay = codesByUtcDay[codesByUtcDay.length - 1]?.day;

      // Sale ended (we're on a UTC day after the last code day)
      if (lastDay && todayUtc > lastDay) {
        setRemainingTime('00:00:00');
        return;
      }

      // If sale hasn't started yet, count down to 00:00:00 UTC on the first day
      if (firstDay && todayUtc < firstDay) {
        const [y, m, d] = firstDay.split('-').map((v) => parseInt(v, 10));
        const startOfFirstDayUtcMs = Date.UTC(y, m - 1, d, 0, 0, 0, 0);
        const ms = startOfFirstDayUtcMs - now.getTime();
        const safeMs = Math.max(0, ms);
        const hours = Math.floor(safeMs / (1000 * 60 * 60));
        const minutes = Math.floor((safeMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((safeMs % (1000 * 60)) / 1000);
        setRemainingTime(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0'
          )}:${String(seconds).padStart(2, '0')}`
        );
        return;
      }

      const msRemaining = getTimeToEndOfUtcDayMs(now);

      if (msRemaining <= 0) {
        // Day has rolled over in UTC; refresh which code is active.
        refreshSchedule();
        setRemainingTime('00:00:00');
        return;
      }

      const hours = Math.floor(msRemaining / (1000 * 60 * 60));
      const minutes = Math.floor(
        (msRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((msRemaining % (1000 * 60)) / 1000);
      setRemainingTime(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0'
        )}:${String(seconds).padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [codesByUtcDay, refreshSchedule]);

  const status = useMemo(() => {
    const now = new Date();
    const todayUtc = getUtcYmd(now);
    const firstDay = codesByUtcDay[0]?.day;
    const lastDay = codesByUtcDay[codesByUtcDay.length - 1]?.day;

    if (lastDay && todayUtc > lastDay) return 'ended';
    if (firstDay && todayUtc < firstDay) return 'upcoming';
    return today ? 'active' : 'inactive';
  }, [codesByUtcDay, today]);

  useEffect(() => {
    if (isOpen) return;
    if (!onClosed) return;
    const t = setTimeout(() => onClosed(), CLOSE_ANIMATION_MS);
    return () => clearTimeout(t);
  }, [isOpen, onClosed]);

  return (
    <div
      className={`w-full overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
        isOpen
          ? 'max-h-[240px] opacity-100 translate-y-0'
          : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div className='w-full pb-3.5 pt-2 bg-brand-yellow relative'>
        <button
          type='button'
          aria-label='Close flash sale banner'
          className='absolute top-2 right-2 h-9 w-9 rounded-full bg-black/10 hover:bg-black/20 transition-colors flex items-center justify-center'
          onClick={() => onRequestClose?.()}
        >
          <span className='text-xl leading-none' aria-hidden='true'>
            ×
          </span>
        </button>
        <div className='container mx-auto max-w-7xl w-full px-4 md:!px-8 xl:!px-0'>
          <div className='grid grid-cols-1 md:!grid-cols-3 items-center gap-4 text-center md:!text-left'>
            <div className='flex flex-col gap-0 leading-snug items-center md:!items-start order-1 md:!order-1'>
              <div className='text-xl font-bold leading-tight'>
                Ring in the New Year with new skills!
              </div>
              <div className='text-base'>
                Get <span className='font-bold'>26% off</span> all courses and
                certificates.<sup>*</sup>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center leading-snug px-0 md:!px-4 md:!justify-self-center order-3 md:!order-2'>
              <div className='text-sm font-medium'>
                {status === 'ended'
                  ? 'No more codes'
                  : status === 'upcoming'
                  ? 'Code unlocks at 00:00 UTC'
                  : null}
              </div>
              <div className='flex flex-col items-center gap-0.5 text-center'>
                <div className='font-mono font-bold text-lg'>
                  {status === 'active' && today ? today.code : '—'}
                </div>
                {status === 'active' && today ? (
                  <button
                    type='button'
                    className='px-6 py-1 rounded-md bg-black text-white text-base font-medium hover:opacity-90 transition-opacity w-fit'
                    onClick={() => {
                      if (!today?.code) return;
                      navigator.clipboard.writeText(today.code);
                      setShowCopied(true);
                      setTimeout(() => setShowCopied(false), 1500);
                    }}
                  >
                    Copy
                  </button>
                ) : null}
              </div>
              {showCopied ? (
                <div className='text-xs font-medium text-green-800 text-center w-full mt-1'>
                  Code copied!
                </div>
              ) : null}
            </div>
            <div className='flex flex-col items-center justify-center leading-snug md:!items-end md:!text-right md:!justify-self-end order-2 md:!order-3'>
              <div className='text-sm font-medium'>
                {status === 'upcoming'
                  ? 'Sale starts in (UTC)'
                  : status === 'ended'
                  ? 'Sale ended'
                  : today
                  ? next
                    ? 'Time to next code (UTC)'
                    : 'Time until sale ends (UTC)'
                  : 'Daily code (UTC)'}
              </div>
              <div className='font-mono text-lg font-bold tabular-nums'>
                {status === 'ended' ? '00:00:00' : remainingTime}
              </div>
              <div className='text-xs opacity-80'>*excludes CMPM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleBanner;
