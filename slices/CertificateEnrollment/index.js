import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import EnrollmentCalendar from './components/EnrollmentCalendar';

const CertificateEnrollment = ({ slice }) => (
  <section
    className='inner__section-margin container__inner scroll-mt-28 flex flex-col gap-12'
    id='enrollment'
  >
    <div className='flex flex-col gap-3'>
      <div className='subheadline'>
        {slice.primary.title ? (
          <PrismicRichText field={slice.primary.title} />
        ) : (
          <h2>Template slice, update me!</h2>
        )}
      </div>
      <div className='body__text'>
        {slice.primary.description ? (
          <PrismicRichText field={slice.primary.description} />
        ) : (
          <p>start by editing this slice from inside Slice Machine!</p>
        )}
      </div>
    </div>
    <div className='grid grid-col-1 lg:grid-cols-5'>
      <div className='col-span-3'>
        <EnrollmentCalendar />
      </div>
      <div>details</div>
    </div>
    <div className='bg-base-light'>sales bar</div>
  </section>
);

export default CertificateEnrollment;
