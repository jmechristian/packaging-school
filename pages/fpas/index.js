import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import Pagination from '../../components/shared/Pagination';

const Fpas = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Get sheetId from query params or use environment variable
  const sheetId =
    router.query.sheetId || process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const range =
    router.query.range || 'Database (excl. unavail./incorrect prods)';

  useEffect(() => {
    if (!sheetId) {
      setError(
        'Sheet ID is required. Please provide it as a query parameter or set NEXT_PUBLIC_GOOGLE_SHEET_ID.'
      );
      setIsLoading(false);
      return;
    }

    const fetchSheetData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/sheets/fpas?sheetId=${sheetId}&range=${encodeURIComponent(
            range
          )}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch sheet data');
        }

        const result = await response.json();

        // Use rawHeaders if available, otherwise use processed headers
        const headersToProcess = result.rawHeaders || result.headers || [];

        // Create display names for headers (shorten long location names)
        const displayHeaders = headersToProcess.map((header, index) => {
          // Use the header as-is if it exists and is meaningful
          let displayName = header;

          // If header is empty or just a placeholder, try to find a better name
          if (!header || header.trim() === '' || header.startsWith('Column ')) {
            // Check if we have a processed header that might be better
            const processedHeader = result.headers?.[index];
            if (processedHeader && !processedHeader.startsWith('Column ')) {
              displayName = processedHeader;
            } else {
              displayName = `Column ${index + 1}`;
            }
          }

          // Shorten very long location names for display
          if (
            displayName.includes('Urban Food Desert') ||
            displayName.includes('Rural Food Desert') ||
            displayName.includes('Tribal Grocery Store') ||
            displayName.includes('High-Density')
          ) {
            const match = displayName.match(/(CA\d+):\s*(.+?)(?:,\s*|$)/);
            if (match) {
              displayName = `${match[1]}: ${match[2].split(',')[0]}`;
            }
          }

          // Use the processed header as the key for data access
          const dataKey =
            result.headers?.[index] || header || `Column ${index + 1}`;

          return { original: dataKey, display: displayName };
        });

        setData(result.data || []);
        setHeaders(displayHeaders);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSheetData();
  }, [sheetId, range]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((row) =>
      headers.some((headerObj) => {
        const value = String(row[headerObj.original] || '').toLowerCase();
        return value.includes(searchTerm.toLowerCase());
      })
    );
  }, [data, headers, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) aValue = '';
      if (bValue === null || bValue === undefined) bValue = '';

      // Try numeric comparison first
      const aNum = parseFloat(aValue);
      const bNum = parseFloat(bValue);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
      }

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
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Reset to first page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortConfig]);

  const requestSort = (headerObj) => {
    const key = typeof headerObj === 'string' ? headerObj : headerObj.original;
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (headerObj) => {
    const key = typeof headerObj === 'string' ? headerObj : headerObj.original;
    if (sortConfig.key !== key) {
      return <ChevronUpIcon className='w-4 h-4 text-gray-400 opacity-50' />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className='w-4 h-4 text-blue-600' />
    ) : (
      <ChevronDownIcon className='w-4 h-4 text-blue-600' />
    );
  };

  // Format cell value for display
  const formatCellValue = (value, header) => {
    if (value === null || value === undefined || value === '') {
      return <span className='text-gray-400 italic'>—</span>;
    }

    const strValue = String(value).trim();

    // Handle error values
    if (strValue === '#REF!' || strValue === '#VALUE!' || strValue === '#N/A') {
      return (
        <span className='text-red-600 font-mono text-xs' title='Data error'>
          {strValue}
        </span>
      );
    }

    // Format prices
    if (header === 'Shopping Day' && strValue.startsWith('$')) {
      return <span className='font-semibold text-green-700'>{strValue}</span>;
    }

    // Format numeric values (shelf life days)
    if (
      header === 'Shelf life remaining (days)' ||
      header === 'USDA or other cited typical shelf life (days)'
    ) {
      const numValue = parseFloat(strValue);
      if (!isNaN(numValue)) {
        // Handle negative values (expired)
        if (numValue < 0) {
          return (
            <span className='text-red-600 font-semibold' title='Expired'>
              {Math.round(numValue)} days
            </span>
          );
        }
        // Format large numbers
        if (numValue > 1000) {
          return (
            <span className='text-blue-700 font-medium'>
              {Math.round(numValue)} days
            </span>
          );
        }
        return (
          <span className='text-gray-700'>{Math.round(numValue)} days</span>
        );
      }
    }

    // Check if it's a section header (new store location)
    if (
      (header &&
        header.includes('CA') &&
        strValue.includes('Urban Food Desert')) ||
      strValue.includes('Rural Food Desert') ||
      strValue.includes('Tribal Grocery Store') ||
      strValue.includes('High-Density')
    ) {
      return <span className='font-bold text-blue-800'>{strValue}</span>;
    }

    // Truncate very long values
    if (strValue.length > 50) {
      return (
        <span title={strValue} className='cursor-help'>
          {strValue.substring(0, 47)}...
        </span>
      );
    }

    return strValue;
  };

  // Check if row is a section header
  const isSectionHeader = (row) => {
    return headers.some((headerObj) => {
      const value = String(row[headerObj.original] || '').trim();
      return (
        value.includes('Urban Food Desert') ||
        value.includes('Rural Food Desert') ||
        value.includes('Tribal Grocery Store') ||
        value.includes('High-Density') ||
        value.includes('Foodmaxx') ||
        value.includes('Ralphs') ||
        value.includes('Vons') ||
        value.includes('Albertsons') ||
        value.includes('Target') ||
        value.includes('Superior Grocers')
      );
    });
  };

  // Check if row is a summary row
  const isSummaryRow = (row) => {
    return headers.some((headerObj) => {
      const value = String(row[headerObj.original] || '').trim();
      return (
        value.includes('Number of products analyzed') ||
        value.includes('Av. Shelf Life') ||
        value === 'USDA/Industry based average days remain'
      );
    });
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading sheet data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center max-w-md'>
          <div className='text-red-600 text-xl font-semibold mb-2'>Error</div>
          <p className='text-gray-700'>{error}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0 && !isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-gray-600'>No data found in the sheet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[1900px]'>
      <div className='mb-4 sm:mb-6'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-2'>FPAS Data</h1>
        <p className='text-sm sm:text-base text-gray-600'>
          Showing {sortedData.length} of {data.length} records
        </p>
      </div>

      {/* Search Controls */}
      <div className='bg-white border border-gray-300 rounded-lg p-3 sm:p-4 mb-4 shadow-sm'>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Search across all columns...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base'
          />
        </div>
      </div>

      {/* Table Container */}
      <div className='bg-white border border-gray-300 rounded-lg shadow-sm'>
        <div className='overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)] sm:max-h-[calc(100vh-300px)]'>
          <table
            className='divide-y divide-gray-200'
            style={{ minWidth: `${Math.max(headers.length * 120, 1200)}px` }}
          >
            <thead className='bg-gray-50 sticky top-0 z-10'>
              <tr>
                {headers.map((headerObj, index) => {
                  const header =
                    typeof headerObj === 'string'
                      ? headerObj
                      : headerObj.display || headerObj.original;
                  const originalHeader =
                    typeof headerObj === 'string'
                      ? headerObj
                      : headerObj.original;
                  // Determine column width based on header
                  const isLongHeader = header && header.length > 30;
                  const isLocationHeader =
                    header &&
                    (header.includes('CA') ||
                      header.includes('Urban') ||
                      header.includes('Rural'));
                  const isPriceHeader = header === 'Shopping Day';
                  const isNumericHeader =
                    header &&
                    (header.includes('Shelf life') || header.includes('USDA'));

                  let colClass =
                    'px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors';

                  if (isLocationHeader) {
                    colClass += ' min-w-[200px] sm:min-w-[250px]';
                  } else if (isPriceHeader) {
                    colClass += ' min-w-[100px]';
                  } else if (isNumericHeader) {
                    colClass += ' min-w-[120px]';
                  } else if (isLongHeader) {
                    colClass += ' min-w-[150px]';
                  }

                  return (
                    <th
                      key={index}
                      scope='col'
                      className={colClass}
                      onClick={() => requestSort(headerObj)}
                    >
                      <div className='flex items-start space-x-1'>
                        <span
                          className='break-words leading-tight'
                          title={originalHeader}
                        >
                          {header || `Column ${index + 1}`}
                        </span>
                        <span className='flex-shrink-0 mt-0.5'>
                          {getSortIcon(headerObj)}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {paginatedData.map((row, rowIndex) => {
                const isHeader = isSectionHeader(row);
                const isSummary = isSummaryRow(row);

                let rowClass = 'hover:bg-gray-50 transition-colors';
                if (isHeader) {
                  rowClass =
                    'bg-blue-50 hover:bg-blue-100 font-semibold border-t-2 border-blue-300';
                } else if (isSummary) {
                  rowClass =
                    'bg-yellow-50 hover:bg-yellow-100 border-t border-yellow-300';
                }

                return (
                  <tr key={rowIndex} className={rowClass}>
                    {headers.map((headerObj, colIndex) => {
                      const originalHeader =
                        typeof headerObj === 'string'
                          ? headerObj
                          : headerObj.original;
                      const displayHeader =
                        typeof headerObj === 'string'
                          ? headerObj
                          : headerObj.display || headerObj.original;
                      const value = row[originalHeader];
                      const isLocationCol =
                        displayHeader &&
                        (displayHeader.includes('CA') ||
                          displayHeader.includes('Urban') ||
                          displayHeader.includes('Rural'));
                      const isPriceCol = displayHeader === 'Shopping Day';
                      const isNumericCol =
                        displayHeader &&
                        (displayHeader.includes('Shelf life') ||
                          displayHeader.includes('USDA'));

                      let cellClass =
                        'px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b border-gray-100';

                      if (isHeader) {
                        cellClass += ' text-blue-900';
                      } else if (isSummary) {
                        cellClass += ' text-yellow-900 font-medium';
                      } else {
                        cellClass += ' text-gray-900';
                      }

                      if (isLocationCol) {
                        cellClass += ' max-w-[250px]';
                      } else if (isPriceCol) {
                        cellClass += ' text-right';
                      } else if (isNumericCol) {
                        cellClass += ' text-right';
                      }

                      return (
                        <td key={colIndex} className={cellClass}>
                          <div
                            className={isLocationCol ? 'truncate' : ''}
                            title={value ? String(value) : ''}
                          >
                            {formatCellValue(value, displayHeader)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='bg-gray-50 px-3 sm:px-4 py-3 border-t border-gray-200'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0'>
              <div className='text-xs sm:text-sm text-gray-700 text-center sm:text-left'>
                Showing{' '}
                <span className='font-medium'>
                  {startIndex + 1} to {Math.min(endIndex, sortedData.length)}
                </span>{' '}
                of <span className='font-medium'>{sortedData.length}</span>{' '}
                results
              </div>
              <Pagination
                totalItems={sortedData.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fpas;
