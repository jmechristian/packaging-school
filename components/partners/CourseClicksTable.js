import React, { useState, useMemo } from 'react';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/20/solid';

const CourseClicksTable = ({ courseClicks, loading = false }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const sortedClicks = useMemo(() => {
    return [...courseClicks].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle date sorting
      if (sortConfig.key === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);

        // Handle invalid dates
        if (isNaN(aValue.getTime())) aValue = new Date(0);
        if (isNaN(bValue.getTime())) bValue = new Date(0);

        // For dates, compare directly
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }

      // Handle null/undefined values for non-date fields
      if (aValue === null || aValue === undefined) aValue = '';
      if (bValue === null || bValue === undefined) bValue = '';

      // Convert to strings for comparison
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [courseClicks, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedClicks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClicks = sortedClicks.slice(startIndex, endIndex);

  // Reset to first page when sorting changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronUpIcon className='w-4 h-4 text-gray-400' />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className='w-4 h-4 text-blue-600' />
    ) : (
      <ChevronDownIcon className='w-4 h-4 text-blue-600' />
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncatePath = (path) => {
    if (!path) return 'N/A';
    return path.length > 30 ? `${path.substring(0, 30)}...` : path;
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className='border border-slate-400 rounded-lg p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='h-6 bg-gray-200 rounded w-48 animate-pulse'></div>
        <div className='h-10 bg-gray-200 rounded w-32 animate-pulse'></div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Date
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Click Type
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Country
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                IP Address
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6'>
                Page
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6'>
                Next Path
              </th>
              <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Format
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td className='px-3 py-2 whitespace-nowrap'>
                  <div className='h-4 bg-gray-200 rounded w-24 animate-pulse'></div>
                </td>
                <td className='px-3 py-2'>
                  <div className='h-6 bg-gray-200 rounded w-20 animate-pulse'></div>
                </td>
                <td className='px-3 py-2 whitespace-nowrap'>
                  <div className='h-4 bg-gray-200 rounded w-16 animate-pulse'></div>
                </td>
                <td className='px-3 py-2 whitespace-nowrap'>
                  <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div>
                </td>
                <td className='px-3 py-2'>
                  <div className='h-4 bg-gray-200 rounded w-32 animate-pulse'></div>
                </td>
                <td className='px-3 py-2'>
                  <div className='h-4 bg-gray-200 rounded w-28 animate-pulse'></div>
                </td>
                <td className='px-3 py-2 whitespace-nowrap'>
                  <div className='h-4 bg-gray-200 rounded w-16 animate-pulse'></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const exportToCSV = () => {
    if (!courseClicks || courseClicks.length === 0) return;

    // Define CSV headers
    const headers = [
      'Date',
      'Click Type',
      'Country',
      'IP Address',
      'Page',
      'Next Path',
      'Format',
    ];

    // Convert data to CSV format
    const csvContent = [
      headers.join(','),
      ...sortedClicks.map((click) =>
        [
          formatDate(click.createdAt),
          click.nextPath?.includes('learn.packagingschool.com')
            ? 'Add To Cart'
            : 'Course View',
          click.country || 'N/A',
          click.ipAddress || 'N/A',
          `"${(click.page || 'N/A').replace(/"/g, '""')}"`, // Escape quotes in page field
          `"${(click.nextPath || 'N/A').replace(/"/g, '""')}"`, // Escape quotes in nextPath field
          click.format || 'N/A',
        ].join(',')
      ),
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `course-clicks-${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Show loading skeleton
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Show empty state
  if (!courseClicks || courseClicks.length === 0) {
    return (
      <div className='border border-slate-400 rounded-lg p-8'>
        <div className='text-base font-semibold text-gray-900 mb-5'>
          Course Clicks Data
        </div>
        <div className='text-gray-500 text-center py-8'>
          No course clicks data available
        </div>
      </div>
    );
  }

  return (
    <div className='border border-slate-400 rounded-lg p-6'>
      <div className='flex items-center justify-between mb-4'>
        <div className='text-base font-semibold text-gray-900'>
          Course Clicks Data ({courseClicks.length} clicks)
        </div>
        <button
          onClick={exportToCSV}
          className='flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          <ArrowDownTrayIcon className='w-4 h-4' />
          <span>Export CSV</span>
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                onClick={() => requestSort('createdAt')}
              >
                <div className='flex items-center space-x-1'>
                  <span>Date</span>
                  {getSortIcon('createdAt')}
                </div>
              </th>
              <th
                scope='col'
                className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                onClick={() => requestSort('nextPath')}
              >
                <div className='flex items-center space-x-1'>
                  <span>Click Type</span>
                  {getSortIcon('nextPath')}
                </div>
              </th>
              <th
                scope='col'
                className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100'
                onClick={() => requestSort('country')}
              >
                <div className='flex items-center space-x-1'>
                  <span>Country</span>
                  {getSortIcon('country')}
                </div>
              </th>
              <th
                scope='col'
                className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                IP Address
              </th>
              <th
                scope='col'
                className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6'
              >
                Page
              </th>
              <th
                scope='col'
                className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6'
              >
                Next Path
              </th>
              <th
                scope='col'
                className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Format
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {currentClicks.map((click, index) => (
              <tr key={click.id || index} className='hover:bg-gray-50'>
                <td className='px-3 py-2 whitespace-nowrap text-xs text-gray-900'>
                  {formatDate(click.createdAt)}
                </td>
                <td className='px-3 py-2 text-xs text-gray-900'>
                  <div className='max-w-[200px]'>
                    {click.nextPath?.includes('learn.packagingschool.com') ? (
                      <span className='inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800'>
                        Add To Cart
                      </span>
                    ) : (
                      <span className='inline-block px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800'>
                        Course View
                      </span>
                    )}
                  </div>
                </td>
                <td className='px-3 py-2 whitespace-nowrap text-xs text-gray-900'>
                  {click.country || 'N/A'}
                </td>
                <td className='px-3 py-2 whitespace-nowrap text-xs text-gray-900'>
                  {click.ipAddress || 'N/A'}
                </td>
                <td className='px-3 py-2 text-xs text-gray-900 break-words w-1/6 max-w-0'>
                  <div className='truncate' title={click.page || 'N/A'}>
                    {click.page || 'N/A'}
                  </div>
                </td>
                <td className='px-3 py-2 text-xs text-gray-900 break-words w-1/6 max-w-0'>
                  <div className='truncate' title={click.nextPath || 'N/A'}>
                    {click.nextPath || 'N/A'}
                  </div>
                </td>
                <td className='px-3 py-2 whitespace-nowrap text-xs text-gray-900'>
                  {click.format || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between mt-4'>
          <div className='text-sm text-gray-700'>
            Showing {startIndex + 1} to{' '}
            {Math.min(endIndex, sortedClicks.length)} of {sortedClicks.length}{' '}
            results
          </div>
          <div className='flex items-center space-x-2'>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className='px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
            >
              <ChevronLeftIcon className='w-4 h-4' />
            </button>

            {/* Page numbers */}
            <div className='flex items-center space-x-1'>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 text-sm border rounded-md ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className='px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
            >
              <ChevronRightIcon className='w-4 h-4' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseClicksTable;
