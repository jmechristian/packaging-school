import React from 'react';
import { API } from 'aws-amplify';
import { listTestimonials } from '../../src/graphql/queries';
import CMPMReviews from '../../components/certifications/cmpm/CMPMReviews';
import Testimonial from '../../components/shared/Testimonial';
import GradientCTA from '../../components/GradientCTA';
import APCHero from '../../components/certifications/aps/APCHero';
import APCNavigation from '../../components/certifications/aps/APCNav';
import APCAbout from '../../components/certifications/aps/APCAbout';
import APCVideo from '../../components/certifications/aps/APCVideo';
import APCHow from '../../components/certifications/aps/APCHow';
import APSExperts from '../../components/certifications/APSExperts';
import APCStart from '../../components/certifications/aps/APCStart';
import APCAPS from '../../components/certifications/aps/APCAPS';
import Head from 'next/head';
import TestimonialSlider from '../../components/shared/TestimonialSlider';
import Meta from '../../components/shared/Meta';

const Page = ({ testimonials }) => {
  return (
    <>
      <Meta
        title={'Automotive Packaging Certificate (APC)'}
        description={
          'Elevate your career with our unique online program tailored for automotive packaging pros. Ideal for suppliers, OEMs, engineers, and sales teams.'
        }
        image={'https://packschool.s3.amazonaws.com/aps-seoImage-sm.webp'}
        keywords={
          'Automotive Packaging, Returnable Packaging Systems, Expendable Case Studies, Applications, Supplier Databases, Transportation, SME Feedback, certification'
        }
      />
      <div className='flex flex-col dark:bg-dark-dark gap-12'>
        <APCHero />
        <APCNavigation />
        <div className='flex flex-col gap-28 lg:!gap-48'>
          <APCAbout />
          {/* <Testimonial
          id='tommy-stroman'
          author={{
            name: 'Lauren McDonald',
            role: 'Packaging Specialist / Volkswagen Group of America, Inc.',
          }}
        >
          <p>
            “I was interested to see what this program had to offer versus my
            knowledge and experience working as a packaging engineer at an OEM.
            This course offered much more than I expected and I would highly
            recommend this certificate course for those interested in pursuing
            an automotive packaging career!”
          </p>
        </Testimonial> */}

          <APCVideo />
          <APCHow />
          <APSExperts />
          <APCStart />
          <div id='reviews' className='scroll-mt-24'>
            <TestimonialSlider
              testimonials={testimonials && testimonials.listTestimonials.items}
            />
          </div>
          {/* <CMPMReviews /> */}
          <APCAPS />
          <GradientCTA
            headline={'Not sure if this is for you or your team?'}
            subheadline={'There is no cost to begin.  Try a free demo today.'}
            buttonLink={
              'https://learn.packagingschool.com/enroll/38965?et=free'
            }
            buttonText={'Take me to my demo.'}
          />
        </div>
      </div>
    </>
  );
};

export default Page;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await API.graphql({
    query: listTestimonials,
    variables: { filter: { tags: { contains: 'APC' } } },
  });
  const testimonials = await res.data;
  // Pass data to the page via props
  return { props: { testimonials } };
}
