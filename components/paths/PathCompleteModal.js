import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { FaLinkedinIn, FaSpinner } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { updateAWSUser } from '../../helpers/api';

const PathCompleteModal = ({ path, onClose, credential }) => {
  const { awsUser } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [linkedin, setLinkedin] = useState(awsUser.linkedin);
  const [error, setError] = useState(null);
  console.log(credential);
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

  const issueMonth = useMemo(() => {
    // Extract month from date string like "2025-06-19"
    // Assuming the date is available in credential or path data
    const dateString =
      credential?.issued_on || new Date().toISOString().split('T')[0];
    return parseInt(dateString.split('-')[1]); // Extract month (06 -> 6)
  }, [credential?.issued_on]);

  const issueYear = useMemo(() => {
    // Extract year from date string like "2025-06-19"
    const dateString =
      credential?.issued_on || new Date().toISOString().split('T')[0];
    return parseInt(dateString.split('-')[0]); // Extract year (2025)
  }, [credential?.issued_on]);

  const handleAddToLinkedIn = async () => {
    if (linkedin) {
      setError(null);
      await updateAWSUser({
        id: awsUser.id,
        linkedin: linkedin,
      });
      window.open(
        `https://www.linkedin.com/in/${linkedin}/edit/forms/certification/new/?certId=${credential.id}&certUrl=${credential.url}&isFromA2p=true&issueMonth=${issueMonth}&issueYear=${issueYear}&name=${credential.name}&organizationId=6672102`,
        '_blank'
      );
    } else {
      setError('Please enter your LinkedIn username');
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
            {credential ? (
              <div className='w-full bg-base-dark p-5 rounded flex flex-col gap-6'>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex flex-col gap-2 pr-3'>
                    <div className='font-bold text-lg text-white'>
                      Share your Acheivement
                    </div>
                    <div className='text-sm text-slate-100'>
                      Share your credentials with your network and inspire them
                      to achieve their goals.
                    </div>
                  </div>
                  <div>
                    <div className='w-20 h-20 flex items-center justify-center'>
                      <GiDiploma size={70} className='text-brand-yellow' />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div>
                    <div className='flex items-center'>
                      <span className='bg-gray-50 border border-r-0 border-gray-300 rounded-l px-3 py-2.5 text-gray-500 text-sm'>
                        linkedin.com/in/
                      </span>
                      <input
                        type='text'
                        className='flex-1 p-2.5 rounded-r border border-gray-300 focus:border-clemson focus:ring-1 focus:ring-clemson placeholder:text-sm text-sm'
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder='Enter Username'
                      />
                    </div>
                  </div>
                  <div
                    className='cursor-pointer w-full bg-indigo-500 flex gap-2 items-center justify-center p-3 rounded hover:bg-indigo-600 transition-all duration-300'
                    onClick={handleAddToLinkedIn}
                  >
                    <div className='text-white'>
                      Add to Your LinkedIn Profile
                    </div>
                    <div className='w-6 h-6 flex items-center justify-center bg-white rounded'>
                      <FaLinkedinIn size={18} className='text-brand-indigo' />
                    </div>
                  </div>
                  {error && (
                    <div className='text-red-200 text-center text-sm'>
                      {error}
                    </div>
                  )}
                  <div
                    className='cursor-pointer w-full bg-white flex items-center justify-center p-1 rounded hover:bg-slate-200 transition-all duration-300 gap-4 mt-4'
                    onClick={() => {
                      window.open(credential.url, '_blank');
                    }}
                  >
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
            ) : (
              <div className='w-full bg-base-dark p-5 rounded flex flex-col gap-6'>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex flex-col gap-2 pr-3'>
                    <div className='font-bold text-lg text-white'>
                      Share your Acheivement
                    </div>
                    <div className='text-sm text-slate-100'>
                      Share your credentials with your network and inspire them
                      to achieve their goals.
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
                    <div>Loading your credential...</div>
                    <div className='w-6 h-6 flex items-center justify-center bg-brand-indigo rounded'>
                      <FaSpinner
                        size={18}
                        className='text-white animate-spin'
                      />
                    </div>
                  </div>
                  <div className='cursor-pointer w-full bg-white flex items-center justify-center p-1 rounded hover:bg-slate-200 transition-all duration-300 gap-4'>
                    <div>Loading your credential...</div>
                    <div className='w-6 h-6 flex items-center justify-center bg-brand-indigo rounded'>
                      <FaSpinner
                        size={18}
                        className='text-white animate-spin'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

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
