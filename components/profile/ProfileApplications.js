import React, { useState, useEffect } from 'react';
import { CertCard } from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import { getCertificates } from '../../helpers/api';
import { useRouter } from 'next/router';

const ProfileApplications = ({ CMPM, CPS }) => {
  const [certificates, setCertificates] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getCertificates().then((res) => {
      console.log(res);
      setCertificates(
        res.filter(
          (cert) => cert.abbreviation === 'CMPM' || cert.abbreviation === 'CPS'
        )
      );
    });
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <div className='w-fit grid grid-cols-2 gap-8'>
        {certificates.length > 0 && (
          <>
            <div className='w-full bg-base-brand/20 rounded-lg p-4 flex flex-col gap-6'>
              <CertCard
                cert={
                  certificates.filter((cert) => cert.abbreviation === 'CMPM')[0]
                }
              />
              <div className='flex flex-col gap-2 items-center'>
                <div>
                  {CMPM ? 'Application Submitted' : 'Application Not Submitted'}
                </div>
              </div>
              <div className='w-full flex items-center justify-center'>
                <div
                  className='w-44 text-center bg-clemson hover:bg-clemson/80 text-white rounded-lg p-2 cursor-pointer font-semibold'
                  onClick={() =>
                    router.push(
                      `/certificate-of-mastery-in-packaging-management`
                    )
                  }
                >
                  {CMPM ? 'View Application' : 'Apply Now'}
                </div>
              </div>
            </div>
            <div className='w-full bg-base-brand/20 rounded-lg p-4 flex flex-col gap-6'>
              <CertCard
                cert={
                  certificates.filter((cert) => cert.abbreviation === 'CPS')[0]
                }
              />
              <div className='flex flex-col gap-2 items-center'>
                <div>
                  {CPS ? 'Application Submitted' : 'Application Not Submitted'}
                </div>
              </div>
              <div className='w-full flex items-center justify-center'>
                <div
                  className='w-44 text-center bg-clemson hover:bg-clemson/80 text-white rounded-lg p-2 cursor-pointer font-semibold'
                  onClick={() =>
                    router.push(`/certificate-of-packaging-science-application`)
                  }
                >
                  {CPS ? 'View Application' : 'Apply Now'}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileApplications;
