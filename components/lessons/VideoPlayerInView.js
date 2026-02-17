import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const VideoPlayer = dynamic(
  () => import('../VideoPlayer').then((mod) => mod.default),
  { ssr: false }
);

/**
 * Wraps VideoPlayer and only loads/mounts it when the element enters the viewport.
 * Use for below-fold video players to reduce initial JS and improve LCP.
 */
const VideoPlayerInView = ({ videoEmbedLink, playing, ...props }) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
        }
      },
      { rootMargin: '100px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className='w-full aspect-[16/9] bg-black'>
      {isInView ? (
        <VideoPlayer
          videoEmbedLink={videoEmbedLink}
          playing={playing}
          {...props}
        />
      ) : (
        <div className='w-full h-full bg-black' />
      )}
    </div>
  );
};

export default VideoPlayerInView;
