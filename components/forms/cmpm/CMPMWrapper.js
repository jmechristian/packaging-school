import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Cookies from 'js-cookie';

import CMPMForm from './CMPMForm';
import CMPMNav from './CMPMNav';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CMPMWrapper = ({ params, free }) => {
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
    if (Cookies.get('cmpmFormSave')) {
      const savedForm = Cookies.get('cmpmFormSave');
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

    return () => Cookies.remove('cmpmFormSave');
  }, [methods, free]);

  return (
    <div className='w-full max-w-4xl mx-auto sm:px-0 pb-24'>
      <FormProvider {...methods}>
        <CMPMNav />
        <CMPMForm methods={methods} email={paramsEmail} id={params.id} />
      </FormProvider>
    </div>
  );
};

export default CMPMWrapper;
