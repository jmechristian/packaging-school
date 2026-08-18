import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const statusStyles = {
  PENDING: 'bg-amber-100 text-amber-800',
  APPROVED: 'bg-green-100 text-green-800',
  DECLINED: 'bg-red-100 text-red-800',
};

export default function ProfileLibraryRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(
          '/api/network-distribution/enrollment-requests?scope=mine',
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
    load();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center py-16'>
        <div className='w-10 h-10 border-4 border-clemson border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (error) {
    return <p className='text-red-600'>{error}</p>;
  }

  if (!requests.length) {
    return (
      <div className='text-gray-600'>
        You have no library enrollment requests yet.{' '}
        <Link href='/network-distribution' className='text-blue-600 underline'>
          Browse the Network Distribution library
        </Link>
        .
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-semibold text-gray-900'>Library Requests</h2>
      <div className='flex flex-col gap-3'>
        {requests.map((request) => (
          <div
            key={request.id}
            className='border border-gray-200 rounded-lg p-4 flex gap-4 items-start'
          >
            {request.courseImage ? (
              <div
                className='w-28 h-16 rounded bg-cover bg-center shrink-0'
                style={{ backgroundImage: `url(${request.courseImage})` }}
              />
            ) : null}
            <div className='flex-1 min-w-0'>
              <div className='font-semibold text-gray-900'>
                {request.courseName}
              </div>
              <div className='text-sm text-gray-500'>
                Sales leader: {request.salesLeaderEmail}
              </div>
              <div className='text-xs text-gray-400 mt-1'>
                Requested{' '}
                {request.createdAt
                  ? new Date(request.createdAt).toLocaleDateString()
                  : ''}
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded ${
                statusStyles[request.status] || 'bg-gray-100 text-gray-700'
              }`}
            >
              {request.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
