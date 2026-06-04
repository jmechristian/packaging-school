import React, { useEffect, useMemo, useState } from 'react';
import Meta from '../../components/shared/Meta';
import { generateMetadata } from '../../libs/seo/generateMetadata';

const fmtPercent = (value) => `${(value * 100).toFixed(1)}%`;
const RANGE_PRESETS = [
  { id: '24h', label: 'Last 24 hours', hours: 24 },
  { id: '7d', label: 'Last 7 days', days: 7 },
  { id: '30d', label: 'Last 30 days', days: 30 },
  { id: '90d', label: 'Last 90 days', days: 90 },
  { id: 'all', label: 'All time' },
];

const quoteCsv = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

const getRangeBounds = (preset) => {
  if (preset === 'all') return { from: null, to: null };
  const now = new Date();
  const from = new Date(now);
  const match = RANGE_PRESETS.find((item) => item.id === preset);
  if (!match) return { from: null, to: null };

  if (match.hours) from.setHours(from.getHours() - match.hours);
  if (match.days) from.setDate(from.getDate() - match.days);
  return { from: from.toISOString(), to: now.toISOString() };
};

const cardBaseClass =
  'rounded-lg border border-slate-300 bg-white p-4 shadow-sm space-y-2';
const loadingOverlayClass =
  'absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10';

const Dashboard = () => {
  const [experimentKey, setExperimentKey] = useState('home_v1');
  const [rangePreset, setRangePreset] = useState('30d');
  const [summary, setSummary] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventsSearch, setEventsSearch] = useState('');
  const [eventsPageSize, setEventsPageSize] = useState(50);
  const [eventsPage, setEventsPage] = useState(1);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const { from, to } = getRangeBounds(rangePreset);
      const query = new URLSearchParams({ experimentKey });
      if (from) query.set('from', from);
      if (to) query.set('to', to);

      const [summaryRes, eventsRes] = await Promise.all([
        fetch(`/api/analytics/ab-summary?${query.toString()}`),
        fetch(`/api/analytics/ab-events?${query.toString()}&limit=1000`),
      ]);

      if (!summaryRes.ok) throw new Error('Failed to load summary');
      if (!eventsRes.ok) throw new Error('Failed to load events');

      const summaryData = await summaryRes.json();
      const eventsData = await eventsRes.json();

      setSummary(summaryData);
      setEvents(eventsData.items || []);
      setEventsPage(1);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [experimentKey, rangePreset]);

  const variantRows = useMemo(() => {
    const byVariant = summary?.byVariant || {};
    const rows = Object.entries(byVariant).map(([variant, data]) => {
      const exposures = data.exposure || 0;
      const pageViews = data.pageViews || 0;
      const purchaseIntent = data.purchaseIntent || 0;
      const purchaseComplete = data.purchaseComplete || 0;
      const rateDenominator = exposures > 0 ? exposures : pageViews;

      return {
        variant,
        ...data,
        intentRate: rateDenominator ? purchaseIntent / rateDenominator : 0,
        completionRate: rateDenominator ? purchaseComplete / rateDenominator : 0,
      };
    });

    return rows.sort((a, b) => (b.exposure || 0) - (a.exposure || 0));
  }, [summary]);

  const totalExposure = variantRows.reduce((sum, row) => sum + row.exposure, 0);
  const totalIntent = variantRows.reduce((sum, row) => sum + row.purchaseIntent, 0);
  const totalComplete = variantRows.reduce(
    (sum, row) => sum + row.purchaseComplete,
    0,
  );
  const completionLeaders = [...variantRows]
    .filter((row) => (row.exposure || 0) > 0)
    .sort((a, b) => b.completionRate - a.completionRate);
  const winnerRow = completionLeaders[0] || null;
  const variantABaseline = variantRows.find((row) => row.variant === 'A') || null;
  const runnerUp = completionLeaders[1] || null;
  const baselineRow =
    variantABaseline && winnerRow?.variant !== 'A'
      ? variantABaseline
      : runnerUp || variantABaseline;

  const completionDelta =
    winnerRow && baselineRow
      ? winnerRow.completionRate - baselineRow.completionRate
      : null;
  const completionLift =
    winnerRow &&
    baselineRow &&
    baselineRow.completionRate > 0 &&
    winnerRow.variant !== baselineRow.variant
      ? completionDelta / baselineRow.completionRate
      : null;
  const winner = winnerRow ? winnerRow.variant : 'Pending';

  const filteredEvents = useMemo(() => {
    const query = eventsSearch.trim().toLowerCase();
    if (!query) return events;

    return events.filter((event) => {
      const haystack = [
        event.eventName,
        event.variant,
        event.pagePath,
        event.nextPath,
        event.previousPath,
        event.sessionId,
        event.source,
      ]
        .map((value) => String(value || '').toLowerCase())
        .join(' ');

      return haystack.includes(query);
    });
  }, [events, eventsSearch]);

  const totalEventPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / eventsPageSize),
  );
  const currentEventsPage = Math.min(eventsPage, totalEventPages);
  const channelRows = useMemo(() => {
    const byChannel = summary?.acquisition?.byChannel || {};
    return Object.entries(byChannel).sort((a, b) => b[1] - a[1]);
  }, [summary]);

  const sourceMediumRows = useMemo(() => {
    const bySourceMedium = summary?.acquisition?.bySourceMedium || {};
    return Object.entries(bySourceMedium).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [summary]);
  const variantChannelRows = useMemo(() => {
    const byVariantChannel = summary?.acquisition?.byVariantChannel || {};
    const rows = [];

    Object.entries(byVariantChannel).forEach(([variant, channelMap]) => {
      Object.entries(channelMap || {}).forEach(([channel, data]) => {
        const exposure = data?.exposure || 0;
        const purchaseIntent = data?.purchaseIntent || 0;
        const purchaseComplete = data?.purchaseComplete || 0;
        rows.push({
          variant,
          channel,
          exposure,
          purchaseIntent,
          purchaseComplete,
          intentRate: exposure ? purchaseIntent / exposure : 0,
          completionRate: exposure ? purchaseComplete / exposure : 0,
        });
      });
    });

    return rows.sort((a, b) => {
      if (a.variant === b.variant) return b.exposure - a.exposure;
      return a.variant.localeCompare(b.variant);
    });
  }, [summary]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentEventsPage - 1) * eventsPageSize;
    const endIndex = startIndex + eventsPageSize;
    return filteredEvents.slice(startIndex, endIndex);
  }, [filteredEvents, currentEventsPage, eventsPageSize]);

  const selectedSessionEvents = useMemo(() => {
    if (!selectedSessionId) return [];
    return events
      .filter((event) => (event.sessionId || null) === selectedSessionId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [events, selectedSessionId]);

  const exportSummaryCsv = () => {
    const header = [
      'variant',
      'exposure',
      'page_views',
      'purchase_intent',
      'purchase_complete',
      'intent_rate',
      'completion_rate',
    ];
    const rows = variantRows.map((row) => [
      row.variant,
      row.exposure,
      row.pageViews,
      row.purchaseIntent,
      row.purchaseComplete,
      row.intentRate,
      row.completionRate,
    ]);
    const csv = [header, ...rows]
      .map((line) => line.map(quoteCsv).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ab-summary-${experimentKey}-${rangePreset}.csv`;
    link.click();
  };

  const exportEventsCsv = () => {
    const header = [
      'created_at',
      'variant',
      'event_name',
      'page_path',
      'next_path',
      'previous_path',
      'device_type',
      'acquisition_channel',
      'acquisition_source',
      'acquisition_medium',
      'acquisition_campaign',
      'metric',
      'value',
      'source',
      'reason',
      'session_id',
    ];
    const rows = events.map((event) => [
      event.createdAt || '',
      event.variant || '',
      event.eventName || '',
      event.pagePath || '',
      event.nextPath || '',
      event.previousPath || '',
      event.deviceType || '',
      event.acquisitionChannel || '',
      event.acquisitionSource || '',
      event.acquisitionMedium || '',
      event.acquisitionCampaign || '',
      event.metric || '',
      event.value ?? '',
      event.source || '',
      event.reason || '',
      event.sessionId || '',
    ]);
    const csv = [header, ...rows]
      .map((line) => line.map(quoteCsv).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ab-events-${experimentKey}-${rangePreset}.csv`;
    link.click();
  };

  useEffect(() => {
    setEventsPage(1);
  }, [eventsPageSize, eventsSearch]);

  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: '/internal/ab-dashboard',
    title: 'AB Dashboard | Packaging School',
    description: 'Internal A/B test performance dashboard.',
  });

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url='/internal/ab-dashboard'
        robots='noindex, nofollow, noarchive, nosnippet'
      />

      <div className='w-full max-w-7xl mx-auto py-10 px-4 space-y-8'>
        <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
          <div>
            <h1 className='text-2xl font-semibold text-gray-900'>
              A/B Experiment Dashboard
            </h1>
            <p className='text-sm text-gray-600'>
              Monitor split, engagement, and conversion for current experiments.
            </p>
          </div>

          <div className='flex flex-wrap items-end gap-3'>
            <div className='flex flex-col gap-1'>
              <label
                htmlFor='experimentKey'
                className='text-xs uppercase font-semibold text-gray-500 tracking-wide'
              >
                Experiment key
              </label>
              <input
                id='experimentKey'
                value={experimentKey}
                onChange={(e) => setExperimentKey(e.target.value)}
                className='border border-slate-300 rounded-md px-3 py-2 text-sm'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label
                htmlFor='rangePreset'
                className='text-xs uppercase font-semibold text-gray-500 tracking-wide'
              >
                Date range
              </label>
              <select
                id='rangePreset'
                value={rangePreset}
                onChange={(e) => setRangePreset(e.target.value)}
                className='border border-slate-300 rounded-md pl-3 pr-9 py-2 text-sm'
              >
                {RANGE_PRESETS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={loadData}
              disabled={loading}
              className='rounded-md bg-clemson px-4 py-2 text-white text-sm font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {loading ? (
          <div className='rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 flex items-center gap-2'>
            <span className='inline-block h-4 w-4 rounded-full border-2 border-slate-300 border-t-slate-700 animate-spin'></span>
            Loading latest experiment data...
          </div>
        ) : null}

        {error ? (
          <div className='rounded-md border border-red-300 bg-red-50 p-4 text-red-700 text-sm'>
            {error}
          </div>
        ) : null}

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className={cardBaseClass}>
            <p className='text-xs uppercase tracking-wide text-gray-500'>Exposure</p>
            {loading && !summary ? (
              <div className='h-9 w-24 rounded bg-slate-200 animate-pulse'></div>
            ) : (
              <p className='text-3xl font-semibold text-gray-900'>
                {totalExposure.toLocaleString()}
              </p>
            )}
          </div>
          <div className={cardBaseClass}>
            <p className='text-xs uppercase tracking-wide text-gray-500'>
              Purchase intent
            </p>
            {loading && !summary ? (
              <>
                <div className='h-9 w-24 rounded bg-slate-200 animate-pulse'></div>
                <div className='h-4 w-40 rounded bg-slate-200 animate-pulse'></div>
              </>
            ) : (
              <>
                <p className='text-3xl font-semibold text-gray-900'>
                  {totalIntent.toLocaleString()}
                </p>
                <p className='text-sm text-gray-600'>
                  {totalExposure ? fmtPercent(totalIntent / totalExposure) : '0.0%'} of
                  exposures
                </p>
              </>
            )}
          </div>
          <div className={cardBaseClass}>
            <p className='text-xs uppercase tracking-wide text-gray-500'>
              Purchase complete
            </p>
            {loading && !summary ? (
              <>
                <div className='h-9 w-24 rounded bg-slate-200 animate-pulse'></div>
                <div className='h-4 w-40 rounded bg-slate-200 animate-pulse'></div>
              </>
            ) : (
              <>
                <p className='text-3xl font-semibold text-gray-900'>
                  {totalComplete.toLocaleString()}
                </p>
                <p className='text-sm text-gray-600'>
                  {totalExposure ? fmtPercent(totalComplete / totalExposure) : '0.0%'} of
                  exposures
                </p>
              </>
            )}
          </div>
          <div className={cardBaseClass}>
            <p className='text-xs uppercase tracking-wide text-gray-500'>
              Winner (completion rate)
            </p>
            {loading && !summary ? (
              <>
                <div className='h-9 w-16 rounded bg-slate-200 animate-pulse'></div>
                <div className='h-4 w-full rounded bg-slate-200 animate-pulse'></div>
              </>
            ) : (
              <>
                <p className='text-3xl font-semibold text-gray-900'>{winner}</p>
                <p className='text-sm text-gray-600'>
                  {completionDelta === null
                    ? 'Need at least two active variants'
                    : `${completionDelta >= 0 ? '+' : ''}${(completionDelta * 100).toFixed(
                        2
                      )}pp (${completionLift === null ? 'n/a' : `${(completionLift * 100).toFixed(1)}%`} lift ${winnerRow?.variant} vs ${baselineRow?.variant})`}
                </p>
              </>
            )}
          </div>
        </div>

        <div className='rounded-lg border border-slate-300 bg-white overflow-hidden relative'>
          {loading ? (
            <div className={loadingOverlayClass}>
              <span className='inline-block h-5 w-5 rounded-full border-2 border-slate-300 border-t-slate-700 animate-spin'></span>
            </div>
          ) : null}
          <div className='px-4 py-3 border-b border-slate-200'>
            <h2 className='text-base font-semibold text-gray-900'>
              Traffic Source Mix (session-level)
            </h2>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-0'>
            <div className='p-4 border-b md:border-b-0 md:border-r border-slate-200'>
              <p className='text-xs uppercase tracking-wide text-gray-500 mb-3'>
                Channels
              </p>
              {channelRows.length === 0 ? (
                <p className='text-sm text-gray-500'>No attributed sessions yet.</p>
              ) : (
                <div className='space-y-2'>
                  {channelRows.map(([channel, count]) => (
                    <div
                      key={channel}
                      className='flex items-center justify-between text-sm'
                    >
                      <span className='text-gray-700'>{channel}</span>
                      <span className='font-semibold text-gray-900'>
                        {count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='p-4'>
              <p className='text-xs uppercase tracking-wide text-gray-500 mb-3'>
                Top Source / Medium
              </p>
              {sourceMediumRows.length === 0 ? (
                <p className='text-sm text-gray-500'>No attributed sessions yet.</p>
              ) : (
                <div className='space-y-2'>
                  {sourceMediumRows.map(([label, count]) => (
                    <div key={label} className='flex items-center justify-between text-sm gap-3'>
                      <span className='text-gray-700 truncate' title={label}>
                        {label}
                      </span>
                      <span className='font-semibold text-gray-900 shrink-0'>
                        {count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='rounded-lg border border-slate-300 bg-white overflow-hidden relative'>
          {loading ? (
            <div className={loadingOverlayClass}>
              <span className='inline-block h-5 w-5 rounded-full border-2 border-slate-300 border-t-slate-700 animate-spin'></span>
            </div>
          ) : null}
          <div className='px-4 py-3 border-b border-slate-200'>
            <h2 className='text-base font-semibold text-gray-900'>
              Variant x Channel Performance
            </h2>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-slate-50 text-xs uppercase tracking-wide text-gray-500'>
                <tr>
                  <th className='text-left px-4 py-2'>Variant</th>
                  <th className='text-left px-4 py-2'>Channel</th>
                  <th className='text-left px-4 py-2'>Exposure</th>
                  <th className='text-left px-4 py-2'>Intent</th>
                  <th className='text-left px-4 py-2'>Complete</th>
                  <th className='text-left px-4 py-2'>Intent rate</th>
                  <th className='text-left px-4 py-2'>Completion rate</th>
                </tr>
              </thead>
              <tbody>
                {variantChannelRows.length === 0 ? (
                  <tr>
                    <td className='px-4 py-4 text-gray-500' colSpan={7}>
                      No variant/channel attribution data yet.
                    </td>
                  </tr>
                ) : (
                  variantChannelRows.map((row) => (
                    <tr
                      key={`${row.variant}-${row.channel}`}
                      className='border-t border-slate-100'
                    >
                      <td className='px-4 py-2 font-semibold text-gray-900'>
                        {row.variant}
                      </td>
                      <td className='px-4 py-2'>{row.channel}</td>
                      <td className='px-4 py-2'>{row.exposure.toLocaleString()}</td>
                      <td className='px-4 py-2'>{row.purchaseIntent.toLocaleString()}</td>
                      <td className='px-4 py-2'>{row.purchaseComplete.toLocaleString()}</td>
                      <td className='px-4 py-2'>{fmtPercent(row.intentRate)}</td>
                      <td className='px-4 py-2'>{fmtPercent(row.completionRate)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className='rounded-lg border border-slate-300 bg-white overflow-hidden relative'>
          {loading ? (
            <div className={loadingOverlayClass}>
              <span className='inline-block h-5 w-5 rounded-full border-2 border-slate-300 border-t-slate-700 animate-spin'></span>
            </div>
          ) : null}
          <div className='px-4 py-3 border-b border-slate-200 flex justify-between items-center gap-3'>
            <h2 className='text-base font-semibold text-gray-900'>Variant performance</h2>
            <div className='flex items-center gap-3'>
              {loading ? (
                <span className='text-xs text-gray-500'>Loading...</span>
              ) : (
                <span className='text-xs text-gray-500'>
                  {summary?.totalEvents?.toLocaleString?.() || 0} events
                </span>
              )}
              <button
                onClick={exportSummaryCsv}
                className='rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-slate-50'
              >
                Export summary CSV
              </button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-slate-50 text-xs uppercase tracking-wide text-gray-500'>
                <tr>
                  <th className='text-left px-4 py-2'>Variant</th>
                  <th className='text-left px-4 py-2'>Exposure</th>
                  <th className='text-left px-4 py-2'>Page views</th>
                  <th className='text-left px-4 py-2'>Intent</th>
                  <th className='text-left px-4 py-2'>Complete</th>
                  <th className='text-left px-4 py-2'>Intent rate</th>
                  <th className='text-left px-4 py-2'>Completion rate</th>
                </tr>
              </thead>
              <tbody>
                {variantRows.length === 0 && !loading ? (
                  <tr>
                    <td className='px-4 py-4 text-gray-500' colSpan={7}>
                      No variant data yet.
                    </td>
                  </tr>
                ) : null}
                {variantRows.map((row) => (
                  <tr key={row.variant} className='border-t border-slate-100'>
                    <td className='px-4 py-2 font-semibold text-gray-900'>{row.variant}</td>
                    <td className='px-4 py-2'>{row.exposure.toLocaleString()}</td>
                    <td className='px-4 py-2'>{row.pageViews.toLocaleString()}</td>
                    <td className='px-4 py-2'>{row.purchaseIntent.toLocaleString()}</td>
                    <td className='px-4 py-2'>{row.purchaseComplete.toLocaleString()}</td>
                    <td className='px-4 py-2'>{fmtPercent(row.intentRate)}</td>
                    <td className='px-4 py-2'>{fmtPercent(row.completionRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='rounded-lg border border-slate-300 bg-white overflow-hidden relative'>
          {loading ? (
            <div className={loadingOverlayClass}>
              <span className='inline-block h-5 w-5 rounded-full border-2 border-slate-300 border-t-slate-700 animate-spin'></span>
            </div>
          ) : null}
          <div className='px-4 py-3 border-b border-slate-200 flex flex-wrap justify-between items-center gap-3'>
            <h2 className='text-base font-semibold text-gray-900'>Recent events</h2>
            <div className='flex flex-wrap items-center gap-2'>
              <input
                type='text'
                value={eventsSearch}
                onChange={(e) => setEventsSearch(e.target.value)}
                placeholder='Search routes, variants, events, session ID...'
                className='border border-slate-300 rounded-md px-3 py-1 text-xs min-w-[260px]'
              />
              <label className='text-xs text-gray-600'>Rows:</label>
              <select
                value={eventsPageSize}
                onChange={(e) => setEventsPageSize(Number(e.target.value))}
                className='border border-slate-300 rounded-md pl-2 pr-8 py-1 text-xs'
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <button
                onClick={() => setEventsPage((page) => Math.max(1, page - 1))}
                disabled={currentEventsPage === 1}
                className='rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Prev
              </button>
              <span className='text-xs text-gray-600'>
                Page {currentEventsPage} / {totalEventPages}
              </span>
              <button
                onClick={() =>
                  setEventsPage((page) => Math.min(totalEventPages, page + 1))
                }
                disabled={currentEventsPage >= totalEventPages}
                className='rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Next
              </button>
              <button
                onClick={exportEventsCsv}
                className='rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-slate-50'
              >
                Export events CSV
              </button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-slate-50 text-xs uppercase tracking-wide text-gray-500'>
                <tr>
                  <th className='text-left px-4 py-2'>Time / Session</th>
                  <th className='text-left px-4 py-2'>Variant</th>
                  <th className='text-left px-4 py-2'>Event</th>
                  <th className='text-left px-4 py-2'>Page</th>
                  <th className='text-left px-4 py-2'>Next path</th>
                  <th className='text-left px-4 py-2'>Device</th>
                  <th className='text-left px-4 py-2'>Channel</th>
                  <th className='text-left px-4 py-2'>Source/Medium</th>
                  <th className='text-left px-4 py-2'>Source</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length === 0 && !loading ? (
                  <tr>
                    <td className='px-4 py-4 text-gray-500' colSpan={9}>
                      No events match your current search.
                    </td>
                  </tr>
                ) : null}
                {paginatedEvents.map((event) => (
                  <tr
                    key={event.id}
                    className='border-t border-slate-100 hover:bg-slate-50 cursor-pointer'
                    onClick={() => setSelectedEvent(event)}
                  >
                    <td className='px-4 py-2 whitespace-nowrap'>
                      <div className='font-medium text-gray-900'>
                        {event.createdAt
                          ? new Date(event.createdAt).toLocaleString()
                          : 'N/A'}
                      </div>
                      <div
                        className='text-xs text-gray-500 max-w-[220px] truncate'
                        title={event.sessionId || ''}
                      >
                        {event.sessionId ? (
                          <button
                            type='button'
                            className='text-clemson hover:underline'
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSessionId(event.sessionId);
                            }}
                          >
                            {event.sessionId}
                          </button>
                        ) : (
                          'N/A'
                        )}
                      </div>
                    </td>
                    <td className='px-4 py-2'>{event.variant || 'NA'}</td>
                    <td className='px-4 py-2'>{event.eventName}</td>
                    <td className='px-4 py-2 max-w-xs truncate' title={event.pagePath || ''}>
                      {event.pagePath || 'N/A'}
                    </td>
                    <td className='px-4 py-2 max-w-xs truncate' title={event.nextPath || ''}>
                      {event.nextPath || 'N/A'}
                    </td>
                    <td className='px-4 py-2'>{event.deviceType || 'N/A'}</td>
                    <td className='px-4 py-2'>{event.acquisitionChannel || 'N/A'}</td>
                    <td
                      className='px-4 py-2 max-w-xs truncate'
                      title={`${event.acquisitionSource || ''} / ${event.acquisitionMedium || ''}`}
                    >
                      {event.acquisitionSource || 'N/A'} /{' '}
                      {event.acquisitionMedium || 'N/A'}
                    </td>
                    <td className='px-4 py-2'>{event.source || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='px-4 py-2 border-t border-slate-200 text-xs text-gray-600'>
            Showing{' '}
            {filteredEvents.length === 0
              ? 0
              : (currentEventsPage - 1) * eventsPageSize + 1}{' '}
            - {Math.min(currentEventsPage * eventsPageSize, filteredEvents.length)} of{' '}
            {filteredEvents.length.toLocaleString()} events
            {eventsSearch.trim()
              ? ` (filtered from ${events.length.toLocaleString()})`
              : ''}
          </div>
        </div>
      </div>

      {selectedSessionId ? (
        <div
          className='fixed inset-0 z-[130] bg-black/40 flex items-center justify-center p-4'
          onClick={() => setSelectedSessionId(null)}
        >
          <div
            className='w-full max-w-4xl rounded-xl bg-white shadow-xl border border-slate-200'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4'>
              <div>
                <h3 className='text-lg font-semibold text-slate-900'>Session Journey</h3>
                <p className='text-xs text-slate-500 break-all'>{selectedSessionId}</p>
              </div>
              <button
                onClick={() => setSelectedSessionId(null)}
                className='rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50'
              >
                Close
              </button>
            </div>
            <div className='max-h-[70vh] overflow-auto'>
              <table className='w-full text-sm'>
                <thead className='bg-slate-50 text-xs uppercase tracking-wide text-gray-500'>
                  <tr>
                    <th className='text-left px-4 py-2'>Time</th>
                    <th className='text-left px-4 py-2'>Event</th>
                    <th className='text-left px-4 py-2'>Variant</th>
                    <th className='text-left px-4 py-2'>Page</th>
                    <th className='text-left px-4 py-2'>Next</th>
                    <th className='text-left px-4 py-2'>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSessionEvents.length === 0 ? (
                    <tr>
                      <td className='px-4 py-4 text-gray-500' colSpan={6}>
                        No events found for this session.
                      </td>
                    </tr>
                  ) : (
                    selectedSessionEvents.map((event) => (
                      <tr key={event.id} className='border-t border-slate-100'>
                        <td className='px-4 py-2 whitespace-nowrap'>
                          {event.createdAt
                            ? new Date(event.createdAt).toLocaleString()
                            : 'N/A'}
                        </td>
                        <td className='px-4 py-2'>{event.eventName || 'NA'}</td>
                        <td className='px-4 py-2'>{event.variant || 'NA'}</td>
                        <td className='px-4 py-2 max-w-xs truncate' title={event.pagePath || ''}>
                          {event.pagePath || 'N/A'}
                        </td>
                        <td className='px-4 py-2 max-w-xs truncate' title={event.nextPath || ''}>
                          {event.nextPath || 'N/A'}
                        </td>
                        <td className='px-4 py-2'>{event.source || 'N/A'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      {selectedEvent ? (
        <div
          className='fixed inset-0 z-[120] bg-black/40 flex items-center justify-center p-4'
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className='w-full max-w-2xl rounded-xl bg-white shadow-xl border border-slate-200'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4'>
              <div>
                <h3 className='text-lg font-semibold text-slate-900'>Event Summary</h3>
                <p className='text-xs text-slate-500'>
                  {selectedEvent.createdAt
                    ? new Date(selectedEvent.createdAt).toLocaleString()
                    : 'N/A'}
                </p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className='rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50'
              >
                Close
              </button>
            </div>
            <div className='px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
              <div>
                <p className='text-xs uppercase tracking-wide text-slate-500'>Event</p>
                <p className='text-slate-900 font-medium'>{selectedEvent.eventName || 'NA'}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-slate-500'>Variant</p>
                <p className='text-slate-900 font-medium'>{selectedEvent.variant || 'NA'}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-slate-500'>Session ID</p>
                <p className='text-slate-900 break-all'>{selectedEvent.sessionId || 'NA'}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-slate-500'>Device</p>
                <p className='text-slate-900'>{selectedEvent.deviceType || 'NA'}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-slate-500'>Page Path</p>
                <p className='text-slate-900 break-all'>{selectedEvent.pagePath || 'NA'}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-slate-500'>Next Path</p>
                <p className='text-slate-900 break-all'>{selectedEvent.nextPath || 'NA'}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-slate-500'>Source</p>
                <p className='text-slate-900'>{selectedEvent.source || 'NA'}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-slate-500'>Channel</p>
                <p className='text-slate-900'>{selectedEvent.acquisitionChannel || 'NA'}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-slate-500'>
                  Source / Medium
                </p>
                <p className='text-slate-900 break-all'>
                  {selectedEvent.acquisitionSource || 'NA'} /{' '}
                  {selectedEvent.acquisitionMedium || 'NA'}
                </p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-slate-500'>Campaign</p>
                <p className='text-slate-900'>{selectedEvent.acquisitionCampaign || 'NA'}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
