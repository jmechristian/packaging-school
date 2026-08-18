import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const statusStyles = {
  PENDING: 'bg-amber-100 text-amber-800',
  APPROVED: 'bg-green-100 text-green-800',
  DECLINED: 'bg-red-100 text-red-800',
};

const formatDate = (value) =>
  value ? new Date(value).toLocaleString() : '';

const RequestCard = ({
  request,
  actingId,
  reason,
  onReasonChange,
  onDecide,
}) => (
  <div className='border border-gray-200 rounded-lg p-5 bg-white flex flex-col gap-3'>
    <div className='flex items-start justify-between gap-4'>
      <div>
        <div className='font-semibold text-gray-900'>{request.courseName}</div>
        <div className='text-sm text-gray-600'>
          {request.requesterName} ({request.requesterEmail})
        </div>
        <div className='text-xs text-gray-400 mt-1'>
          Requested {formatDate(request.createdAt)}
        </div>
        {request.status !== 'PENDING' && request.decidedAt ? (
          <div className='text-xs text-gray-400 mt-0.5'>
            {request.status === 'DECLINED' ? 'Declined' : 'Approved'}{' '}
            {formatDate(request.decidedAt)}
            {request.decidedByEmail ? ` by ${request.decidedByEmail}` : ''}
          </div>
        ) : null}
      </div>
      <span
        className={`text-xs font-semibold px-2 py-1 rounded ${
          statusStyles[request.status] || 'bg-gray-100 text-gray-700'
        }`}
      >
        {request.status}
      </span>
    </div>
    {request.status === 'DECLINED' && request.declineReason ? (
      <p className='text-sm text-gray-700 bg-red-50 border border-red-100 rounded-md px-3 py-2'>
        Note: {request.declineReason}
      </p>
    ) : null}
    {request.status === 'PENDING' && (
      <div className='flex flex-col sm:flex-row gap-3 sm:items-center'>
        <input
          type='text'
          value={reason || ''}
          onChange={(e) => onReasonChange(request.id, e.target.value)}
          placeholder='Optional note if declining'
          className='flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm'
        />
        <button
          type='button'
          disabled={actingId === request.id}
          onClick={() => onDecide(request.id, 'approve')}
          className='px-4 py-2 rounded-md bg-[#0A1D3A] text-white text-sm font-medium disabled:opacity-70'
        >
          {actingId === request.id ? 'Working...' : 'Approve'}
        </button>
        <button
          type='button'
          disabled={actingId === request.id}
          onClick={() => onDecide(request.id, 'decline')}
          className='px-4 py-2 rounded-md border border-gray-300 text-sm font-medium disabled:opacity-70'
        >
          Decline
        </button>
      </div>
    )}
  </div>
);

const RequestSection = ({ title, count, children }) => {
  if (!count) return null;
  return (
    <section className='flex flex-col gap-3'>
      <h2 className='text-lg font-semibold text-gray-900'>
        {title}{' '}
        <span className='text-sm font-normal text-gray-500'>({count})</span>
      </h2>
      {children}
    </section>
  );
};

const Page = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actingId, setActingId] = useState(null);
  const [reasons, setReasons] = useState({});

  const loadRequests = async () => {
    setError('');
    try {
      const response = await fetch(
        '/api/network-distribution/enrollment-requests?scope=leader',
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to load requests');
      }
      setRequests(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
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
      await loadRequests();
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
    <div className='w-full max-w-5xl mx-auto px-4 py-12'>
      <Head>
        <title>Enrollment Approvals | Network Distribution</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <h1 className='text-3xl font-semibold text-gray-900'>
        Enrollment approvals
      </h1>
      <p className='text-gray-600 mt-2 mb-8'>
        Requests sent to your email from the Network Distribution library.
      </p>
      {error && <p className='text-red-600 mb-4'>{error}</p>}
      {loading ? (
        <div className='flex justify-center py-16'>
          <div className='w-10 h-10 border-4 border-clemson border-t-transparent rounded-full animate-spin' />
        </div>
      ) : !requests.length ? (
        <p className='text-gray-600'>No enrollment requests for your email.</p>
      ) : (
        <div className='flex flex-col gap-10'>
          <RequestSection title='Pending' count={pending.length}>
            {renderCards(pending)}
          </RequestSection>
          <RequestSection title='Declined' count={declined.length}>
            {renderCards(declined)}
          </RequestSection>
          <RequestSection title='Approved' count={approved.length}>
            {renderCards(approved)}
          </RequestSection>
        </div>
      )}
    </div>
  );
};

export default withPageAuthRequired(Page);
