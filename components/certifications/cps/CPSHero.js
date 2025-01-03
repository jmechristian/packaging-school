import React from 'react';
import FadeIn from '../../../helpers/FadeIn';
import CertHeroImage from '../../../slices/CertificateHero/components/CertHeroImage';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';

const CPSHero = () => {
  const router = useRouter();
  return (
    <div className='grid lg:grid-cols-2 items-center gap-6 overflow-hidden py-12 md:py-24 container-7xl'>
      <div>
        <Image
          src={'https://packschool.s3.amazonaws.com/cps_hero.png'}
          width={600}
          height={600}
          alt='Certificate of Packaging Science'
        />
      </div>
      <div className='flex flex-col gap-9'>
        <div>
          <FadeIn>
            <h1 className='text-4xl xl:text-5xl leading-tight dark:text-white'>
              Certificate of Packaging Science (CPS)
            </h1>
          </FadeIn>
        </div>
        <div>
          <FadeIn>
            <p className='text-xl lg:text-2xl font-greycliff text-slate-700 dark:text-gray-500 tracking-wide'>
              Ideal for professionals in the packaging or related industries
              seeking a comprehensive understanding of the packaging industry.
              With the flexibility of one-year access, this is an excellent
              choice for salespeople, packaging engineers, marketing leads,
              operations personnel, and procurement professionals looking to
              gain valuable insights.
            </p>
          </FadeIn>
        </div>
        <div>
          <FadeIn>
            <div className='flex flex-col md:flex-row items-center gap-6 mt-4'>
              <button
                className='w-full md:w-fit px-9 bg-clemson rounded-lg py-4 text-white font-semibold font-greycliff text-xl'
                onClick={() =>
                  router.push('/certificate-of-packaging-science-application')
                }
              >
                Apply Now
              </button>
              <div
                className='flex gap-1.5 items-center cursor-pointer'
                onClick={() =>
                  window.open(
                    'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
                    '_blank'
                  )
                }
              >
                <div className='font-semibold text-xl font-greycliff dark:text-base-brand'>
                  Schedule a FREE Live Demo
                </div>
                <div>
                  <ArrowLongRightIcon className='w-6 h-6 stroke-slate-900 dark:stroke-base-brand' />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default CPSHero;
