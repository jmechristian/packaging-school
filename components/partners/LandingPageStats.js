import React, { useState, useEffect, useCallback } from 'react';
import {
  ChartBarIcon,
  UsersIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  CursorArrowRaysIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const LandingPageStats = ({ pagePath, title, loading = false }) => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('30daysAgo');

  const dateRangeOptions = [
    { value: '30daysAgo', label: 'Last 30 Days' },
    { value: '60daysAgo', label: 'Last 60 Days' },
    { value: '90daysAgo', label: 'Last 90 Days' },
    { value: '180daysAgo', label: 'Last 6 Months' },
    { value: '365daysAgo', label: 'Last Year' },
    { value: '730daysAgo', label: 'Last 2 Years' },
  ];

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/analytics/landing-page-stats?pagePath=${encodeURIComponent(
          pagePath
        )}&startDate=${dateRange}&endDate=today`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching landing page stats:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [pagePath, dateRange]);

  useEffect(() => {
    if (pagePath && !loading) {
      fetchStats();
    }
  }, [pagePath, loading, fetchStats]);

  const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return minutes > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${remainingSeconds}s`;
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    return parseInt(num).toLocaleString();
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className='border border-slate-400 rounded-lg p-8 w-full'>
      <div className='flex items-center justify-between mb-5'>
        <div className='h-6 bg-gray-200 rounded w-64 animate-pulse'></div>
        <div className='flex items-center space-x-2'>
          <div className='h-4 bg-gray-200 rounded w-12 animate-pulse'></div>
          <div className='h-8 bg-gray-200 rounded w-32 animate-pulse'></div>
        </div>
      </div>

      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full'>
        {Array.from({ length: 4 }).map((_, index) => (
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

  // Error state
  if (error) {
    return (
      <div className='border border-slate-400 rounded-lg p-8 w-full'>
        <div className='flex items-center justify-between mb-5'>
          <div className='h4-base font-semibold text-gray-900'>
            Landing Page Analytics:{' '}
            <span className='text-base-brand'>{title}</span>
          </div>

          {/* Date Range Selector */}
          <div className='flex items-center space-x-2'>
            <label
              htmlFor='dateRange'
              className='text-sm font-medium text-gray-700'
            >
              Period:
            </label>
            <select
              id='dateRange'
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              disabled={isLoading}
              className='px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='text-red-600 text-center py-8'>
          <p>Failed to load analytics data</p>
          <p className='text-sm text-gray-500 mt-2'>{error}</p>
          <button
            onClick={fetchStats}
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show loading skeleton
  if (loading || isLoading) {
    return <LoadingSkeleton />;
  }

  // Show empty state
  if (!stats || !stats.totalStats) {
    return (
      <div className='border border-slate-400 rounded-lg p-8 w-full'>
        <div className='flex items-center justify-between mb-5'>
          <div className='h4-base font-semibold text-gray-900'>
            Landing Page Analytics:{' '}
            <span className='text-base-brand'>{title}</span>
          </div>

          {/* Date Range Selector */}
          <div className='flex items-center space-x-2'>
            <label
              htmlFor='dateRange'
              className='text-sm font-medium text-gray-700'
            >
              Period:
            </label>
            <select
              id='dateRange'
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              disabled={isLoading}
              className='px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='text-gray-500 text-center py-8'>
          No analytics data available for this page
        </div>
      </div>
    );
  }

  const analyticsStats = [
    {
      id: 1,
      name: 'Sessions',
      stat: formatNumber(stats.totalStats.sessions),
      icon: UsersIcon,
      description: 'Total sessions to this page',
    },
    {
      id: 2,
      name: 'Users',
      stat: formatNumber(stats.totalStats.totalUsers),
      icon: ChartBarIcon,
      description: 'Unique users who visited',
    },
    {
      id: 3,
      name: 'Bounce Rate',
      stat: `${stats.totalStats.bounceRate.toFixed(1)}%`,
      icon: ArrowTrendingUpIcon,
      description: 'Percentage of single-page sessions',
      isPercentage: true,
    },
    {
      id: 4,
      name: 'Avg Engagement Time',
      stat: formatDuration(
        stats.totalStats.engagementTime ||
          stats.totalStats.averageSessionDuration
      ),
      icon: ClockIcon,
      description: 'Average engagement time per active user',
    },
    {
      id: 5,
      name: 'Page Views',
      stat: formatNumber(stats.totalStats.screenPageViews),
      icon: EyeIcon,
      description: 'Total page views',
    },
    {
      id: 6,
      name: 'Conversions',
      stat: formatNumber(stats.totalStats.conversions),
      icon: CursorArrowRaysIcon,
      description: 'Goal completions',
    },
    {
      id: 7,
      name: 'Human Sessions',
      stat: formatNumber(
        stats.totalStats.humanSessions || stats.totalStats.sessions
      ),
      icon: UsersIcon,
      description: 'Sessions from real users (bot-filtered)',
      isHighlight: true,
    },
    {
      id: 8,
      name: 'Bot Traffic',
      stat: `${(stats.totalStats.botPercentage || 0).toFixed(1)}%`,
      icon: ExclamationTriangleIcon,
      description: 'Percentage of bot traffic detected',
      isPercentage: true,
      isWarning: true,
    },
  ];

  return (
    <div className='border border-slate-400 rounded-lg p-8 w-full'>
      <div className='flex items-center justify-between mb-5'>
        <div className='h4-base font-semibold text-gray-900'>
          Landing Page Analytics:{' '}
          <span className='text-base-brand'>{title}</span>
        </div>

        {/* Date Range Selector */}
        <div className='flex items-center space-x-2'>
          <label
            htmlFor='dateRange'
            className='text-sm font-medium text-gray-700'
          >
            Period:
          </label>
          <select
            id='dateRange'
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            disabled={isLoading}
            className='px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {dateRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='text-sm text-gray-600 mb-4'>
        <span className='font-medium'>Page:</span> {stats.pagePath} |
        <span className='font-medium ml-2'>Period:</span>{' '}
        {stats.dateRange.startDate} to {stats.dateRange.endDate}
      </div>

      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 w-full'>
        {analyticsStats.map((item) => (
          <div
            key={item.id}
            className={`relative overflow-hidden rounded-lg px-4 pb-5 pt-5 shadow sm:px-4 sm:pt-6 border w-full ${
              item.isWarning
                ? 'bg-red-50 border-red-200'
                : item.isHighlight
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-slate-200'
            }`}
          >
            <dt className='w-full'>
              <p
                className={`text-sm font-medium w-full whitespace-pre-wrap ${
                  item.isWarning
                    ? 'text-red-600'
                    : item.isHighlight
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}
              >
                {item.name}
              </p>
            </dt>
            <dd className='flex items-baseline w-full whitespace-pre-wrap'>
              <p
                className={`text-2xl font-semibold ${
                  item.isWarning
                    ? 'text-red-700'
                    : item.isHighlight
                    ? 'text-green-700'
                    : 'text-gray-900'
                }`}
              >
                {item.stat}
              </p>
            </dd>
            <div className='mt-2'>
              <p
                className={`text-xs ${
                  item.isWarning
                    ? 'text-red-500'
                    : item.isHighlight
                    ? 'text-green-500'
                    : 'text-gray-400'
                }`}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </dl>

      {/* Traffic Sources Breakdown */}
      {stats.breakdown && stats.breakdown.length > 0 && (
        <div className='mt-8'>
          <h4 className='text-lg font-semibold text-gray-900 mb-4'>
            Top Traffic Sources
          </h4>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Source
                  </th>
                  <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Medium
                  </th>
                  <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Country
                  </th>
                  <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Sessions
                  </th>
                  <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Users
                  </th>
                  <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Bounce Rate
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {stats.breakdown.slice(0, 10).map((source, index) => (
                  <tr key={index} className='hover:bg-gray-50'>
                    <td className='px-3 py-2 whitespace-nowrap text-xs text-gray-900'>
                      {source.source || 'Direct'}
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-xs text-gray-900'>
                      {source.medium || 'none'}
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-xs text-gray-900'>
                      {source.country || 'Unknown'}
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-xs text-gray-900'>
                      {formatNumber(source.sessions)}
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-xs text-gray-900'>
                      {formatNumber(source.totalUsers)}
                    </td>
                    <td className='px-3 py-2 whitespace-nowrap text-xs text-gray-900'>
                      {source.bounceRate.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPageStats;
