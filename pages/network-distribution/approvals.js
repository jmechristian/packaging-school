import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const statusMeta = {
  PENDING: {
    label: 'Pending',
    className: 'bg-[#f4aa00]/15 text-[#0A1D3A]',
    accent: 'border-l-[#f4aa00]',
  },
  APPROVED: {
    label: 'Approved',
    className: 'bg-emerald-50 text-emerald-800',
    accent: 'border-l-emerald-500',
  },
  DECLINED: {
    label: 'Declined',
    className: 'bg-rose-50 text-rose-800',
    accent: 'border-l-rose-400',
  },
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : '';

const initials = (value) =>
  String(value || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'ND';

const StatusBadge = ({ status }) => {
  const meta = statusMeta[status] || {
    label: status,
    className: 'bg-slate-100 text-slate-700',
  };
  return (
    <span
      className={`shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full ${meta.className}`}
    >
      {meta.label}
    </span>
  );
};

const RequestCard = ({
  request,
  actingId,
  reason,
  onReasonChange,
  onDecide,
}) => {
  const meta = statusMeta[request.status] || { accent: 'border-l-slate-200' };
  return (
    <div
      className={`rounded-xl bg-white border border-slate-200 border-l-4 ${meta.accent} shadow-sm overflow-hidden`}
    >
      <div className='p-5 flex flex-col gap-4'>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex items-start gap-4 min-w-0'>
            {request.courseImage ? (
              <img
                src={request.courseImage}
                alt=''
                className='hidden sm:block h-16 w-16 rounded-lg object-cover bg-slate-100'
              />
            ) : (
              <div className='hidden sm:flex h-16 w-16 rounded-lg bg-[#0A1D3A] text-[#f4aa00] items-center justify-center text-sm font-semibold'>
                {initials(request.requesterName)}
              </div>
            )}
            <div className='min-w-0'>
              <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A1D3A]/50'>
                {request.courseId || 'Course request'}
              </p>
              <h3 className='text-lg font-semibold text-[#0A1D3A] leading-snug mt-0.5'>
                {request.courseName}
              </h3>
              <p className='text-sm text-slate-600 mt-1'>
                <span className='font-medium text-slate-800'>
                  {request.requesterName}
                </span>
                {request.requesterEmail ? ` · ${request.requesterEmail}` : ''}
              </p>
              <p className='text-xs text-slate-400 mt-1.5'>
                Requested {formatDate(request.createdAt)}
                {request.status !== 'PENDING' && request.decidedAt
                  ? ` · ${
                      request.status === 'DECLINED' ? 'Declined' : 'Approved'
                    } ${formatDate(request.decidedAt)}${
                      request.decidedByEmail ? ` by ${request.decidedByEmail}` : ''
                    }`
                  : ''}
              </p>
            </div>
          </div>
          <StatusBadge status={request.status} />
        </div>

        {request.status === 'DECLINED' && request.declineReason ? (
          <p className='text-sm text-rose-800 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2'>
            Note: {request.declineReason}
          </p>
        ) : null}

        {request.status === 'PENDING' && (
          <div className='flex flex-col sm:flex-row gap-3 sm:items-center pt-1 border-t border-slate-100'>
            <input
              type='text'
              value={reason || ''}
              onChange={(e) => onReasonChange(request.id, e.target.value)}
              placeholder='Optional note if declining'
              className='flex-1 border border-slate-200 rounded-md px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1D3A]/15 focus:border-[#0A1D3A]'
            />
            <button
              type='button'
              disabled={actingId === request.id}
              onClick={() => onDecide(request.id, 'approve')}
              className='px-4 h-11 rounded-md bg-[#0A1D3A] text-white text-sm font-semibold hover:bg-[#12294f] disabled:opacity-70'
            >
              {actingId === request.id ? 'Working...' : 'Approve'}
            </button>
            <button
              type='button'
              disabled={actingId === request.id}
              onClick={() => onDecide(request.id, 'decline')}
              className='px-4 h-11 rounded-md border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-70'
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const RequestSection = ({ title, count, accent = '#f4aa00', children }) => {
  if (!count) return null;
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <span
          className='h-6 w-1 rounded-full'
          style={{ backgroundColor: accent }}
        />
        <h2 className='text-xl font-semibold text-[#0A1D3A]'>{title}</h2>
        <span className='inline-flex min-w-[1.5rem] justify-center rounded-full bg-[#0A1D3A] px-2 py-0.5 text-[11px] font-semibold text-white'>
          {count}
        </span>
      </div>
      {children}
    </section>
  );
};

const formatPercent = (value) =>
  value == null || Number.isNaN(Number(value))
    ? null
    : Math.max(0, Math.min(100, Math.round(Number(value))));

const LearnerCard = ({ learner }) => (
  <div className='rounded-xl bg-white border border-slate-200 border-l-4 border-l-[#234984] shadow-sm p-5 flex flex-col gap-4'>
    <div className='flex items-start gap-3'>
      <div className='h-11 w-11 rounded-full bg-[#0A1D3A] text-[#f4aa00] flex items-center justify-center text-sm font-semibold shrink-0'>
        {initials(learner.name || learner.email)}
      </div>
      <div>
        <div className='font-semibold text-[#0A1D3A]'>
          {learner.name || learner.email}
        </div>
        {learner.name ? (
          <div className='text-sm text-slate-500'>{learner.email}</div>
        ) : null}
      </div>
    </div>
    {learner.courses?.length ? (
      <ul className='flex flex-col gap-3'>
        {learner.courses.map((course) => {
          const percent = formatPercent(course.percentComplete);
          const done = Boolean(course.completed);
          const expired = Boolean(course.expired);
          return (
            <li
              key={`${learner.email}-${course.courseId || course.courseName}`}
              className='flex flex-col gap-1.5'
            >
              <div className='flex items-center justify-between gap-3 text-sm'>
                <span className='text-slate-800 font-medium'>
                  {course.courseName}
                </span>
                <span
                  className={`whitespace-nowrap text-xs font-semibold ${
                    done
                      ? 'text-emerald-700'
                      : expired
                        ? 'text-slate-400'
                        : 'text-[#0A1D3A]'
                  }`}
                >
                  {done
                    ? 'Completed'
                    : expired
                      ? 'Expired'
                      : percent == null
                        ? '—'
                        : `${percent}%`}
                </span>
              </div>
              <div className='h-1.5 rounded-full bg-slate-100 overflow-hidden'>
                <div
                  className={`h-full rounded-full ${
                    done
                      ? 'bg-emerald-500'
                      : expired
                        ? 'bg-slate-300'
                        : 'bg-[#0A1D3A]'
                  }`}
                  style={{ width: `${done ? 100 : percent || 0}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      <p className='text-sm text-slate-500'>No approved courses yet.</p>
    )}
  </div>
);

const StatCard = ({ label, value, hint }) => (
  <div className='rounded-xl bg-white border border-slate-200 px-4 py-4 shadow-sm'>
    <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A1D3A]/50'>
      {label}
    </p>
    <p className='text-3xl font-semibold text-[#0A1D3A] mt-1'>{value}</p>
    {hint ? <p className='text-xs text-slate-400 mt-1'>{hint}</p> : null}
  </div>
);

const Page = () => {
  const [requests, setRequests] = useState([]);
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState('');
  const [actingId, setActingId] = useState(null);
  const [reasons, setReasons] = useState({});

  const loadDashboard = async () => {
    setError('');
    try {
      const [requestsRes, progressRes] = await Promise.all([
        fetch('/api/network-distribution/enrollment-requests?scope=leader'),
        fetch('/api/network-distribution/leader-progress'),
      ]);
      const requestsData = await requestsRes.json();
      const progressData = await progressRes.json();

      if (requestsRes.status === 403 || progressRes.status === 403) {
        setUnauthorized(true);
        setRequests([]);
        setLearners([]);
        return;
      }

      if (!requestsRes.ok) {
        throw new Error(requestsData.message || 'Failed to load requests');
      }
      if (!progressRes.ok) {
        throw new Error(progressData.message || 'Failed to load learner progress');
      }

      setUnauthorized(false);
      setRequests(requestsData.items || []);
      setLearners(progressData.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const decide = async (id, action) => {
    setActingId(id);
    try {
      const response = await fetch(
        '/api/network-distribution/enrollment-requests/decide',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id,
            action,
            reason: action === 'decline' ? reasons[id] : undefined,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Could not update request');
      }
      setReasons((prev) => ({ ...prev, [id]: '' }));
      await loadDashboard();
    } catch (err) {
      setError(err.message);
    } finally {
      setActingId(null);
    }
  };

  const pending = requests.filter((item) => item.status === 'PENDING');
  const approved = requests.filter((item) => item.status === 'APPROVED');
  const declined = requests.filter((item) => item.status === 'DECLINED');

  const renderCards = (items) =>
    items.map((request) => (
      <RequestCard
        key={request.id}
        request={request}
        actingId={actingId}
        reason={reasons[request.id]}
        onReasonChange={(id, value) =>
          setReasons((prev) => ({ ...prev, [id]: value }))
        }
        onDecide={decide}
      />
    ));

  return (
    <div className='w-full bg-[#f4f4f5] min-h-[calc(100vh-80px)]'>
      <Head>
        <title>Enrollment Approvals | Network Distribution</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='bg-[#0A1D3A]'>
        <div className='w-full max-w-5xl mx-auto px-4 py-10'>
          <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f4aa00]'>
            Network Distribution Library
          </p>
          <h1 className='text-3xl font-semibold text-white mt-1'>
            Enrollment approvals
          </h1>
          <p className='text-white/70 mt-2 max-w-2xl'>
            Review requests from your team, approve enrollments, and track
            learner progress.
          </p>
        </div>
      </div>
      <div className='w-full max-w-5xl mx-auto px-4 py-8'>
        {error && !unauthorized && (
          <p className='text-sm text-rose-800 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2 mb-6'>
            {error}
          </p>
        )}
        {loading ? (
          <div className='flex justify-center py-16'>
            <div className='w-10 h-10 border-4 border-[#f4aa00] border-t-transparent rounded-full animate-spin' />
          </div>
        ) : unauthorized ? (
          <div className='rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden'>
            <div className='bg-[#0A1D3A] px-6 py-4'>
              <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f4aa00]'>
                Access
              </p>
              <h2 className='text-lg font-semibold text-white mt-1'>
                Sales leader access required
              </h2>
            </div>
            <p className='text-slate-600 px-6 py-5'>
              This page is only available to approved Network Distribution sales
              leaders.
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-10'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
              <StatCard
                label='Pending'
                value={pending.length}
                hint='Needs your decision'
              />
              <StatCard
                label='Learners'
                value={learners.length}
                hint='Approved by you'
              />
              <StatCard
                label='Approved'
                value={approved.length}
                hint='Enrollments processed'
              />
              <StatCard
                label='Declined'
                value={declined.length}
                hint='Not moved forward'
              />
            </div>
            <RequestSection title='Pending' count={pending.length} accent='#f4aa00'>
              {renderCards(pending)}
            </RequestSection>
            <RequestSection
              title='Learners'
              count={learners.length}
              accent='#234984'
            >
              {learners.map((learner) => (
                <LearnerCard key={learner.email} learner={learner} />
              ))}
            </RequestSection>
            <RequestSection
              title='Approved'
              count={approved.length}
              accent='#10b981'
            >
              {renderCards(approved)}
            </RequestSection>
            <RequestSection
              title='Declined'
              count={declined.length}
              accent='#f43f5e'
            >
              {renderCards(declined)}
            </RequestSection>
            {!requests.length && !learners.length ? (
              <div className='rounded-xl bg-white border border-slate-200 px-6 py-10 text-center shadow-sm'>
                <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A1D3A]/50'>
                  Nothing yet
                </p>
                <h2 className='text-xl font-semibold text-[#0A1D3A] mt-2'>
                  No enrollment requests
                </h2>
                <p className='text-slate-500 mt-2'>
                  When a teammate asks to enroll, their request will appear here.
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default withPageAuthRequired(Page);
