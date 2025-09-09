import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const getStats = (clickStats) => [
  {
    id: 1,
    name: 'Total Clicks Last 90 Days',
    stat: clickStats?.totalClicks?.currentPeriodClicks?.toLocaleString() || '0',
    icon: UsersIcon,
    change: `${clickStats?.totalClicks?.percentageChange || 0}%`,
    changeType: clickStats?.totalClicks?.changeType || 'no-change',
  },
  {
    id: 2,
    name: 'Add to Cart Clicks Last 90 Days',
    stat:
      clickStats?.addToCartClicks?.currentPeriodClicks?.toLocaleString() || '0',
    icon: EnvelopeOpenIcon,
    change: `${clickStats?.addToCartClicks?.percentageChange || 0}%`,
    changeType: clickStats?.addToCartClicks?.changeType || 'no-change',
  },
  {
    id: 3,
    name: 'Course View Clicks Last 90 Days',
    stat:
      clickStats?.courseViewClicks?.currentPeriodClicks?.toLocaleString() ||
      '0',
    icon: CursorArrowRaysIcon,
    change: `${clickStats?.courseViewClicks?.percentageChange || 0}%`,
    changeType: clickStats?.courseViewClicks?.changeType || 'no-change',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Stats({ title, clickStats, loading = false }) {
  const stats = getStats(clickStats);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className='border border-slate-400 rounded-lg p-8 w-full'>
      <div className='h4-base font-semibold text-gray-900 mb-5'>
        <div className='h-6 bg-gray-200 rounded w-48 animate-pulse'></div>
      </div>

      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className='relative overflow-hidden rounded-lg bg-white px-4 pb-5 pt-5 shadow sm:px-4 sm:pt-6 border border-slate-200 w-full'
          >
            <dt className='w-full'>
              <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse mb-4'></div>
            </dt>
            <dd className='flex items-baseline w-full'>
              <div className='h-8 bg-gray-200 rounded w-16 animate-pulse'></div>
              <div className='ml-2 h-5 bg-gray-200 rounded w-12 animate-pulse'></div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );

  // Show loading skeleton
  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className='border border-slate-400 rounded-lg p-8 w-full'>
      <div className='h4-base font-semibold text-gray-900 mb-5'>
        Course Stats: <span className='text-base-brand'>{title}</span>
      </div>

      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full'>
        {stats.map((item) => (
          <div
            key={item.id}
            className='relative overflow-hidden rounded-lg bg-white px-4 pb-5 pt-5 shadow sm:px-4 sm:pt-6 border border-slate-200 w-full'
          >
            <dt className='w-full'>
              {/* <div className='absolute rounded-md bg-base-brand p-3 w-16 h-16'>
                <item.icon aria-hidden='true' className='size-6 text-white' />
              </div> */}
              <p className='text-sm font-medium text-gray-500 w-full whitespace-pre-wrap'>
                {item.name}
              </p>
            </dt>
            <dd className='flex items-baseline w-full whitespace-pre-wrap'>
              <p className='text-2xl font-semibold text-gray-900'>
                {item.stat}
              </p>
              <p
                className={classNames(
                  item.changeType === 'increase'
                    ? 'text-green-600'
                    : item.changeType === 'decrease'
                    ? 'text-red-600'
                    : 'text-gray-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowUpIcon
                    aria-hidden='true'
                    className='w-5 h-5 self-center text-green-500'
                  />
                ) : item.changeType === 'decrease' ? (
                  <ArrowDownIcon
                    aria-hidden='true'
                    className='w-5 h-5 self-center text-red-500'
                  />
                ) : null}

                <span className='sr-only'>
                  {' '}
                  {item.changeType === 'increase'
                    ? 'Increased'
                    : item.changeType === 'decrease'
                    ? 'Decreased'
                    : 'No change'}{' '}
                  by{' '}
                </span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
