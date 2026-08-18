import { useState } from 'react';
import { isWorkEmail } from '../../helpers/workEmail';

const ND_AUTH_MESSAGE = 'ND_AUTH_COMPLETE';
export const ND_ENROLL_STORAGE_KEY = 'ndEnrollCourse';
export const ND_ENROLL_RESUME_KEY = 'ndEnrollResume';

const toCourseSnapshot = (course) => {
  if (!course || typeof course !== 'object') return null;
  return {
    id: course.id || null,
    courseId: course.courseId || course.id || null,
    title: course.title || null,
    seoImage: course.seoImage || null,
    link: course.link || null,
    thinkificId: course.thinkificId || null,
    thinkificBundleId: course.thinkificBundleId || null,
  };
};

export const markEnrollResume = (course) => {
  if (typeof window === 'undefined') return;
  const snapshot = toCourseSnapshot(course);
  if (!snapshot) return;
  try {
    sessionStorage.setItem(ND_ENROLL_STORAGE_KEY, JSON.stringify(snapshot));
    sessionStorage.setItem(ND_ENROLL_RESUME_KEY, '1');
  } catch (err) {
    console.warn('Could not persist enroll course', err);
  }
};

let restoredThisLoad = undefined;

export const consumePendingEnrollCourse = () => {
  if (typeof window === 'undefined') return null;
  if (restoredThisLoad !== undefined) return restoredThisLoad;
  try {
    const resume = sessionStorage.getItem(ND_ENROLL_RESUME_KEY);
    const raw = sessionStorage.getItem(ND_ENROLL_STORAGE_KEY);
    sessionStorage.removeItem(ND_ENROLL_RESUME_KEY);
    sessionStorage.removeItem(ND_ENROLL_STORAGE_KEY);
    restoredThisLoad =
      resume === '1' && raw ? JSON.parse(raw) : null;
    return restoredThisLoad;
  } catch {
    restoredThisLoad = null;
    return null;
  }
};

export const clearEnrollResume = () => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(ND_ENROLL_STORAGE_KEY);
    sessionStorage.removeItem(ND_ENROLL_RESUME_KEY);
  } catch {
    // ignore
  }
};

export const getPopupReturnTo = () => '/auth/popup-complete';

export const openAuthPopup = (url) => {
  if (typeof window === 'undefined') return null;

  const width = 520;
  const height = 740;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  const popup = window.open(
    url,
    'nd-auth',
    `popup=yes,width=${width},height=${height},left=${left},top=${top},scrollbars=yes`,
  );

  return popup;
};

const fieldClass =
  'w-full h-11 border border-slate-200 rounded-md px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A1D3A]/20 focus:border-[#0A1D3A]';

export default function EnrollmentAuthPanel({ onAuthenticated, course }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState('');

  const returnTo = getPopupReturnTo();

  const launch = (url) => {
    markEnrollResume(course);
    const popup = openAuthPopup(url);
    if (!popup) {
      window.location.href = `/login?returnTo=${encodeURIComponent(
        '/network-distribution',
      )}`;
      return;
    }

    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== ND_AUTH_MESSAGE) return;
      window.removeEventListener('message', onMessage);
      if (typeof onAuthenticated === 'function') {
        onAuthenticated();
      } else {
        window.location.reload();
      }
    };

    window.addEventListener('message', onMessage);
  };

  const withReturnTo = (base) =>
    `${base}${base.includes('?') ? '&' : '?'}returnTo=${encodeURIComponent(returnTo)}`;

  const handlePrimary = () => {
    if (!isWorkEmail(email)) {
      setMessage('Use your work email. Personal addresses are not accepted.');
      return;
    }
    if (mode === 'signup' && (!firstName || !lastName)) {
      setMessage('Enter your first and last name to create an account.');
      return;
    }

    if (mode === 'signup') {
      launch(
        withReturnTo(
          `/api/auth/signup?login_hint=${encodeURIComponent(email.trim())}`,
        ),
      );
      return;
    }

    launch(
      withReturnTo(
        `/api/auth/password-login?email=${encodeURIComponent(email.trim())}`,
      ),
    );
  };

  return (
    <div className='flex flex-col gap-5'>
      <div>
        <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A1D3A]/60'>
          Step 1 of 2
        </p>
        <h3 className='text-lg font-semibold text-[#0A1D3A] mt-1'>
          {mode === 'signup' ? 'Create your account' : 'Sign in to continue'}
        </h3>
        <p className='text-sm text-slate-500 mt-1 leading-relaxed'>
          Use your work email. A secure window will open so you can stay on this
          page.
        </p>
      </div>

      <div className='space-y-3'>
        {mode === 'signup' && (
          <div className='grid grid-cols-2 gap-3'>
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First name'
              className={fieldClass}
            />
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last name'
              className={fieldClass}
            />
          </div>
        )}
        <div>
          <label className='block text-sm font-medium text-slate-700 mb-1.5'>
            Work email
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@company.com'
            className={fieldClass}
          />
        </div>
        <button
          type='button'
          onClick={handlePrimary}
          className='w-full h-11 bg-[#0A1D3A] text-white rounded-md text-sm font-semibold hover:bg-[#12294f] transition-colors'
        >
          {mode === 'signup' ? 'Create account' : 'Continue with password'}
        </button>
      </div>

      {message && (
        <p className='text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-3 py-2'>
          {message}
        </p>
      )}

      <p className='text-center text-sm text-slate-500'>
        {mode === 'signup' ? (
          <>
            Already have an account?{' '}
            <button
              type='button'
              className='font-semibold text-[#0A1D3A] hover:underline'
              onClick={() => setMode('login')}
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            New here?{' '}
            <button
              type='button'
              className='font-semibold text-[#0A1D3A] hover:underline'
              onClick={() => setMode('signup')}
            >
              Create an account
            </button>
          </>
        )}
      </p>
    </div>
  );
}
