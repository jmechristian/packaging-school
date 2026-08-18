import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0/client';

const TEMPLATES = [
  { id: 'request', label: 'Sales leader request' },
  { id: 'approved', label: 'Learner approved' },
  { id: 'declined', label: 'Learner declined' },
];

export default function EmailPreviewPage() {
  const { user, isLoading } = useUser();
  const [template, setTemplate] = useState('request');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const email = user?.email?.toLowerCase() || '';
  const allowed = email.endsWith('@packagingschool.com');

  useEffect(() => {
    setMessage('');
  }, [template]);

  const sendTest = async () => {
    setSending(true);
    setMessage('');
    try {
      const response = await fetch(
        '/api/network-distribution/emails/send-test',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ template, to: email }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Send failed');
      }
      setMessage(`Sent ${template} test email to ${data.to}`);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center py-24'>
        <div className='w-10 h-10 border-4 border-clemson border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className='max-w-xl mx-auto py-24 px-4 text-center text-gray-700'>
        Sign in with a packagingschool.com account to preview these emails.
      </div>
    );
  }

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-10'>
      <Head>
        <title>Enrollment email preview</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-900'>
            Enrollment emails
          </h1>
          <p className='text-sm text-gray-500'>
            Preview templates and send a test to {email}. You can also run{' '}
            <code>cd react-email-starter && npm run dev</code>.
          </p>
        </div>
        <div className='flex gap-3 items-center'>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className='border border-gray-300 rounded-md px-3 py-2'
          >
            {TEMPLATES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <button
            type='button'
            onClick={sendTest}
            disabled={sending}
            className='px-4 py-2 rounded-md bg-[#0A1D3A] text-white disabled:opacity-70'
          >
            {sending ? 'Sending...' : 'Send test to me'}
          </button>
        </div>
      </div>
      {message && <p className='text-sm text-gray-700 mb-4'>{message}</p>}
      <iframe
        title='Email preview'
        className='w-full min-h-[720px] border border-gray-200 rounded-lg bg-white'
        src={`/api/network-distribution/emails/preview?template=${template}`}
      />
    </div>
  );
}
