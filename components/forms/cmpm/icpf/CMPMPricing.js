import React, { useState, useEffect } from 'react';
// import CheckoutForm from '../../layout/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const CMPMPricing = ({ email, free, onSubmit, payment }) => {
  const { awsUser } = useSelector((state) => state.auth);
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  );

  useEffect(() => {
    if (awsUser && awsUser.cmpmForm && awsUser.cmpmForm.paymentConfirmation) {
      setPaymentConfirmation(awsUser.cmpmForm.paymentConfirmation);
    }
  }, [awsUser]);

  const [paymentConfirmation, setPaymentConfirmation] = useState('');

  const { register, formState } = useFormContext();

  return (
    <div className='bg-white p-6 flex justify-center items-center mt-6'>
      <div className='mx-auto w-full'>
        <div className='mx-auto max-w-4xl rounded-3xl ring-1 ring-slate-200 lg:mx-0 lg:flex lg:max-w-none'>
          <div className='-mt-2 p-2 lg:mt-0 lg:w-full  lg:flex-shrink-0'>
            <div className='rounded-2xl py-10 text-center ring-1 ring-inset ring-slate-900/5 lg:flex lg:flex-col lg:justify-center lg:py-12'>
              <div className='w-full h-full max-w-[40%] mx-auto'>
                <Image
                  src='https://packschool.s3.us-east-1.amazonaws.com/ICPF-Logo.png'
                  alt='ICPF Logo'
                  width={939}
                  height={523}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMPMPricing;
