import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

const StepOne = () => {
  const { register } = useFormContext();
  return (
    <>
      <input {...register('firstName')} placeholder='First Name' />
      <input {...register('lastName')} placeholder='Last Name' />
    </>
  );
};

const StepTwo = () => {
  const { register } = useFormContext();
  return (
    <>
      <input {...register('email')} type='email' placeholder='Email' />
      <input {...register('phone')} placeholder='Phone Number' />
    </>
  );
};

const Page = () => {
  const methods = useForm();
  const [step, setStep] = React.useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step > 1 && (
          <button type='button' onClick={prevStep}>
            Back
          </button>
        )}
        {step < 2 ? (
          <button type='button' onClick={nextStep}>
            Next
          </button>
        ) : (
          <button type='submit'>Submit</button>
        )}
      </form>
    </FormProvider>
  );
};

export default Page;
