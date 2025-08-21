import { MdLaunch } from 'react-icons/md';
import VideoPlayer from '../VideoPlayer';
import GradientCTA from '../GradientCTA';
import { GiDiploma } from 'react-icons/gi';
import { useRouter } from 'next/router';

export default function AndrewVideo() {
  const router = useRouter();
  return (
    <div className='bg-gray-900 py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-5xl sm:text-center'>
          <h2 className='h4-base text-clemson'>TEDx ClemsonU</h2>
          <p className='mt-2 text-3xl font-greycliff font-bold tracking-tight text-white sm:text-4xl'>
            Unveiling Packaging Truths
          </p>
          <div className='mt-6 text-lg   text-gray-300'>
            Packaging is everywhere, but are we measuring its true environmental
            impact? In this talk, Dr. Andrew Hurley challenges the conventional
            metrics we use to assess the sustainability of meal bar packaging.
            Dr. Andrew Hurley will present an investigation into the
            environmental impacts of the six billion meal bar wrappers produced
            annually in the USA. His talk will reveal how consumers perceive the
            environmental friendliness of package design and how this perception
            changes when they are confronted with the actual environmental
            consequences.
          </div>
          <div
            className='mt-6 text-lg font-bold text-white flex items-center justify-center gap-x-3 w-fit mx-auto bg-clemson hover:bg-clemson-dark cursor-pointer rounded-lg py-3 px-6'
            onClick={() => {
              window.open(
                'https://docs.google.com/forms/d/1f0RuTLomdwYjV-xgh5FBvePjaDEGL-EwWf1sbEUpmIU/viewform?edit_requested=true',
                '_blank'
              );
            }}
          >
            Invite Dr. Hurley to your next event
            <div>
              <MdLaunch className='w-7 h-7 text-white/50' />
            </div>
          </div>
        </div>
      </div>
      <div className='relative overflow-hidden pt-16'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8 aspect-[16/9]'>
          <VideoPlayer
            videoEmbedLink={'https://www.youtube.com/watch?v=DD9--tcw1XU'}
          />
          <div className='relative' aria-hidden='true'>
            <div className='absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]' />
          </div>
        </div>
      </div>
    </div>
  );
}
