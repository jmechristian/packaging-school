import React from 'react';

const LoadingState = ({ message = 'Loading...', isSlowNetwork = false }) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>{message}</h2>
        {isSlowNetwork && (
          <p className='text-sm text-gray-600 max-w-md'>
            This may take a moment on corporate networks. Please don&apos;t
            refresh the page.
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingState;
