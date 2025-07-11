import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import CPSNav from './CPSNav';
import CPSForm from './CPSForm';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CPSWrapper = ({ params, free }) => {
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

  return (
    <div className='w-full max-w-4xl mx-auto sm:px-0 pb-24'>
      <FormProvider {...methods}>
        <CPSNav />
        <CPSForm
          methods={methods}
          email={paramsEmail}
          free={free}
          id={params.id}
        />
      </FormProvider>
    </div>
  );
};

export default CPSWrapper;
