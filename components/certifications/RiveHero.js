import React from 'react';
import { useRive } from '@rive-app/react-canvas';

/**
 * Rive animation hero - extracted for lazy loading.
 * Keeps @rive-app/react-canvas out of certifications initial bundle.
 */
export const RiveDemo = () => {
  const { RiveComponent } = useRive({
    src: 'https://packschool.s3.amazonaws.com/cert_rocket.riv',
    stateMachines: 'mainMachine',
    onLoadError: (err) => console.log(err),
    autoplay: true,
  });

  return <RiveComponent />;
};
