import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import BrutalTag from '../../components/shared/BrutalTag';
import BrutalButton from '../../components/shared/BrutalButton';
import CPSCard from '../../components/rive/CPSCard';
import CMPMCard from '../../components/rive/CMPMCard';
import APCCard from '../../components/rive/APCCard';
import CSPCard from '../../components/rive/CSPCard';
import FPCCard from '../../components/rive/FPCCard';
import CmpmCpsCompare from '../../components/shared/CmpmCpsCompare';
import ScrollingTestimonials from '../../components/shared/ScrollingTestimonials';
import Meta from '../../components/shared/Meta';

export const RiveDemo = () => {
  const { RiveComponent } = useRive({
    // Load a local riv `clean_the_car.riv` or upload your own!
    src: 'https://packschool.s3.amazonaws.com/cert_rocket.riv',
    stateMachines: 'mainMachine',
    // Be sure to specify the correct state machine (or animation) name
    onLoadError: (err) => console.log(err),
    // This is optional.Provides additional layout control.
    autoplay: true,
  });

  return <RiveComponent />;
};

const Index = () => {
  const [isIndex, setIsIndex] = useState(0);
  const [isTestimonials, setIsTestimonials] = useState([]);

  const router = useRouter();

  return (
    <>
      <Meta
        title={'Packaging School Certifications'}
        description={
          'Expert-led, comprehensive certificate programs designed to elevate your expertise in packaging management and packaging design, automotive packaging, and food packaging.'
        }
        image={
          'https://packschool.s3.amazonaws.com/certifications-seoImage.webp'
        }
      />
      <div className='w-full pb-40 md:pb-48 border-b-2 border-b-black pt-5 lg:pt-10'>
        <div className='flex flex-col gap-28 md:gap-48 lg:gap-32 '>
          {/* HERO */}
          <div className='w-full flex flex-col lg:flex-row lg:items-center gap-10 md:px-10 lg:px-0 max-w-7xl  mx-auto '>
            <div className='w-full max-w-[800px] aspect-[4/3]'>
              <RiveDemo />
            </div>
            <div className='flex flex-col gap-5 px-5 xl:px-0 '>
              <div className='w-full text-center h1-base'>
                Boost Your Packaging Career with Our Exclusive Certificates
              </div>
              <div className='w-full text-center lg:text-left text-xl'>
                Expert-led curriculum designed to elevate your expertise in
                packaging management and design, automotive packaging, and food
                packaging.
              </div>
            </div>
          </div>

          {/* LOGOS */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full gap-10 lg:gap-16 px-6 xl:px-0 max-w-7xl mx-auto'>
            <div className='flex justify-center items-center hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
              <Link href={'#cmpm'} passHref shallow>
                <Image
                  src={'https://packschool.s3.amazonaws.com/cmpm-black.png'}
                  className='group-hover:invert'
                  width={370}
                  height={114}
                  alt='Certificate of Packaging Management Logo'
                />
              </Link>
            </div>
            <div className='flex justify-center items-center hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
              <Link href={'#cmpm'} passHref shallow>
                <Image
                  src={'https://packschool.s3.amazonaws.com/cps-black.png'}
                  width={430}
                  height={118}
                  alt='Certificate of Packaging Science Logo'
                  className='group-hover:invert'
                />
              </Link>
            </div>
            <div className='flex justify-center items-center hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
              <Link href={'#apc'} passHref shallow>
                <Image
                  src={'https://packschool.s3.amazonaws.com/aps-black.png'}
                  className='group-hover:invert'
                  width={403}
                  height={109}
                  alt='Automotive Packaging Certificate Logo'
                />
              </Link>
            </div>
            <div className='flex justify-center items-center hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
              <Link href={'#csp'} passHref shallow>
                <Image
                  src={'https://packschool.s3.amazonaws.com/csp-black.png'}
                  className='group-hover:invert'
                  width={310}
                  height={109}
                  alt='Certificate of Sustainable Packaging Logo'
                />
              </Link>
            </div>
            <div className='flex justify-center items-center col-span-2 md:col-span-1 hover:bg-black transition-all ease-in group cursor-pointer flex-1 p-3'>
              <div className='w-1/2 md:w-full mx-auto '>
                <Link href={'#fpc'} passHref shallow>
                  <Image
                    src={'https://packschool.s3.amazonaws.com/fpc-black.png'}
                    className='group-hover:invert'
                    width={429}
                    height={109}
                    alt='Food Packaging Certificate Logo'
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* CMPM/CPS */}
          <div
            className='flex flex-col gap-10 lg:gap-16 px-5 xl:px-0 lg:py-10 scroll-mt-6'
            id='cmpm'
          >
            <div className='flex flex-col gap-5 text-center justify-center max-w-xl mx-auto lg:max-w-4xl'>
              <div>
                <h2 className='h2-base'>
                  Comprehensive Packaging Certificate Programs Designed for
                  Those Who Want to Advance Their Careers.
                </h2>
              </div>
              <div className='text-lg'>
                Developed by the industry leaders in packaging education, these
                programs cover the core components of packaging materials and
                processes in the space of packaging development, material
                procurement, and organizational management.
              </div>
            </div>
            <div className='flex flex-col gap-5 w-full max-w-6xl mx-auto'>
              <div className='w-full grid md:grid-cols-12 md:h-[550px] mb-5'>
                <div className='hidden lg:col-span-2 lg:block'></div>
                <div
                  className='md:col-span-6 lg:col-span-5 cursor-pointer min-h-[550px]'
                  onClick={() =>
                    router.push('/certifications/get-to-know-cmpm')
                  }
                >
                  <CMPMCard />
                </div>
                <div
                  className='md:col-span-6 lg:col-span-5 cursor-pointer min-h-[550px]'
                  onClick={() => router.push('/certifications/get-to-know-cps')}
                >
                  <CPSCard />
                </div>
              </div>
              <CmpmCpsCompare />
            </div>
          </div>

          {/* APS/CSP */}
          <div
            className='flex flex-col lg:flex-row lg:items-center gap-28 justify-center lg:justify-start max-w-7xl mx-auto scroll-mt-6'
            id='apc'
          >
            <div className='flex flex-col gap-10 max-w-xl mx-auto'>
              <div className='flex flex-col gap-5 px-5 xl:px-0'>
                <BrutalTag
                  text={'Automotive'}
                  textColor={'text-white'}
                  backgroundColor={'bg-base-brand'}
                />
                <div>
                  <h2 className='h2-base'>
                    Revolutionize Your Career in Automotive Packaging with the
                    First 100% Online Academic Program Tailored for Industry
                    Professionals.
                  </h2>
                </div>
                <div>
                  Master the essential skills for success with our program,
                  designed for packaging and logistics professionals, engineers,
                  sales, and customer service teams in the automotive industry.
                </div>
                <Link passHref href={'/certifications/get-to-know-apc'}>
                  <div className='lg:hidden font-semibold text-brand-indigo'>
                    View Certificate
                  </div>
                </Link>
              </div>
              <div className='w-full flex justify-center lg:justify-start items-center'>
                <div
                  className='w-full max-w-[360px] md:max-w-[400px] h-[520px] cursor-pointer'
                  onClick={() => router.push('/certifications/get-to-know-apc')}
                >
                  <APCCard />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-10 max-w-xl mx-auto'>
              <div className='flex flex-col gap-4 px-5 xl:px-0'>
                <BrutalTag
                  text={'Sustainability'}
                  backgroundColor={'bg-brand-green'}
                  textColor={'text-black'}
                />
                <div>
                  <h2 className='h2-base' id='csp'>
                    Transform Your Packaging: Empower Your Team with Our
                    Revolutionary Sustainable Design Program.
                  </h2>
                </div>
                <div>
                  The Packaging School introduces a transformative program
                  designed to empower industry professionals to master the
                  complexities of sustainable design. This initiative prepares
                  companies with internal champions knowledgeable about the dos
                  and don&apos;ts of sustainable packaging, creating a positive
                  force for change within organizations.
                </div>
                <Link passHref href={'/certifications/get-to-know-csp'}>
                  <div className='lg:hidden font-semibold text-brand-indigo'>
                    View Certificate
                  </div>
                </Link>
              </div>
              <div className='w-full flex justify-center lg:justify-start items-center'>
                <div
                  className='w-full max-w-[360px] md:max-w-[400px] h-[520px] cursor-pointer'
                  onClick={() => router.push('/certifications/get-to-know-csp')}
                >
                  <CSPCard />
                </div>
              </div>
            </div>
          </div>

          {/* FPC */}
          <div
            className='w-full py-10 border-y-2 border-black lg:border-2 lg:rounded-2xl bg-base-brand/60 max-w-7xl  mx-auto'
            id='fpc'
          >
            <div className='flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-24 px-5 xl:px-0 max-w-xl lg:max-w-6xl mx-auto'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3'>
                  <BrutalTag
                    backgroundColor={'bg-white'}
                    text={'In Development!'}
                    textColor={'text-black'}
                  />
                  <BrutalTag
                    backgroundColor={'bg-brand-yellow'}
                    text={'Food and Bev'}
                    textColor={'text-black'}
                  />
                </div>
                <h2 className='h2-base'>
                  Lead the Way in Food Packaging Innovation: Sponsorship
                  Opportunities to Showcase Your Brand and Expertise.
                </h2>
                <div className='text-lg'>
                  Elevate Your Brand, Enlighten the Industry. By sponsoring, you
                  contribute to the education of hundreds of food packaging
                  professionals, enhancing their understanding of the industry
                  and the unique value your company offers. Position your
                  company at the forefront and showcase your leaders as the
                  go-to subject-matter experts.
                </div>
                <div className='w-fit'>
                  <BrutalButton
                    text={'Get Involved'}
                    background={'bg-white'}
                    textColor={'text-black'}
                    link={'/food-packaging'}
                  />
                </div>
              </div>
              <div className='w-full flex justify-center items-center'>
                <div
                  className='w-full max-w-[400px] h-[520px] cursor-pointer'
                  onClick={() => router.push('/food-packaging')}
                >
                  <FPCCard />
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <ScrollingTestimonials />

          {/* Final CTA */}
          <div className='flex flex-col gap-5 px-5 xl:px-0 max-w-xl lg:max-w-4xl mx-auto lg:pt-10'>
            <div className='w-full text-center h1-base'>
              Seeking Seamless Onboarding? Ensure a Smooth Start Here!
            </div>
            <div className='w-full text-center text-xl'>
              Schedule an appointment with one of our curriculum counselors. We
              can find the perfect library fit and transition plan to set and
              forget your onboarding education process for good.
            </div>
            <div className='w-fit mx-auto mt-3'>
              <BrutalButton
                link={'https://calendar.app.google/qUZMKuFbF7NhpxgL8'}
                background={'bg-clemson'}
                text={'Introduce Yourself'}
                textColor={'text-black'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
