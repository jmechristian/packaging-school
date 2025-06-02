import React, { useState, useEffect } from 'react';
import { CertCard } from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import {
  getCertificates,
  getUserCMPMForm,
  getUserCPSForm,
} from '../../helpers/api';
import { useRouter } from 'next/router';

const ProfileApplications = ({ CMPM, CPS }) => {
  const [certificates, setCertificates] = useState([]);
  const [CMPMForm, setCMPMForm] = useState(null);
  const [CPSForm, setCPSForm] = useState(null);
  const router = useRouter();
  useEffect(() => {
    getCertificates().then((res) => {
      setCertificates(
        res.filter(
          (cert) => cert.abbreviation === 'CMPM' || cert.abbreviation === 'CPS'
        )
      );
    });
  }, []);

  useEffect(() => {
    if (CMPM) {
      getUserCMPMForm(CMPM).then((res) => {
        console.log(res);
        setCMPMForm(res);
      });
    }
    if (CPS) {
      getUserCPSForm(CPS).then((res) => {
        console.log(res);
        setCPSForm(res);
      });
    }
  }, [CMPM, CPS]);
  return (
    <div className='flex flex-col gap-4 items-center w-full'>
      <div className='w-fit grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {certificates.length > 0 && (
          <>
            <div className='w-full bg-base-brand/20 rounded-lg p-4 flex flex-col gap-6'>
              <CertCard
                cert={
                  certificates.filter((cert) => cert.abbreviation === 'CMPM')[0]
                }
              />
              <div className='flex flex-col gap-2 w-full'>
                <div>
                  {CMPMForm ? (
                    <div className='flex flex-col gap-2 w-full text-gray-600'>
                      <div className='text-sm w-full border-t border-gray-300 pt-2'>
                        <span className='font-semibold'>Created:</span>{' '}
                        {new Date(CMPMForm.createdOn).toLocaleDateString()}
                      </div>
                      <div className='text-sm w-full border-t border-gray-300 pt-2'>
                        <span className='font-semibold'>Updated:</span>{' '}
                        {new Date(CMPMForm.updatedOn).toLocaleDateString()}
                      </div>
                      <div className='text-sm w-full border-y border-gray-300 py-2'>
                        <span className='font-semibold'>Status:</span>{' '}
                        {CMPMForm.status}
                      </div>
                    </div>
                  ) : (
                    <div className='w-full flex items-center text-sm text-center text-gray-600 justify-center border border-gray-300 rounded-lg h-[112px]'>
                      No Application Submitted
                    </div>
                  )}
                </div>
              </div>
              <div className='w-full flex items-center justify-center'>
                <div
                  className='w-44 text-center bg-clemson hover:bg-clemson/80 text-white rounded-lg p-2 cursor-pointer font-semibold'
                  onClick={() => {
                    if (CMPMForm) {
                      router.push(`/forms/cmpm/${CMPM}`);
                    } else {
                      router.push(
                        `/certificate-of-mastery-in-packaging-management`
                      );
                    }
                  }}
                >
                  {CMPMForm ? 'View Application' : 'Apply Now'}
                </div>
              </div>
            </div>
            <div className='w-full bg-base-brand/20 rounded-lg p-4 flex flex-col gap-6'>
              <CertCard
                cert={
                  certificates.filter((cert) => cert.abbreviation === 'CPS')[0]
                }
              />
              <div className='flex flex-col gap-2 items-center w-full'>
                {CPSForm ? (
                  <div className='flex flex-col gap-2 w-full text-gray-600'>
                    <div className='text-sm w-full border-t border-gray-300 pt-2'>
                      <span className='font-semibold'>Created:</span>{' '}
                      {new Date(CPSForm.createdOn).toLocaleDateString()}
                    </div>
                    <div className='text-sm w-full border-t border-gray-300 pt-2'>
                      <span className='font-semibold'>Updated:</span>{' '}
                      {new Date(CPSForm.updatedOn).toLocaleDateString()}
                    </div>
                    <div className='text-sm w-full border-y border-gray-300 py-2'>
                      <span className='font-semibold'>Status:</span>{' '}
                      {CPSForm.status}
                    </div>
                  </div>
                ) : (
                  <div className='w-full flex items-center text-sm text-center text-gray-600 justify-center border border-gray-300 rounded-lg h-[112px]'>
                    No Application Submitted
                  </div>
                )}
              </div>
              <div className='w-full flex items-center justify-center'>
                <div
                  className='w-44 text-center bg-clemson hover:bg-clemson/80 text-white rounded-lg p-2 cursor-pointer font-semibold'
                  onClick={() => {
                    if (CPSForm) {
                      router.push(`/forms/cps/${CPS}`);
                    } else {
                      router.push(
                        `/certificate-of-packaging-science-application`
                      );
                    }
                  }}
                >
                  {CPSForm ? 'View Application' : 'Apply Now'}
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
