import React from 'react';
import VideoPlayer from '../../VideoPlayer';
import FadeIn from '../../../helpers/FadeIn';

const APCVideo = () => {
  return (
    <section>
      <div className='flex flex-col gap-9 container-7xl'>
        <div className='flex flex-col gap-9 max-w-4xl mx-auto'>
          <h2 className='text-4xl lg:text-5xl max-w-2xl dark:text-white '>
            <FadeIn>
              Learn best practices from the industry&apos;s top minds.
            </FadeIn>
          </h2>
          <div>
            <FadeIn>
              <p className='dark:text-gray-500 text-slate-700 font-greycliff text-xl'>
                We&apos;ve collaborated with subject matter experts and
                state-of-the-art facilities so you&apos;ll understand the unique
                roles of Tier 1s, OEMs, and packaging suppliers. We&apos;ll
                cover part and packaging storage, handling, identification, and
                customization of returnable and expendable packaging solutions.
              </p>
            </FadeIn>
          </div>
        </div>
        <FadeIn>
          <div className='w-full h-full aspect-[16/9] lg:mt-8'>
            <VideoPlayer
              videoEmbedLink={
                'https://player.vimeo.com/video/358392462?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
              }
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default APCVideo;
