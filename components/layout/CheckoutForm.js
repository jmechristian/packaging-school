import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useFormContext } from 'react-hook-form';

export default function CheckoutForm({ setConfirmation }) {
  const stripe = useStripe();
  const elements = useElements();
  const { setValue } = useFormContext();

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isApproved, setApproved] = useState(false);
  const [buttonText, setButtonText] = useState('Pay Application Fee');

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
    const response = await fetch('/api/create-payment-intent');
    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    console.log(result);

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
        setButtonText('Approved!');
      }
    }
  };

  return (
    <div className='flex flex-col gap-2 w-full max-w-2xl mx-auto'>
      <div onClick={handleSubmit} className='flex flex-col gap-4'>
        <CardElement className='border border-slate-300 py-2 px-3' />
        <div className='w-full flex-end'>
          <button
            disabled={!stripe}
            className={`${
              isApproved ? 'text-green-600' : 'text-slate-700'
            } font-greycliff rounded-lg font-semibold`}
          >
            {buttonText}
          </button>
        </div>
      </div>
      <div className='text-red-600 w-full text-center'>{message}</div>
    </div>
  );
}