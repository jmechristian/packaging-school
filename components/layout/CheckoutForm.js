import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useFormContext } from 'react-hook-form';
import { MdInfo } from 'react-icons/md';

export default function CheckoutForm({
  setConfirmation,
  email,
  type,
  onSubmit,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const {
    setValue,
    formState: { isValid, errors },
  } = useFormContext();

  useEffect(() => {
    console.log('Stripe initialized:', !!stripe);
    console.log('Form validation state:', { isValid });
    if (Object.keys(errors).length > 0) {
      console.log('Validation errors:', JSON.stringify(errors, null, 2));
    }
  }, [stripe, isValid, errors]);

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isApproved, setApproved] = useState(false);
  const [buttonText, setButtonText] = useState('Pay Application Fee & Submit');

  const handleSubmitFromCheckout = () => {
    setButtonText('Submitting...');
    if (typeof onSubmit === 'function') {
      setTimeout(() => {
        onSubmit();
      }, 2000);
    }
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements || isApproved) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);
    setButtonText('Loading...');
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
      }),
    });
    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      setMessage(result.error.message);
      setLoading(false);
      setApproved(false);
      setButtonText('Pay Application Fee');
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        setLoading(false);
        setApproved(true);
        setValue('paymentConfirmation', result.paymentIntent.id);
        setConfirmation(result.paymentIntent.id);
        setButtonText('Payment Approved!');
        handleSubmitFromCheckout();
      }
    }
  };

  return (
    <div className='flex flex-col gap-2 w-full max-w-2xl mx-auto'>
      <div onClick={handleSubmit} className='flex flex-col gap-6'>
        <CardElement className='border border-slate-300 py-2 px-3' />
        <div className='flex flex-col gap-3'>
          <div className='w-full flex-end'>
            <button
              disabled={!stripe || !isValid}
              className={`text-white font-greycliff rounded-lg font-semibold px-6 py-4
              5 shadow text-lg ${
                isValid ? 'bg-clemson' : 'bg-slate-500'
              }  border-black border-2`}
            >
              {isValid ? buttonText : 'Please fill out all form fields'}
            </button>
          </div>
        </div>
      </div>
      <div className='text-red-600 w-full text-center'>{message}</div>
      {/* <div className='w-full mt-3 max-w-xl mx-auto bg-base-brand/70 rounded-lg px-6 py-2 flex items-center gap-2  text-white font-semibold'>
        <div>
          <MdInfo color='white' size={'40'} />
        </div>
        <div className='text-left leading-snug'>
          Please remain on this page upon payment approval or ensure you hit
          SAVE or SUBMIT below
        </div>
      </div> */}
    </div>
  );
}
