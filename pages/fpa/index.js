import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/legacy/image';

const Fpas = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [customViews, setCustomViews] = useState([]);
  const [newViewName, setNewViewName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  // Get sheetId from query params or use environment variable
  const sheetId =
    router.query.sheetId || process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const range =
    router.query.range || 'with photo names';

  // Load sheet data
  useEffect(() => {
    if (!sheetId) {
      setError(
        'Sheet ID is required. Please provide it as a query parameter or set NEXT_PUBLIC_GOOGLE_SHEET_ID.',
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
            range,
          )}`,
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
        // Initialize visible columns to all headers when data loads
        setVisibleColumns(
          displayHeaders.map((h) => (typeof h === 'string' ? h : h.original)),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSheetData();
  }, [sheetId, range]);

  // Load saved custom column views from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem('fpaCustomViews');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCustomViews(
            parsed
              .filter(
                (v) =>
                  v && typeof v.name === 'string' && Array.isArray(v.columns),
              )
              .slice(0, 3),
          );
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((row) =>
      headers.some((headerObj) => {
        const value = String(row[headerObj.original] || '').toLowerCase();
        return value.includes(searchTerm.toLowerCase());
      }),
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

  // Show all sorted results without pagination
  const paginatedData = sortedData;

  // Column visibility helpers
  const isColumnVisible = (headerObj) => {
    const key = typeof headerObj === 'string' ? headerObj : headerObj.original;
    // If no visibility state yet, default to visible
    if (!visibleColumns || visibleColumns.length === 0) return true;
    return visibleColumns.includes(key);
  };

  const toggleColumnVisibility = (headerKey) => {
    setVisibleColumns((prev) => {
      if (!prev || prev.length === 0) {
        // If uninitialized, start from all current headers
        const allKeys = headers.map((h) =>
          typeof h === 'string' ? h : h.original,
        );
        return allKeys.filter((key) => key !== headerKey);
      }

      if (prev.includes(headerKey)) {
        // Prevent hiding all columns
        if (prev.length === 1) return prev;
        return prev.filter((key) => key !== headerKey);
      }
      return [...prev, headerKey];
    });
  };

  const showAllColumns = () => {
    setVisibleColumns(
      headers.map((h) => (typeof h === 'string' ? h : h.original)),
    );
  };

  const hideAllNonKeyColumns = () => {
    // Example "compact" view: keep a small set of important columns
    const importantKeywords = [
      'UPC',
      'Product',
      'Brand',
      'Store',
      'Shopping Day',
      'Shelf life remaining (days)',
    ];
    const compactKeys = headers
      .map((h) => (typeof h === 'string' ? h : h.original))
      .filter((key) =>
        importantKeywords.some((k) =>
          String(key).toLowerCase().includes(k.toLowerCase()),
        ),
      );
    if (compactKeys.length > 0) {
      setVisibleColumns(compactKeys);
    }
  };

  const saveCustomViewsToStorage = (views) => {
    setCustomViews(views);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('fpaCustomViews', JSON.stringify(views));
      } catch {
        // ignore storage errors
      }
    }
  };

  const handleSaveCurrentView = () => {
    const trimmedName = newViewName.trim();
    if (!trimmedName || !visibleColumns || visibleColumns.length === 0) {
      return;
    }

    setNewViewName(trimmedName);

    saveCustomViewsToStorage(
      ((prev) => {
        const currentViews = Array.isArray(prev) ? prev : [];
        const existingIndex = currentViews.findIndex(
          (v) => v.name.toLowerCase() === trimmedName.toLowerCase(),
        );

        const newView = {
          name: trimmedName,
          columns: visibleColumns,
        };

        if (existingIndex !== -1) {
          const updated = [...currentViews];
          updated[existingIndex] = newView;
          return updated;
        }

        if (currentViews.length >= 3) {
          // Prevent creating more than 3 uniquely named views
          return currentViews;
        }

        return [...currentViews, newView];
      })(customViews),
    );
  };

  const applyCustomView = (viewName) => {
    if (!viewName) return;
    const view = customViews.find(
      (v) => v.name.toLowerCase() === viewName.toLowerCase(),
    );
    if (view && Array.isArray(view.columns) && view.columns.length > 0) {
      setVisibleColumns(view.columns);
    }
  };

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

  // Check if row is a section header (location divider row), not just any row
  // with a location phrase (e.g. "Community type" column values).
  const isSectionHeader = (row) => {
    return headers.some((headerObj) => {
      const headerName =
        typeof headerObj === 'string'
          ? headerObj
          : (headerObj.display || headerObj.original || '');
      const value = String(row[headerObj.original] || '').trim();
      const isLocationColumn =
        headerName.includes('CA') ||
        (headerName.includes('Urban') && headerName.includes('Rural')) ||
        headerName.includes('Location') ||
        headerName.includes('Store');
      if (!isLocationColumn) return false;
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
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-[96vw]'>
      <div className='mb-4 sm:mb-6 flex items-end justify-between gap-6'>
        <div>
          <Image
            src='https://packschool.s3.us-east-1.amazonaws.com/fpa-350x233-1.png'
            alt='FPA Logo'
            width={350}
            height={100}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-bold'>FPA - WIC - CA - 2025</h1>
          <p className='text-sm sm:text-base text-gray-600'>
            Showing {sortedData.length} of {data.length} records
          </p>
          <p className='text-xs text-gray-500' title={`Sheet: ${sheetId}`}>
            Range: {range}
          </p>
        </div>
      </div>

      {/* Search + Column Controls */}
      <div className='space-y-3 sm:space-y-4 mb-4'>
        {/* Search Controls */}
        <div className='bg-white border border-gray-300 rounded-lg p-3 sm:p-4 shadow-sm'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
            <div className='relative flex-1'>
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

            {/* Quick View Buttons + Custom Views + Open Modal */}
            <div className='flex flex-wrap items-center gap-2'>
              <button
                type='button'
                onClick={showAllColumns}
                className='text-xs sm:text-sm px-2 py-1 rounded border border-gray-300 bg-gray-50 hover:bg-gray-100'
              >
                Show all
              </button>
              <button
                type='button'
                onClick={hideAllNonKeyColumns}
                className='text-xs sm:text-sm px-2 py-1 rounded border border-gray-300 bg-gray-50 hover:bg-gray-100'
              >
                Compact view
              </button>

              {customViews.length > 0 && (
                <select
                  className='text-xs sm:text-sm px-3 pr-6 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50 min-w-[130px]'
                  defaultValue=''
                  onChange={(e) => {
                    applyCustomView(e.target.value);
                    e.target.value = '';
                  }}
                >
                  <option value='' disabled>
                    Custom
                  </option>
                  {customViews.map((view) => (
                    <option key={view.name} value={view.name}>
                      {view.name}
                    </option>
                  ))}
                </select>
              )}

              <button
                type='button'
                onClick={() => setIsColumnModalOpen(true)}
                className='text-xs sm:text-sm px-2.5 py-1.5 rounded border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 font-medium'
              >
                Columns…
              </button>
              <span className='text-xs text-gray-500'>
                ({visibleColumns?.length || headers.length} visible)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className='bg-white border border-gray-300 rounded-lg shadow-sm'>
        <div className='overflow-x-auto'>
          <table
            className='divide-y divide-gray-200'
            style={{ minWidth: `${Math.max(headers.length * 180, 1600)}px` }}
          >
            <thead className='bg-gray-50 sticky top-0 z-10'>
              <tr>
                {headers
                  .filter((headerObj) => isColumnVisible(headerObj))
                  .map((headerObj, index) => {
                    const header =
                      typeof headerObj === 'string'
                        ? headerObj
                        : headerObj.display || headerObj.original;
                    const originalHeader =
                      typeof headerObj === 'string'
                        ? headerObj
                        : headerObj.original;
                    // Determine column width based on header
                    const isLongHeader = header && header.length > 24;
                    const isLocationHeader =
                      header &&
                      (header.includes('CA') ||
                        header.includes('Urban') ||
                        header.includes('Rural'));
                    const isPriceHeader = header === 'Shopping Day';
                    const isNumericHeader =
                      header &&
                      (header.includes('Shelf life') ||
                        header.includes('USDA'));

                    let colClass =
                      'px-3 sm:px-4 lg:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors';

                    if (isLocationHeader) {
                      colClass += ' min-w-[260px] sm:min-w-[320px]';
                    } else if (isPriceHeader) {
                      colClass += ' min-w-[140px]';
                    } else if (isNumericHeader) {
                      colClass += ' min-w-[140px]';
                    } else if (isLongHeader) {
                      colClass += ' min-w-[200px]';
                    }

                    return (
                      <th
                        key={originalHeader || index}
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
                    {headers
                      .filter((headerObj) => isColumnVisible(headerObj))
                      .map((headerObj, colIndex) => {
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
                          'px-3 sm:px-4 lg:px-5 py-2 sm:py-3 text-xs sm:text-sm border-b border-gray-100';

                        if (isHeader) {
                          cellClass += ' text-blue-900';
                        } else if (isSummary) {
                          cellClass += ' text-yellow-900 font-medium';
                        } else {
                          cellClass += ' text-gray-900';
                        }

                        if (isLocationCol) {
                          cellClass += ' max-w-[320px]';
                        } else if (isPriceCol) {
                          cellClass += ' text-right';
                        } else if (isNumericCol) {
                          cellClass += ' text-right';
                        }

                        return (
                          <td
                            key={originalHeader || colIndex}
                            className={cellClass}
                          >
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
      </div>

      {/* Column Selector Modal */}
      {isColumnModalOpen && (
        <div className='fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40'>
          <div className='bg-white rounded-lg shadow-xl max-w-[90vw] w-full mx-4 max-h-[90vh] flex flex-col'>
            <div className='flex items-start justify-between px-4 py-3 border-b border-gray-200'>
              <div>
                <h2 className='text-sm sm:text-base font-semibold text-gray-900'>
                  Configure columns
                </h2>
                <p className='mt-0.5 text-xs text-gray-500'>
                  Choose which columns to show. You can refine these into saved
                  views later.
                </p>
              </div>
              <button
                type='button'
                onClick={() => setIsColumnModalOpen(false)}
                className='text-gray-400 hover:text-gray-600 text-xl leading-none px-1'
                aria-label='Close'
              >
                ×
              </button>
            </div>

            <div className='px-4 py-3 border-b border-gray-100 flex flex-wrap items-center gap-3 sm:gap-4'>
              <div className='flex flex-wrap items-center gap-2'>
                <button
                  type='button'
                  onClick={showAllColumns}
                  className='text-xs sm:text-sm px-2 py-1 rounded border border-gray-300 bg-gray-50 hover:bg-gray-100'
                >
                  Show all
                </button>
                <button
                  type='button'
                  onClick={hideAllNonKeyColumns}
                  className='text-xs sm:text-sm px-2 py-1 rounded border border-gray-300 bg-gray-50 hover:bg-gray-100'
                >
                  Compact view
                </button>
                <span className='text-xs text-gray-500'>
                  ({visibleColumns?.length || headers.length} visible of{' '}
                  {headers.length})
                </span>
              </div>

              <div className='flex-1 flex flex-col items-start sm:items-end gap-1'>
                <div className='flex flex-wrap items-center gap-2'>
                  <input
                    type='text'
                    value={newViewName}
                    onChange={(e) => setNewViewName(e.target.value)}
                    maxLength={40}
                    placeholder='Name this layout…'
                    className='flex-shrink min-w-[140px] max-w-[220px] text-xs sm:text-sm px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                  />
                  <button
                    type='button'
                    onClick={handleSaveCurrentView}
                    disabled={
                      !newViewName.trim() ||
                      !visibleColumns ||
                      visibleColumns.length === 0 ||
                      (customViews.length >= 3 &&
                        !customViews.some(
                          (v) =>
                            v.name.toLowerCase() ===
                            newViewName.trim().toLowerCase(),
                        ))
                    }
                    className={`text-xs sm:text-sm px-3 py-1.5 rounded border ${
                      !newViewName.trim() ||
                      !visibleColumns ||
                      visibleColumns.length === 0 ||
                      (customViews.length >= 3 &&
                        !customViews.some(
                          (v) =>
                            v.name.toLowerCase() ===
                            newViewName.trim().toLowerCase(),
                        ))
                        ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                        : 'border-blue-600 text-blue-600 bg-white hover:bg-blue-50'
                    }`}
                  >
                    Save layout
                  </button>
                </div>
                <span className='text-[10px] text-gray-400'>
                  You can save up to 3 custom layouts. Reuse a name to update an
                  existing one.
                </span>
              </div>
            </div>

            <div className='px-4 py-3 overflow-y-auto flex-1'>
              <div className='grid grid-cols-3 gap-2 text-xs sm:text-sm'>
                {headers.map((headerObj, index) => {
                  const originalKey =
                    typeof headerObj === 'string'
                      ? headerObj
                      : headerObj.original;
                  const displayName =
                    typeof headerObj === 'string'
                      ? headerObj
                      : headerObj.display || headerObj.original;

                  return (
                    <label
                      key={originalKey || index}
                      className='inline-flex items-center gap-1 cursor-pointer'
                      title={originalKey}
                    >
                      <input
                        type='checkbox'
                        className='h-3 w-3 sm:h-4 sm:w-4 text-blue-600 border-gray-300 rounded'
                        checked={isColumnVisible(headerObj)}
                        onChange={() => toggleColumnVisibility(originalKey)}
                      />
                      <span className='truncate'>{displayName}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className='px-4 py-3 border-t border-gray-200 flex justify-end gap-2'>
              <button
                type='button'
                className='text-xs sm:text-sm px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50'
                onClick={() => setIsColumnModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fpas;
