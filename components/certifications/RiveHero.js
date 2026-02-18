import React, { useState } from 'react';
import { useRive } from '@rive-app/react-canvas';

/**
 * Rive animation hero - extracted for lazy loading.
 * Keeps @rive-app/react-canvas out of certifications initial bundle.
 * Shows a static poster image immediately (LCP candidate) while the
 * Rive runtime and .riv file download, then swaps to the canvas.
 */
export const RiveDemo = ({ poster }) => {
  const [riveReady, setRiveReady] = useState(false);

  const { RiveComponent } = useRive({
    src: 'https://packschool.s3.amazonaws.com/cert_rocket.riv',
    stateMachines: 'mainMachine',
    onLoadError: (err) => console.log(err),
    autoplay: true,
    onLoad: () => setRiveReady(true),
  });

  return (
    <div className='relative w-full h-full'>
      {poster && !riveReady && (
        <img
          src={poster}
          alt='Packaging School Certifications'
          fetchpriority='high'
          className='absolute inset-0 w-full h-full object-cover'
        />
      )}
      <div className={riveReady ? 'opacity-100' : 'opacity-0'}>
        <RiveComponent />
      </div>
    </div>
  );
};
