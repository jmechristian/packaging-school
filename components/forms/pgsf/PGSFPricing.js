import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const PGSFPricing = ({ email, free, onSubmit, payment }) => {
  const { awsUser } = useSelector((state) => state.auth);
  const [paymentConfirmation, setPaymentConfirmation] = useState('');

  const { register, formState } = useFormContext();

  useEffect(() => {
    if (awsUser && awsUser.pgsfForm && awsUser.pgsfForm.paymentConfirmation) {
      setPaymentConfirmation(awsUser.pgsfForm.paymentConfirmation);
    }
  }, [awsUser]);

  return (
    <div className='bg-white p-6 flex justify-center items-center mt-6'>
      <div className='mx-auto w-full'>
        <div className='mx-auto max-w-4xl rounded-3xl ring-1 ring-slate-200 lg:mx-0 lg:flex lg:max-w-none'>
          <div className='-mt-2 p-2 lg:mt-0 lg:w-full  lg:flex-shrink-0'>
            <div className='rounded-2xl py-10 text-center ring-1 ring-inset ring-slate-900/5 lg:flex lg:flex-col lg:justify-center lg:py-12'>
              <div className='w-full h-full max-w-[40%] mx-auto'>
                <Image
                  src='https://packschool.s3.us-east-1.amazonaws.com/logo-gpsfsd.png'
                  alt='PGSF Logo'
                  width={343}
                  height={143}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGSFPricing;
