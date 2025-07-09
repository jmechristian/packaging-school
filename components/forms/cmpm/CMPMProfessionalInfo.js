import React from 'react';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

const CMPMProfessionalInfo = () => {
  return (
    <div className='flex flex-col gap-6 lg:gap-9'>
      <div className='grid grid-col-1 gap-6 md:grid-cols-2 md:gap-12'>
        <TextInput
          name={'companyName'}
          placeholder={'Enter Company Name'}
          label={'Company Name'}
          required
        />
        <TextInput
          name={'companyTitle'}
          placeholder={'Enter Company Title'}
          label={'Company Title'}
          required
        />
      </div>
      <TextInput
        name={'linkedin'}
        placeholder={'https://'}
        label={'LinkedIn Profile'}
      />
      <TextArea name={'background'} label={'Your Background'} required />
      <TextArea
        name={'whyPackaging'}
        label={'Why did you get into packaging?'}
        required
      />
      <TextArea
        name={'areaOfInterest'}
        label={'What is your main area of interest?'}
        required
      />
    </div>
  );
};

export default CMPMProfessionalInfo;
