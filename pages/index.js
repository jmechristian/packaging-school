import HomeCerts from '../components/home/HomeCerts';
import HomeHero from '../components/home/HomeHero';
import HomeLogos from '../components/home/HomeLogos';
import HomeFree from '../components/home/HomeFree';
import HomeFeatures from '../components/home/HomeFeatures';
import HomeTestimonials from '../components/home/HomeTestimonials';
import GradientCTA from '../components/GradientCTA';
import HomeCTA from '../components/home/HomeCTA';
import FadeIn from '../helpers/FadeIn';
import Head from 'next/head';
import Meta from '../components/shared/Meta';
import { MdArrowForward, MdPlayArrow } from 'react-icons/md';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Meta
        title={'Packaging School'}
        description={
          'The Packaging School brings together the business, art, and science of packaging so you can lead projects, optimize supply chains, increase margins, and develop sustainable solutions.'
        }
        image={'https://packschool.s3.amazonaws.com/firework-box-3.webp'}
      />

      <div className='relative w-full h-full '>
        <div className='flex flex-col gap-24 md:gap-32'>
          <FadeIn>
            <HomeHero />
          </FadeIn>
          <FadeIn>
            <div
              className='w-full px-10 py-10 md:py-6 bg-dark max-w-7xl mx-auto md:rounded-lg relative overflow-hidden cursor-pointer select-none'
              onClick={() => router.push('/all-access-update')}
            >
              <div className='absolute inset-0 pointer-events-none opacity-[0.03]'>
                <div
                  className='absolute inset-0'
                  style={{
                    backgroundImage: `
              radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px),
              radial-gradient(circle at 80% 70%, #fff 1px, transparent 1px),
              radial-gradient(circle at 40% 80%, #fff 1px, transparent 1px),
              radial-gradient(circle at 90% 20%, #fff 1px, transparent 1px),
              linear-gradient(45deg, transparent 48%, #fff 49%, #fff 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, #fff 49%, #fff 51%, transparent 52%)
            `,
                    backgroundSize:
                      '200px 200px, 300px 300px, 250px 250px, 350px 350px, 100px 100px, 100px 100px',
                    backgroundPosition:
                      '0 0, 50px 50px, 100px 100px, 150px 150px, 0 0, 0 0',
                  }}
                ></div>
              </div>
              <div className='flex flex-col items-center md:flex-row gap-10 w-full'>
                <div>
                  <div className='w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center relative'>
                    <svg
                      className='absolute inset-0 w-full h-full animate-spin'
                      style={{ animationDuration: '12s' }}
                    >
                      <defs>
                        <path
                          id='circlePath'
                          d='M 60,60 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0'
                        />
                      </defs>
                      <text className='text-dark font-bold text-xs'>
                        <textPath href='#circlePath' startOffset='0%'>
                          COMING SOON • COMING SOON • COMING SOON • COMING SOON
                        </textPath>
                      </text>
                    </svg>
                    <div className='text-clemson font-bold text-lg z-10'>
                      <MdPlayArrow size={60} />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-2.5 justify-center'>
                  <div className='h3-base text-clemson text-center md:text-left'>
                    A New Website Experience Is Coming
                  </div>
                  <div className='text-xl text-white font-medium text-center md:text-left'>
                    Smarter dashboard. Guided learning paths. Full course
                    access—all coming soon in a completely redesigned website
                    experience.
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <div className='rounded-lg bg-base-mid hover:bg-base-light transition-all duration-300 flex items-center justify-center gap-1.5 px-5 py-2.5 w-fit'>
                    <div className='font-bold text-white whitespace-nowrap'>
                      Learn More
                    </div>
                    <div>
                      <MdArrowForward size={20} className='text-white' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <HomeCerts />
          </FadeIn>
          <FadeIn>
            <HomeLogos />
          </FadeIn>
          <FadeIn>
            <HomeFree />
          </FadeIn>
          <FadeIn>
            <HomeFeatures />
          </FadeIn>
          <FadeIn>
            <HomeTestimonials />
          </FadeIn>
          <FadeIn>
            <HomeCTA />
          </FadeIn>
        </div>
        <GradientCTA
          headline='Ready to Elevate Your Career?'
          subheadline='Try a demo, risk-free.'
          buttonText='Get Started For Free'
          secondaryButtonText='Need More Info?'
          buttonLink={'/all_courses'}
        />
      </div>
    </>
  );
}
