import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import CertificateModalItem from './CertificateModalItem';
import { useRouter } from 'next/router';
const CertificateModal = ({
  isOpen,
  setIsOpen,
  certificates,
  onSelectCertificate,
}) => {
  const router = useRouter();
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
      <div className='fixed inset-0 bg-black/50' aria-hidden='true' />

      <div className='fixed inset-0 flex items-center justify-center'>
        <Dialog.Panel
          className='mx-auto max-w-4xl w-full rounded-lg bg-white max-h-[94vh] overflow-y-auto relative'
          id='scrollers'
        >
          <div className='flex justify-between pt-5 px-5'>
            <div className='flex gap-2'>
              <div>
                <AcademicCapIcon className='h-8 w-8 text-gray-500' />
              </div>
              <Dialog.Title className='text-xl lg:!text-2xl font-semibold text-gray-900 leading-none'>
                Comprehensive Certificate Programs
              </Dialog.Title>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='text-gray-500 hover:text-gray-700 transition-colors'
            >
              <XMarkIcon className='h-6 w-6' />
            </button>
          </div>

          <div className='space-y-3 p-5 mt-1'>
            {certificates.map((certificate) => (
              <CertificateModalItem
                key={certificate.id}
                certificate={certificate}
                onSelectCertificate={() => router.push(`${certificate.link}`)}
              />
            ))}
          </div>

          <div className='!sticky left-0 right-0 bottom-0 h-40 !bg-gradient-to-t !from-white via-white !to-transparent z-[60]'></div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CertificateModal;
