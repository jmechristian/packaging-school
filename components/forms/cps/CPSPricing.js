import React, { useState, useEffect } from 'react';
import CheckoutForm from '../../layout/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

const CPSPricing = ({ email, free }) => {
  const { awsUser } = useSelector((state) => state.auth);
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  );

  useEffect(() => {
    if (awsUser && awsUser.cpsForm && awsUser.cpsForm.paymentConfirmation) {
      setPaymentConfirmation(awsUser.cpsForm.paymentConfirmation);
    }
  }, [awsUser]);

  const [paymentConfirmation, setPaymentConfirmation] = useState('');

  const { register, formState } = useFormContext();

  return (
    <div className='bg-white p-6 flex justify-center items-center mt-6'>
      <div className='mx-auto w-full'>
        <div className='mx-auto max-w-4xl rounded-3xl ring-1 ring-slate-200 lg:mx-0 lg:flex lg:max-w-none'>
          <div className='-mt-2 p-2 lg:mt-0 lg:w-full  lg:flex-shrink-0'>
            <div className='rounded-2xl bg-slate-50 py-10 text-center ring-1 ring-inset ring-slate-900/5 lg:flex lg:flex-col lg:justify-center lg:py-12'>
              <div className='mx-auto max-w-xl px-4'>
                <p className='text-base font-bold text-slate-600 font-greycliff'>
                  Cost to submit application
                </p>
                <p className='mt-6 flex items-baseline justify-center gap-x-2 mb-6'>
                  <span className='text-5xl font-bold tracking-tight text-slate-900'>
                    {free ? 'WAIVED' : '$25'}
                  </span>
                  {!free && (
                    <span className='text-sm font-semibold leading-6 tracking-wide text-slate-600'>
                      USD
                    </span>
                  )}
                </p>
                {!free ? (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      setConfirmation={(val) =>
                        setPaymentConfirmation(val && val)
                      }
                      type={'CPS'}
                      email={email}
                    />
                  </Elements>
                ) : (
                  () => setPaymentConfirmation('WAIVED')
                )}
                <div>
                  <input
                    type='hidden'
                    value={free ? 'WAIVED' : paymentConfirmation}
                    name='paymentConfirmation'
                    {...register('paymentConfirmation', {
                      required: true,
                    })}
                  />
                  {formState.errors.hasOwnProperty('paymentConfirmation') && (
                    <div className='text-sm text-red-600 mt-3 mb-2'>
                      Please fill out field and hit &quot;Pay Application&quot;
                      to proceed.
                    </div>
                  )}
                </div>
                <div className='text-xs md:text-sm text-slate-500 mt-6'>
                  Applications require a $25.00 processing fee. Upon acceptance
                  a student agreement form will be issued with details on the
                  course and billing options for the full CPS tuition of $3,999.
                  Completion of this application is not an obligation to enroll
                  in the CPS program.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPSPricing;
