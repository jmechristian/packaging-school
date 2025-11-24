import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Cookies from 'js-cookie';

import PGSFForm from './PGSFForm';
import PGSFNav from './PGSFNav';

const PGSFWrapper = ({ params, free }) => {
  const methods = useForm();
  const [paramsEmail, setIsParamsEmail] = useState(undefined);

  useEffect(() => {
    if (params) {
      for (const property in params) {
        methods.setValue(`${property}`, `${params[property]}`);
      }
    }

    if (params && params.email) {
      setIsParamsEmail(params.email);
    }
  }, [params, methods]);

  useEffect(() => {
    if (Cookies.get('pgsfFormSave')) {
      const savedForm = Cookies.get('pgsfFormSave');
      const newForm = JSON.parse(savedForm);
      Object.entries(newForm).forEach(([key, value]) => {
        console.log(key, value);
        methods.setValue(key, value);
      });
      console.log(newForm);

      if (free) {
        methods.setValue('paymentConfirmation', 'WAIVED');
      }
    }

    return () => Cookies.remove('pgsfFormSave');
  }, [methods, free]);

  return (
    <div className='w-full max-w-4xl mx-auto sm:px-0 pb-24'>
      <FormProvider {...methods}>
        <PGSFNav />
        <PGSFForm
          methods={methods}
          email={paramsEmail}
          id={params?.id}
          free={true}
        />
      </FormProvider>
    </div>
  );
};

export default PGSFWrapper;
