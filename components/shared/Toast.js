import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { TrophyIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../../features/navigation/navigationSlice';
import Lottie from 'lottie-react';
import toastAnimation from '/public/toast.json';

export default function Toast() {
  const dispatch = useDispatch();
  const { toast, showToast } = useSelector((state) => state.nav);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer;
    let progressTimer;

    if (showToast) {
      // Reset progress when toast shows
      setProgress(100);

      // Update progress bar every 30ms (100 steps over 3 seconds)
      progressTimer = setInterval(() => {
        setProgress((prev) => Math.max(prev - 1, 0));
      }, 30);

      // Auto close after 3 seconds
      timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [showToast, dispatch]);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live='assertive'
        className='pointer-events-none fixed inset-0 flex items-start justify-end pt-24 px-4 pb-20 z-[9999]'
      >
        <div className='flex w-full flex-col items-end space-y-4'>
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={showToast}
            enter='transform transition duration-300 ease-out'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transform transition duration-300 ease-in'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <div className='relative w-full max-w-sm'>
              {/* Lottie animation container */}
              <div className='absolute -inset-10 z-0 flex items-center justify-center'>
                <Lottie
                  animationData={toastAnimation}
                  loop={false}
                  autoplay={true}
                  className='w-[200%] h-[200%]'
                />
              </div>

              {/* Toast content */}
              <div className='pointer-events-auto w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg ring-1 ring-black/5 relative z-10'>
                <div className='w-full grid grid-cols-12'>
                  <div className='col-span-2 bg-clemson flex items-center justify-center'>
                    <TrophyIcon
                      aria-hidden='true'
                      className='w-12 h-12 text-white'
                    />
                  </div>
                  <div className='col-span-10 p-5 relative'>
                    <button
                      type='button'
                      onClick={() => dispatch(hideToast())}
                      className='absolute top-2 right-2 p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200'
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon aria-hidden='true' className='w-5 h-5' />
                    </button>
                    <div className='flex flex-col gap-0'>
                      <div className='font-bold text-gray-900'>
                        {toast?.message || 'Successfully saved!'}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {toast?.description}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Progress bar */}
                <div className='h-1 w-full bg-gray-100'>
                  <div
                    className='h-full bg-base-brand'
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
