import React from 'react';
import IconBadge from '../shared/IconBadge';
import {
  GiFizzingFlask,
  GiForest,
  GiPalette,
  GiCarWheel,
  GiHoneycomb,
  GiBoxUnpacking,
  GiAstronautHelmet,
  GiDiploma,
} from 'react-icons/gi';
import Lottie from 'lottie-react';
import pathComplete from '/public/pathcomplete.json';
import { FaLinkedinIn } from 'react-icons/fa';

const PathCompleteModal = ({ path, onClose }) => {
  const renderIcon = (icon) => {
    switch (icon) {
      case 'GiFizzingFlask':
        return <GiFizzingFlask size={50} className='text-white' />;
      case 'GiForest':
        return GiForest;
      case 'GiPalette':
        return GiPalette;
      case 'GiCarWheel':
        return GiCarWheel;
      case 'GiHoneycomb':
        return GiHoneycomb;
      case 'GiBoxUnpacking':
        return GiBoxUnpacking;
      case 'GiAstronautHelmet':
        return GiAstronautHelmet;
      default:
        return GiBoxUnpacking;
    }
  };

  return (
    path && (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn'>
        <div className='bg-white px-8 pt-10 pb-8 rounded-lg w-full max-w-md relative animate-scaleIn'>
          <div className='absolute z-0 flex items-center justify-center'>
            <Lottie
              animationData={pathComplete}
              loop={false}
              autoplay={true}
              className='w-[100%] h-[100%]'
            />
          </div>
          <div className='flex flex-col gap-8 items-center justify-center'>
            <div className='text-center font-oswald tracking-[0.2em] uppercase text-base-brand text-2xl'>
              Congratulations!
            </div>
            <IconBadge icon={renderIcon(path?.icon)} size={160} />
            <div className='flex flex-col gap-3 items-center justify-center'>
              <div className='h3-base text-center'>Path Completed</div>
              <p className=' text-gray-500 text-center'>
                You have completed the{' '}
                <span className='font-bold'>{path?.title}</span> path. Keep your
                momentum going—new skills, new opportunities await. Share your
                badge of honor on LinkedIn or social media and inspire your
                network!
              </p>
            </div>
            <div className='w-full bg-base-dark p-5 rounded flex flex-col gap-6'>
              <div className='flex items-center justify-between w-full'>
                <div className='flex flex-col gap-2 pr-3'>
                  <div className='font-bold text-lg text-white'>
                    Share your Acheivement
                  </div>
                  <div className='text-sm text-slate-100'>
                    Share your credentials with your network and inspire them to
                    achieve their goals.
                  </div>
                </div>
                <div>
                  <div className='w-20 h-20 flex items-center justify-center'>
                    <GiDiploma size={70} className='text-brand-yellow' />
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='cursor-pointer w-full bg-white flex gap-2 items-center justify-center p-3 rounded hover:bg-slate-200 transition-all duration-300'>
                  <div>Add to Your LinkedIn Profile</div>
                  <div className='w-6 h-6 flex items-center justify-center bg-brand-indigo rounded'>
                    <FaLinkedinIn size={18} className='text-white' />
                  </div>
                </div>
                <div className='cursor-pointer w-full bg-white flex items-center justify-center p-1 rounded hover:bg-slate-200 transition-all duration-300 gap-4'>
                  <div>View on Accredible</div>
                  <div
                    className='w-20 h-10 flex items-center justify-center bg-center bg-contain bg-no-repeat'
                    style={{
                      backgroundImage: `url(${'https://packschool.s3.us-east-1.amazonaws.com/accredible_credential_net_logo.svg'})`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div
              className='text-center cursor-pointer text-sm text-gray-500'
              onClick={() => {
                onClose();
              }}
            >
              Close
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PathCompleteModal;
