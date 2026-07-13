import React from 'react';
import Link from 'next/link';
import CenteredTextHeader from '../components/layout/CenteredTextHeader';
import GradientCTA from '../components/GradientCTA';
import Meta from '../components/shared/Meta';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
} from '../libs/seo/organizationJsonLd';

const people = [
  {
    name: 'DR. ANDREW HURLEY',
    role: 'Chief Learning Officer & Founder The Packaging School',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APS-PS-Automotive-Speakers-Andrew.png',
  },
  {
    name: 'JOSH GALVARINO',
    role: 'Mercedes-Benz U.S.',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APS-PS-Automotive-Speakers-Josh.png',
  },
  {
    name: 'DREW COCKMAN',
    role: 'BMW MC.',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APS-PS-Automotive-Speakers-Drew.png',
  },
  {
    name: 'CHRIS HELMS',
    role: 'Tree Brand Packaging',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APS-PS-Automotive-Speakers-CHRIS.png',
  },
  {
    name: 'DR. KEVIN LANDMARK',
    role: 'Northern Technologies International Corporation',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APS-PS-Automotive-Speakers-Kevin.png',
  },
  {
    name: 'DAVID LESTER',
    role: 'Magna Decostar',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APS-PS-Automotive-Speakers-Dave.png',
  },
  {
    name: 'MIKE COSTELLO',
    role: 'PakFab Engineered Solutions',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APS-PS-Automotive-Speakers-Mike.png',
  },
  {
    name: 'BIANCA HURLEY',
    role: 'The Packaging School',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APS-PS-Automotive-Speakers-Bianca.png',
  },
  {
    name: 'CAMILLE CHISM, CPPL',
    role: 'Indigo Packaging and Consulting',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APS-PS-Automotive-Speakers-Camille.png',
  },
];

const people2 = [
  {
    name: 'JJ WEBB',
    role: 'Cummins Inc.',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020JJ.jpeg',
  },
  {
    name: 'WILLIAM MURRAY',
    role: 'Cummins Inc.',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/image-asset.jpeg',
  },
  {
    name: 'NATE FRANCK',
    role: 'TriEnda',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020Nate.jpeg',
  },
  {
    name: 'DOMINIC DIPILATO',
    role: 'TriEnda',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020Domenic.jpeg',
  },
  {
    name: 'SCOTT GROOMS',
    role: 'BWM',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020SCOTTGROOMS.jpeg',
  },
  {
    name: 'PARAS GUDKA',
    role: 'BMW',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2019Paras.jpeg',
  },
  {
    name: 'AMY-CATHERINE WHITE',
    role: 'BMW',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020AMY-CATHERINE.jpeg',
  },
  {
    name: 'ROB SCHAFTENAAR',
    role: 'Diverse Global',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2019ROB.jpeg',
  },
  {
    name: 'EVA WELSH',
    role: 'Freudenberg Performance Materials',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2019EVA.jpeg',
  },
  {
    name: 'JOSEPH NOVAK',
    role: 'IPS Packaging and Automation',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2019JOSEPHN.jpeg',
  },
  {
    name: 'TRAVIS EVANS',
    role: 'IPS Packaging and Automation',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020TRAVISE.jpeg',
  },
  {
    name: 'JOHN LASITTER',
    role: 'IPS Packaging and Automation',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020JOHNL.jpeg',
  },
  {
    name: 'TODD MEADOWS',
    role: 'IPS Packaging and Automation',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020TODDM.jpeg',
  },
  {
    name: 'LARRY WHITE',
    role: 'IPS Packaging and Automation',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020IPSGUY.jpeg',
  },
  {
    name: 'BRENDA COX-SINCLAIR',
    role: 'BMW',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020BRENDA.jpeg',
  },
  {
    name: 'YASH BHATIA',
    role: 'Datos Technologies',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020YASH.jpeg',
  },
  {
    name: 'JAMES STERNBERG',
    role: 'Clemson University - International Center for Automotive Research',
    imageUrl: 'https://packschool.s3.amazonaws.com/auto-faculty/JAMES.png',
  },
  {
    name: 'GREG BATT',
    role: 'Clemson University Packaging Science Department',
    imageUrl: 'https://packschool.s3.amazonaws.com/auto-faculty/GREG.png',
  },
  {
    name: 'JOSH GALVARINO',
    role: 'Mercedes-Benz U.S. International Inc.',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APS-PS-Automotive-Speakers-Josh.png',
  },
  {
    name: 'MICHEAL CERITANO',
    role: 'GSP North America',
    imageUrl: 'https://packschool.s3.amazonaws.com/auto-faculty/MICHEAL.png',
  },
  {
    name: 'ITHA VENTER',
    role: 'Abat',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020ISABELLA.jpeg',
  },
  {
    name: 'WERNER ELS',
    role: 'BMW',
    imageUrl:
      'https://packschool.s3.amazonaws.com/auto-faculty/APSSpeakerHeadshots2020Werner.jpeg',
  },
];

const Index = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'Automotive Faculty', path: '/automotive-faculty' }],
    siteUrl,
  );

  return (
    <>
      <Meta
        title={'Automotive Faculty'}
        url='/automotive-faculty'
        structuredData={[organization, website, breadcrumb]}
      />
      <div className='w-full flex justify-center items-center bg-base-mid'>
        <div className='flex gap-12 max-w-7xl mx-auto py-4'>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='/automotive-resources'>Free Resources</Link>
          </div>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='https://autopacksummit.com'>AutoPack Summit</Link>
          </div>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='/certificates'>Certificates</Link>
          </div>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='/courses/hazmat-packaging'>Hazmat</Link>
          </div>
        </div>
      </div>
      <CenteredTextHeader
        headline='Meet our Automotive Packaging Faculty.'
        subhead='Subject-matter experts from a dynamic cross-section of the automotive packaging industry.'
      />
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto grid max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-3'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Automotive Packaging Certificate
            </h2>
          </div>
          <ul
            role='list'
            className='grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2'
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className='flex items-center gap-x-6'>
                  <img
                    className='h-16 w-16 rounded-full'
                    src={person.imageUrl}
                    alt=''
                  />
                  <div>
                    <h3 className='text-base font-semibold leading-7 tracking-tight text-gray-900'>
                      {person.name}
                    </h3>
                    <p className='text-sm font-semibold leading-5 text-base-mid'>
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto grid max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-3'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Automotive Packaging Summit
            </h2>
          </div>
          <ul
            role='list'
            className='grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2'
          >
            {people2.map((person) => (
              <li key={person.name}>
                <div className='flex items-center gap-x-6'>
                  <img
                    className='h-16 w-16 rounded-full'
                    src={person.imageUrl}
                    alt=''
                  />
                  <div>
                    <h3 className='text-base font-semibold leading-7 tracking-tight text-gray-900'>
                      {person.name}
                    </h3>
                    <p className='text-sm font-semibold leading-5 text-base-mid'>
                      {person.role}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <GradientCTA
        headline='Ready to Elevate Your Career?'
        subheadline='Try a demo, risk-free.'
        buttonText='Get Started For Free'
        secondaryButtonText='Need More Info?'
        buttonLink={'/certifications/get-to-know-apc'}
      />
    </>
  );
};

export default Index;
