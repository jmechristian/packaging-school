import React, { useState } from 'react';
import {
  LockClosedIcon,
  LockOpenIcon,
  BoltIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const APSPresentations = ({ presentations }) => {
  const [toHover, setToHover] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isPassword, setIsPassword] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSelectedVid, setIsSelectedVid] = useState('');

  const clickHandler = (vid) => {
    if (!isLocked) {
      setIsSelectedVid(vid);
      setIsOpen(true);
    }
  };

  const validatePasswordHandler = () => {
    if (isPassword.toLowerCase() === 'packpresentations23') {
      setIsPassword('');
      setIsUnlocking(false);
      setIsLocked(false);
    } else {
      setIsPassword('Invalid Password!');
    }
  };

  const unlockHandler = () => {
    setIsUnlocking(!isUnlocking);
  };
  return (
    <div className='w-full max-w-7xl mx-auto lg:px-0 pb-12'>
      <div className='w-full h-full border-2 border-neutral-900 bg-neutral-900 flex flex-col p-0.5 gap-1 '>
        <div className='w-full bg-neutral-800 rounded-t-lg'>
          <div className='w-full flex justify-between items-center px-5 py-4'>
            <div className='font-oswald uppercase text-white text-xl md:text-2xl tracking-wide'>
              <span className='text-ap-yellow'>Presentations</span> / 2024
            </div>
            <div className='flex gap-3 items-center h-full -mr-3 md:mr-0'>
              <div
                className={`cursor-pointer bg-gradient-to-r gap-2 from-ap-darkblue to-ap-yellow w-fit p-4 rounded-full md:py-2 md:px-6 md:rounded-lg flex items-center`}
                onClick={unlockHandler}
              >
                <div className='w-5 h-5'>
                  {isLocked ? (
                    <LockClosedIcon className='w-5 h-5 stroke-white' />
                  ) : (
                    <LockOpenIcon className='w-5 h-5 stroke-white' />
                  )}
                </div>
                <div className='text-white font-semibold hidden md:block'>
                  {isLocked ? 'Unlock' : 'Unlocked!'}
                </div>
              </div>
              {isLocked && isUnlocking && (
                <div className='flex items-center h-full bg-ap-blue rounded-lg'>
                  <div>
                    <input
                      type='text'
                      placeholder='Enter Password'
                      className='text-neutral-600 placeholder:text-neutral-400 bg-neutral-300 rounded-l-lg border-0'
                      value={isPassword}
                      onChange={(e) => setIsPassword(e.target.value)}
                    />
                  </div>
                  <div
                    className='bg-ap-blue text-white px-3 py-2 h-full cursor-pointer rounded-lg'
                    onClick={validatePasswordHandler}
                  >
                    <div className='w-5 h-5 rounded-r-xl'>
                      <ArrowRightIcon className='w-5 h-5 stroke-white' />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='w-full h-full aspect-video relative'>
          <div
            className={`absolute inset-0 rounded-xl bg-ap-darkblue bg-opacity-80 z-10`}
          >
            <div className='flex font-medium leading-tight items-center justify-center w-full h-full text-white max-w-xl mx-auto text-center text-4xl'>
              Video presentations will be coming mid-November 2024! Until then
              enjoy the photo gallery above.
            </div>
          </div>
          <div
            className='absolute inset-0 rounded-xl z-5 bg-cover bg-center grayscale'
            style={{
              backgroundImage: `url('https://packmedia54032-staging.s3.amazonaws.com/public/aps24/img-5083webp')`,
            }}
          ></div>
        </div>

        {/* START CONTENT */}

        {/* <div
          className='w-full rounded-b-xl relative bg-neutral-900 flex flex-col lg:flex-row items-center cursor-pointer'
          onClick={() =>
            clickHandler(
              'https://player.vimeo.com/video/891978699?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            )
          }
        >
          <div
            className={`${
              toHover
                ? 'scale-115 transition-all ease-in shadow-xl bg-white'
                : ' shadow-lg'
            } cursor-pointer bg-gradient-to-r mt-4 gap-2 from-ap-darkblue to-ap-blue py-3 px-6 rounded-full h-12 w-12 flex justify-center items-center absolute -top-1 right-3 z-20`}
          >
            <div className={`${toHover ? 'scale-115' : ''}`}>
              {isLocked ? (
                <LockClosedIcon className='w-5 h-5 stroke-white' />
              ) : (
                <LockOpenIcon className='w-5 h-5 stroke-white' />
              )}
            </div>
          </div>
          <div className='max-w-5xl flex flex-col mx-auto gap-4 w-full h-full justify-end lg:justify-center p-6 md:py-12 lg:py-10 relative'>
            <div className='flex items-center gap-1 py-2 px-3 bg-ap-yellow w-fit rounded'>
              <div>
                <BoltIcon className='w-5 h-5 stroke-white' />
              </div>
              <div className='text-sm text-white font-bold rounded-lg'>
                KEYNOTE
              </div>
            </div>
            <div className='text-white max-w-xl text-4xl lg:text-5xl font-oswald font-bold lg:first-letter:leading-tight'>
              GM’s 2030 Packaging Sustainability Roadmap
            </div>
            <div className='flex flex-col'>
              <div className='font-bold text-lg text-ap-blue'>
                Jeremy Galanty
              </div>
              <div className=' text-white italic'>
                Sustainability Analyst, GM Motors
              </div>
            </div>
          </div>
          <div
            className='aspect-square bg-no-repeat w-full lg:aspect-auto lg:h-[400px] lg:w-[400px] rounded-xl bg-white bg-contain bg-center'
            style={{
              backgroundImage: `url('https://packschool.s3.amazonaws.com/gallant-2.png')`,
            }}
          ></div>
        </div>

        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-xl gap-1'>
          {presentations &&
            presentations.map((pres, i) => (
              <div key={pres.title} onClick={() => clickHandler(pres.video)}>
                <PresentationBlock
                  backgroundColor={pres.backgroundColor}
                  title={pres.title}
                  speakers={pres.speakers}
                  description={pres.description}
                  backgroundImage={pres.backgroundImage}
                  locked={isLocked}
                />
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
};

export default APSPresentations;

const PresentationBlock = ({
  backgroundColor,
  title,
  description,
  locked,
  backgroundImage,
  speakers,
}) => {
  const [toHover, setToHover] = useState(false);

  return (
    <div
      className='h-[350px] w-full rounded-xl bg-cover bg-top relative cursor-pointer'
      style={{
        backgroundImage: `url(${
          backgroundImage
            ? backgroundImage
            : 'https://packschool.s3.amazonaws.com/trienda-aps.png'
        })`,
      }}
    >
      <div
        className={`absolute inset-0 rounded-xl bg-ap-darkblue bg-opacity-80`}
      ></div>
      <div className='relative z-20 flex flex-1 flex-col gap-3 w-full h-full pl-6 pr-9 pb-5 pt-28'>
        <div className='flex flex-col gap-3'>
          <div className='text-white max-w-xs text-2xl lg:leading-none xl:leading-none font-oswald font-medium leading-none'>
            {title}
          </div>
          {/* <div className='max-w-xs text-white text-sm leading-snug'>
                {description}
              </div> */}
          <div className='flex flex-col'>
            {speakers && (
              <div className='grid xl:grid-cols-2 gap-3 mt-2 overflow-hidden'>
                {speakers.map((speaker, i) => (
                  <div key={speaker.name} className='flex flex-col'>
                    <div className='font-bold leading-tight text-sm text-ap-yellow'>
                      {speaker.name}
                    </div>
                    <div className='text-white text-xs leading-tight'>
                      {speaker.title}, {speaker.company}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          toHover ? 'scale-115 transition ease-in shadow-xl' : 'shadow-lg'
        } cursor-pointer bg-gradient-to-r mt-4 gap-2 from-ap-darkblue to-ap-blue py-3 px-6 rounded-full h-12 w-12 flex justify-center items-center absolute -top-1 right-3 z-30`}
      >
        {locked ? (
          <div>
            <LockClosedIcon className='w-6 h-6 stroke-white' />
          </div>
        ) : (
          <div>
            <LockOpenIcon className='w-6 h-6 stroke-white' />
          </div>
        )}
      </div>
    </div>
  );
};
