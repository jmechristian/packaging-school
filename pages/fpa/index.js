import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
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
  const [activePreset, setActivePreset] = useState('');
  const [onlyAuditedFilterOn, setOnlyAuditedFilterOn] = useState(true);
  const [columnFilters, setColumnFilters] = useState({});
  const [openFilterColumn, setOpenFilterColumn] = useState(null);

  // Get sheetId from query params or use environment variable
  const sheetId =
    router.query.sheetId || process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const range = router.query.range || 'with photo names';

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

  // Close column filter dropdown when clicking outside
  useEffect(() => {
    if (!openFilterColumn) return;
    const close = (e) => {
      if (e.target.closest?.('[data-filter-column]') == null) {
        setOpenFilterColumn(null);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [openFilterColumn]);

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

  // Apply audited row filter first when toggle is on (hides certain column [6] values)
  const dataAfterPreset = useMemo(() => {
    if (!onlyAuditedFilterOn || !headers.length) return data;
    const colKey = headers[6]?.original;
    if (!colKey) return data;
    const exclude = [
      'wrong product audited',
      'product not available',
      'not a valid alternative',
    ];
    return data.filter((row) => {
      const v = String(row[colKey] ?? '')
        .trim()
        .toLowerCase();
      return !exclude.includes(v);
    });
  }, [data, headers, onlyAuditedFilterOn]);

  // Unique values per column (from data after preset) for filter dropdowns
  const columnUniqueValues = useMemo(() => {
    const out = {};
    headers.forEach((headerObj) => {
      const key =
        typeof headerObj === 'string' ? headerObj : headerObj.original;
      const values = new Set(
        dataAfterPreset.map((row) => {
          const v = row[key];
          return v === null || v === undefined || String(v).trim() === ''
            ? '(Blank)'
            : String(v).trim();
        }),
      );
      out[key] = [...values].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: 'base' }),
      );
    });
    return out;
  }, [headers, dataAfterPreset]);

  // Apply per-column filters
  const dataAfterColumnFilters = useMemo(() => {
    const keys = Object.keys(columnFilters).filter(
      (k) => columnFilters[k] && columnFilters[k].length > 0,
    );
    if (keys.length === 0) return dataAfterPreset;
    return dataAfterPreset.filter((row) => {
      return keys.every((colKey) => {
        const allowed = columnFilters[colKey];
        if (!allowed || allowed.length === 0) return true;
        const cell =
          row[colKey] === null || row[colKey] === undefined
            ? '(Blank)'
            : String(row[colKey]).trim();
        return allowed.includes(cell);
      });
    });
  }, [dataAfterPreset, columnFilters]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return dataAfterColumnFilters;

    return dataAfterColumnFilters.filter((row) =>
      headers.some((headerObj) => {
        const value = String(row[headerObj.original] || '').toLowerCase();
        return value.includes(searchTerm.toLowerCase());
      }),
    );
  }, [dataAfterColumnFilters, headers, searchTerm]);

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

  // Case Study 1 preset: show only these columns (matched by title)
  const CASE_STUDY_1_COLUMN_TITLES = [
    'Community Type',
    'Store ID',
    'Item #',
    'Photo Names',
    'WIC Category',
    'Product to be audited',
    'Selected Product',
    'Brand',
    'Note the alternative',
    'Packaged in Flexible Plastic? (consumer-facing material, not including labels or shrink bands)',
    'Packaging system likely includes independent flexible plastic packaging',
    'Predominant Packaging Material',
    'Packaging Format',
  ];

  const applyCaseStudy1Columns = () => {
    const normalize = (s) =>
      String(s ?? '')
        .trim()
        .toLowerCase();
    const matchTitles = CASE_STUDY_1_COLUMN_TITLES.map(normalize);
    const keys = headers
      .map((h) => (typeof h === 'string' ? h : h.original))
      .filter((key) => matchTitles.some((t) => normalize(key) === t));
    if (keys.length > 0) {
      setVisibleColumns(keys);
    }
  };

  // Case Study 2 preset: show only these columns (matched by title)
  const CASE_STUDY_2_COLUMN_TITLES = [
    'Community Type',
    'Store ID',
    'Item #',
    'Photo Names',
    'WIC Category',
    'Product to be audited',
    'Selected Product',
    'Brand',
    'Note the alternative',
    'Shelf life listed on package',
    'Date of Audit',
    'Calculated shelf life remaining in pantry (days)',
    'Calculated shelf life remaining if refrigerated (days)',
    'Calculated shelf life remaining if frozen (days)',
    'Calculated shelf life remaining (days) regardless of storage method',
    'Cited typical shelf life in pantry (days)',
    'Cited typical shelf life if refrigerated (days)',
    'Cited typical shelf life if frozen (days)',
    'Cited typical shelf life (days) regardless of storage method',
    'Packaging Material Relevant for Shelf Life',
    'Remaining-to-typical shelf life ratio',
    'Percentage above (+) or below (-) cited typical shelf life (%)',
  ];

  const applyCaseStudy2Columns = () => {
    const normalize = (s) =>
      String(s ?? '')
        .trim()
        .toLowerCase();
    const matchTitles = CASE_STUDY_2_COLUMN_TITLES.map(normalize);
    const keys = headers
      .map((h) => (typeof h === 'string' ? h : h.original))
      .filter((key) => matchTitles.some((t) => normalize(key) === t));
    if (keys.length > 0) {
      setVisibleColumns(keys);
    }
  };

  // Case Study 3 preset: show only these columns (matched by title)
  const CASE_STUDY_3_COLUMN_TITLES = [
    'Community Type',
    'Store ID',
    'Item #',
    'Photo Names',
    'WIC Category',
    'Product to be audited',
    'Selected Product',
    'Brand',
    'Is there a WIC-approved alternative package?',
    'Note the alternative',
    'Unit (each, oz, etc.)',
    'Unit Quantity',
    'Price ($)',
    'Price per unit ($/unit)',
    'More than 1 WIC-approved option?',
    'Packaged in Flexible Plastic? (consumer-facing material, not including labels or shrink bands)',
    'Packaging system likely includes independent flexible plastic packaging',
    'Predominant Packaging Material',
    'Packaging Format',
  ];

  const applyCaseStudy3Columns = () => {
    const normalize = (s) =>
      String(s ?? '')
        .trim()
        .toLowerCase();
    const matchTitles = CASE_STUDY_3_COLUMN_TITLES.map(normalize);
    const keys = headers
      .map((h) => (typeof h === 'string' ? h : h.original))
      .filter((key) => matchTitles.some((t) => normalize(key) === t));
    if (keys.length > 0) {
      setVisibleColumns(keys);
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

  const toggleColumnFilterValue = (colKey, value) => {
    const all = columnUniqueValues[colKey] || [];
    setColumnFilters((prev) => {
      const current = prev[colKey] || [];
      const isCurrentlyIncluded =
        current.length === 0 || current.includes(value);
      if (isCurrentlyIncluded) {
        if (current.length === 0) {
          return { ...prev, [colKey]: all.filter((v) => v !== value) };
        }
        return { ...prev, [colKey]: current.filter((v) => v !== value) };
      }
      return { ...prev, [colKey]: [...current, value] };
    });
  };

  const clearColumnFilter = (colKey) => {
    setColumnFilters((prev) => ({ ...prev, [colKey]: [] }));
    setOpenFilterColumn(null);
  };

  const isColumnFilterActive = (colKey) => {
    const selected = columnFilters[colKey];
    return !!(selected && selected.length > 0);
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

    // Style like a section header only when column is a location header (e.g. CA1: ...), not "Community type"
    const isLocationHeader =
      header &&
      (header.includes('CA') ||
        header.includes('Location') ||
        header.includes('Store'));
    if (
      isLocationHeader &&
      (strValue.includes('Urban Food Desert') ||
        strValue.includes('Rural Food Desert') ||
        strValue.includes('Tribal Grocery Store') ||
        strValue.includes('High-Density'))
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
          : headerObj.display || headerObj.original || '';
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
    <>
      <Head>
        <title>FPA | The Packaging School</title>
      </Head>
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
          <div className='flex flex-col gap-0'>
            <h1 className='text-2xl font-bold'>FPA - WIC - CA - 2025</h1>
            <p className='text-sm  text-gray-600'>
              Showing {sortedData.length} of {data.length} records
            </p>
            {/* <p className='text-xs text-gray-500' title={`Sheet: ${sheetId}`}>
              Range: {range}
            </p> */}
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

              {/* Presets + Custom Views + Open Modal */}
              <div className='flex flex-wrap items-center gap-3'>
                <select
                  className='text-xs sm:text-sm px-3 pr-6 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 min-w-[220px]'
                  value={activePreset}
                  onChange={(e) => {
                    const value = e.target.value;
                    setActivePreset(value);
                    if (value === 'show-all') {
                      showAllColumns();
                    } else if (value === 'case-study-1') {
                      applyCaseStudy1Columns();
                    } else if (value === 'case-study-2') {
                      applyCaseStudy2Columns();
                    } else if (value === 'case-study-3') {
                      applyCaseStudy3Columns();
                    }
                  }}
                >
                  <option value=''>Presets</option>
                  <option value='show-all'>Show all</option>
                  <option value='case-study-1'>Case Study 1</option>
                  <option value='case-study-2'>Case Study 2</option>
                  <option value='case-study-3'>Case Study 3</option>
                </select>

                <label className='inline-flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={onlyAuditedFilterOn}
                    onChange={(e) => setOnlyAuditedFilterOn(e.target.checked)}
                    className='rounded border-gray-300 text-blue-600'
                  />
                  <span className='text-xs sm:text-sm text-gray-700'>
                    Only audited products
                  </span>
                </label>

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

        {/* Table Container - vertical scroll so sticky header sticks to top of this box */}
        <div className='bg-white border border-gray-300 rounded-lg shadow-sm'>
          <div className='overflow-auto max-h-[calc(100vh-16rem)]'>
            <table
              className='divide-y divide-gray-200'
              style={{
                minWidth: `${Math.max(
                  headers.filter((h) => isColumnVisible(h)).length * 220,
                  1200,
                )}px`,
              }}
            >
              <thead className='bg-gray-50 sticky top-0 z-20 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]'>
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
                        'px-3 sm:px-4 lg:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors relative bg-gray-50';

                      if (isLocationHeader) {
                        colClass += ' min-w-[320px] sm:min-w-[400px]';
                      } else if (isPriceHeader) {
                        colClass += ' min-w-[180px]';
                      } else if (isNumericHeader) {
                        colClass += ' min-w-[180px]';
                      } else if (isLongHeader) {
                        colClass += ' min-w-[260px]';
                      }

                      const uniqueVals =
                        columnUniqueValues[originalHeader] || [];
                      const selectedVals = columnFilters[originalHeader] || [];
                      const filterOpen = openFilterColumn === originalHeader;
                      const hasActiveFilter =
                        isColumnFilterActive(originalHeader);

                      return (
                        <th
                          key={originalHeader || index}
                          scope='col'
                          className={colClass}
                          onClick={() => requestSort(headerObj)}
                          data-filter-column
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
                            <span
                              className='flex-shrink-0 mt-0.5'
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenFilterColumn((c) =>
                                  c === originalHeader ? null : originalHeader,
                                );
                              }}
                              role='button'
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setOpenFilterColumn((c) =>
                                    c === originalHeader
                                      ? null
                                      : originalHeader,
                                  );
                                }
                              }}
                              aria-label='Filter column'
                              title='Filter column'
                            >
                              <FunnelIcon
                                className={`w-4 h-4 ${
                                  hasActiveFilter
                                    ? 'text-blue-600'
                                    : 'text-gray-400 opacity-70'
                                }`}
                              />
                            </span>
                          </div>
                          {filterOpen && (
                            <div
                              className='absolute left-0 top-full mt-0.5 z-20 min-w-[180px] max-h-[280px] overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg py-1'
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className='px-2 py-1 border-b border-gray-100 flex justify-between gap-2 text-xs'>
                                <span className='text-gray-500'>
                                  Filter by value
                                </span>
                                <button
                                  type='button'
                                  className='text-blue-600 hover:underline'
                                  onClick={() =>
                                    clearColumnFilter(originalHeader)
                                  }
                                >
                                  Clear filter
                                </button>
                              </div>
                              <div className='py-1 max-h-[240px] overflow-y-auto'>
                                {uniqueVals.map((val) => {
                                  const checked =
                                    selectedVals.length === 0 ||
                                    selectedVals.includes(val);
                                  return (
                                    <label
                                      key={val}
                                      className='flex items-center gap-2 px-2 py-1 hover:bg-gray-50 cursor-pointer text-xs'
                                    >
                                      <input
                                        type='checkbox'
                                        className='rounded border-gray-300 text-blue-600'
                                        checked={checked}
                                        onChange={() =>
                                          toggleColumnFilterValue(
                                            originalHeader,
                                            val,
                                          )
                                        }
                                      />
                                      <span className='truncate' title={val}>
                                        {val}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          )}
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
                            cellClass += ' max-w-[400px]';
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
                    Choose which columns to show. You can refine these into
                    saved views later.
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
                    You can save up to 3 custom layouts. Reuse a name to update
                    an existing one.
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
    </>
  );
};

export default Fpas;
