import { useState } from 'react';

const EducationPartnerCallout = ({ page, pageTitle }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setStatus('saving');
    setMessage('');

    try {
      const response = await fetch('/api/education-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, page, pageTitle }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          data.message || 'Could not save your email. Email info@packagingschool.com.',
        );
      }
      setStatus('saved');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <section className='border border-black bg-base-brand/10 px-6 py-6 md:px-8 md:py-7'>
      <div className='flex max-w-2xl flex-col gap-2'>
        <p className='text-xs font-semibold uppercase tracking-[0.18em] text-base-dark'>
          Education partners
        </p>
        <h2 className='text-2xl font-semibold leading-tight text-neutral-900'>
          Become an Education Partner
        </h2>
        <p className='text-base leading-snug text-neutral-800'>
          Have a unique packaging material, process, or technology you want to
          highlight? We want to hear from you!
        </p>
        <p className='text-sm leading-snug text-neutral-700'>
          Enter your email below, and a Packaging School team member will reach
          out with more information.
        </p>
      </div>

      {status === 'saved' ? (
        <p className='mt-5 text-sm font-semibold text-neutral-900' role='status'>
          Thanks. A Packaging School team member will be in touch.
        </p>
      ) : (
        <form onSubmit={submit} className='mt-5 flex max-w-xl flex-col gap-3'>
          <div className='flex flex-col gap-3 sm:!flex-row sm:!items-center'>
            <label className='sr-only' htmlFor='education-partner-email'>
              Email
            </label>
            <input
              id='education-partner-email'
              type='email'
              required
              autoComplete='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder='you@email.com'
              className='h-11 w-full border border-black bg-white px-3 text-neutral-900'
            />
            <button
              type='submit'
              disabled={status === 'saving'}
              className='h-11 shrink-0 border border-black bg-clemson px-5 text-sm font-semibold uppercase tracking-wide text-neutral-900 disabled:opacity-60'
            >
              {status === 'saving' ? 'Sending...' : 'Send'}
            </button>
          </div>
          {status === 'error' && message ? (
            <p className='text-sm text-red-700' role='alert'>
              {message}
            </p>
          ) : null}
        </form>
      )}
    </section>
  );
};

export default EducationPartnerCallout;
