import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useSelector } from 'react-redux';
import { XMarkIcon } from '@heroicons/react/24/outline';
import EnrollmentAuthPanel, {
  markEnrollResume,
} from './EnrollmentAuthPanel';
import { isWorkEmail } from '../../helpers/workEmail';

const StepPills = ({ current }) => {
  const steps = ['Sign in', 'Request approval'];
  return (
    <div className='flex items-center gap-2'>
      {steps.map((label, index) => {
        const step = index + 1;
        const active = current === step;
        const done = current > step;
        return (
          <div key={label} className='flex items-center gap-2'>
            <div
              className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                active || done ? 'text-white' : 'text-white/75'
              }`}
            >
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                  active
                    ? 'bg-[#f4aa00] text-[#0A1D3A]'
                    : done
                      ? 'bg-white/20 text-white'
                      : 'border border-white/50 text-white/80'
                }`}
              >
                {done ? '✓' : step}
              </span>
              <span className='hidden sm:inline'>{label}</span>
            </div>
            {index === 0 && <span className='h-px w-6 bg-white/25' />}
          </div>
        );
      })}
    </div>
  );
};

export default function EnrollmentRequestModal({
  open,
  onClose,
  course,
  coupon = 'networklibrary',
  page = '/network-distribution',
  onSubmitted,
}) {
  const { user, isLoading: userIsLoading } = useUser();
  const { awsUser } = useSelector((state) => state.auth);
  const [salesLeaderEmail, setSalesLeaderEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) {
      setSalesLeaderEmail('');
      setConfirmed(false);
      setSubmitting(false);
      setError('');
      setSuccess(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && user?.email) {
      fetch('/api/network-distribution/ensure-thinkific', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: awsUser?.name || user?.name,
          firstName: user?.given_name,
          lastName: user?.family_name,
        }),
      }).catch((err) =>
        console.warn('Thinkific ensure failed (non-fatal):', err),
      );
    }
  }, [
    open,
    user?.email,
    awsUser?.name,
    user?.name,
    user?.given_name,
    user?.family_name,
  ]);

  const handleAuthenticated = () => {
    window.location.reload();
  };

  const submitRequest = async (event) => {
    event.preventDefault();
    setError('');

    if (!confirmed) {
      setError('Please confirm you have approval from your Sales Leader.');
      return;
    }
    if (!isWorkEmail(salesLeaderEmail.trim())) {
      setError('Enter a valid work email for your Sales Leader.');
      return;
    }

    setSubmitting(true);
    try {
      await fetch('/api/network-distribution/ensure-thinkific', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: awsUser?.name || user?.name,
          firstName: user?.given_name,
          lastName: user?.family_name,
        }),
      });

      const response = await fetch(
        '/api/network-distribution/enrollment-requests',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            salesLeaderEmail: salesLeaderEmail.trim(),
            courseId: course.id || course.courseId,
            courseName: course.title,
            courseImage: course.seoImage,
            courseLink: course.link,
            thinkificId:
              course.thinkificBundleId || course.thinkificId || null,
            couponCode: coupon,
            page,
            requesterUserID: awsUser?.id || null,
            requesterName: awsUser?.name || user?.name || user?.email,
          }),
        },
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || 'Could not submit request.');
      }

      setSuccess(true);
      if (typeof onSubmitted === 'function') {
        onSubmitted(data.item);
      }
    } catch (err) {
      setError(err.message || 'Could not submit request.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentStep = success ? 3 : user && isWorkEmail(user.email) ? 2 : 1;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-[#0A1D3A]/70 backdrop-blur-[2px] transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-left sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-[480px]'>
                <div className='bg-[#0A1D3A] px-5 py-4 sm:px-6'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <Dialog.Title className='text-lg font-semibold text-white'>
                        Request enrollment
                      </Dialog.Title>
                      <StepPills current={currentStep} />
                    </div>
                    <button
                      type='button'
                      onClick={onClose}
                      className='rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white'
                      aria-label='Close'
                    >
                      <XMarkIcon className='h-5 w-5' />
                    </button>
                  </div>
                  {course && (
                    <div className='mt-4'>
                      {course.courseId && (
                        <p className='text-sm font-semibold tracking-wide text-[#f4aa00]'>
                          {course.courseId}
                        </p>
                      )}
                      <p className='text-xl font-semibold text-white leading-snug mt-0.5'>
                        {course.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className='px-5 py-6 sm:px-6'>
                  {userIsLoading ? (
                    <div className='flex flex-col items-center py-10 gap-3'>
                      <div className='w-10 h-10 border-4 border-[#0A1D3A] border-t-transparent rounded-full animate-spin' />
                      <p className='text-slate-500 text-sm'>
                        Checking your account...
                      </p>
                    </div>
                  ) : success ? (
                    <div className='flex flex-col items-start gap-4'>
                      <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A1D3A]/60'>
                        Request sent
                      </p>
                      <h3 className='text-lg font-semibold text-[#0A1D3A]'>
                        Your sales leader has been notified
                      </h3>
                      <p className='text-sm text-slate-600 leading-relaxed'>
                        They will receive an email to approve this enrollment.
                        You will get a confirmation once they decide, and the
                        course will appear on your Learning Dashboard if
                        approved.
                      </p>
                      <button
                        type='button'
                        onClick={onClose}
                        className='w-full h-11 bg-[#0A1D3A] text-white rounded-md text-sm font-semibold hover:bg-[#12294f]'
                      >
                        Back to library
                      </button>
                    </div>
                  ) : !user || !isWorkEmail(user.email) ? (
                    !user ? (
                    <EnrollmentAuthPanel
                      course={course}
                      onAuthenticated={handleAuthenticated}
                    />
                    ) : (
                      <div className='flex flex-col gap-4'>
                        <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A1D3A]/60'>
                          Step 1 of 2
                        </p>
                        <h3 className='text-lg font-semibold text-[#0A1D3A]'>
                          Use your work email
                        </h3>
                        <p className='text-sm text-slate-600 leading-relaxed'>
                          You are signed in as{' '}
                          <span className='font-medium'>{user.email}</span>.
                          Enrollment requests must be submitted with a work
                          email.
                        </p>
                        <a
                          href={`/api/auth/logout?returnTo=${encodeURIComponent(
                            '/network-distribution',
                          )}`}
                          onClick={() => markEnrollResume(course)}
                          className='w-full h-11 inline-flex items-center justify-center bg-[#0A1D3A] text-white rounded-md text-sm font-semibold hover:bg-[#12294f]'
                        >
                          Sign out and use work email
                        </a>
                      </div>
                    )
                  ) : (
                    <form className='flex flex-col gap-5' onSubmit={submitRequest}>
                      <div>
                        <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A1D3A]/60'>
                          Step 2 of 2
                        </p>
                        <h3 className='text-lg font-semibold text-[#0A1D3A] mt-1'>
                          Confirm sales leader approval
                        </h3>
                        <p className='text-sm text-slate-500 mt-1 leading-relaxed'>
                          Enrollment is processed after your sales leader
                          approves this request.
                        </p>
                      </div>

                      <label className='flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 cursor-pointer'>
                        <input
                          type='checkbox'
                          className='mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0A1D3A] focus:ring-[#0A1D3A]'
                          checked={confirmed}
                          onChange={(e) => setConfirmed(e.target.checked)}
                        />
                        <span className='leading-relaxed'>
                          I have approval from my Sales Leader to enroll in this
                          course / program.
                        </span>
                      </label>

                      <div>
                        <label className='block text-sm font-medium text-slate-700 mb-1.5'>
                          Sales Leader email
                        </label>
                        <input
                          type='email'
                          required
                          value={salesLeaderEmail}
                          onChange={(e) => setSalesLeaderEmail(e.target.value)}
                          placeholder='leader@networkdistribution.com'
                          className='w-full h-11 border border-slate-200 rounded-md px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A1D3A]/20 focus:border-[#0A1D3A]'
                        />
                        <p className='text-xs text-slate-400 mt-1.5'>
                          They will receive an email with approve and decline
                          options.
                        </p>
                      </div>

                      {error && (
                        <p className='text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-3 py-2'>
                          {error}
                        </p>
                      )}

                      <div className='flex gap-3 pt-1'>
                        <button
                          type='button'
                          onClick={onClose}
                          className='flex-1 h-11 border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50'
                        >
                          Cancel
                        </button>
                        <button
                          type='submit'
                          disabled={submitting}
                          className='flex-[1.4] h-11 bg-[#0A1D3A] text-white rounded-md text-sm font-semibold hover:bg-[#12294f] disabled:opacity-70'
                        >
                          {submitting ? 'Sending request...' : 'Send request'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
