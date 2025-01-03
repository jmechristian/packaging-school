import {
  LifebuoyIcon,
  NewspaperIcon,
  PhoneIcon,
  ArrowLongRightIcon,
  ArchiveBoxIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  SwatchIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import Image from "next/legacy/image";
import CourseCardVideoHeader from '../components/shared/CourseCardVideoHeader';
import Head from 'next/head';

const supportLinks = [
  {
    name: 'Packaging Bootcamp 101',
    href: '#',
    description:
      'This Boot Camp will serve as an introduction to the packaging industry and provide the fundamental knowledge necessary to get you up to speed.',
    icon: ArchiveBoxIcon,
    background: 'bg-base-dark',
    video: 'https://www.youtube.com/watch?v=L4Q6sZlXoe4',
  },
  {
    name: 'Corrugated Containers',
    href: '#',
    description:
      'An informative course with easy to digest information that will teach you the art and science of corrugated containers.',
    icon: ArchiveBoxIcon,
    background: 'bg-base-dark',
    video: 'https://www.youtube.com/watch?v=ABLmndzcET4',
  },
  {
    name: 'Packaging Design Workflow',
    href: '#',
    description:
      'A course that provides the complete pathway of the design process from concept to manufacturing.',
    icon: BriefcaseIcon,
    background: 'bg-green-600',
    video: 'https://www.youtube.com/watch?v=-5ubOGuqaGo',
  },
  {
    name: 'Sales Operations for Printing and Packaging Professionals',
    href: '#',
    description:
      'Are you ready to have your front line sales people be your most powerful source of sustainably sourced revenue?',
    icon: BriefcaseIcon,
    background: 'bg-green-600',
    light: false,
    video:
      'https://player.vimeo.com/video/648732063?h=0bbaabf710&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
  },
  {
    name: 'Packaging Foundations',
    href: '#',
    description:
      'An essential introduction to the art, science, and business of packaging.',
    icon: Cog6ToothIcon,
    background: 'bg-base-brand',
    video: 'https://www.youtube.com/watch?v=L4Q6sZlXoe4',
  },
  {
    name: 'Introduction to Corrugated Design',
    href: '#',
    description:
      'Learn the fundamentals of corrugated, how to identify corrugated board, and how to use it.',
    icon: SwatchIcon,
    background: 'bg-clemson',
    light: false,
    video: 'https://vimeo.com/556386520/0c6c7f3c26',
  },
  {
    name: 'Packaging Printing',
    href: '#',
    description:
      'This course provides an overview of different printing methods and ties in the graphic development workflow.',
    icon: SwatchIcon,
    background: 'bg-clemson',
    video: 'https://www.youtube.com/watch?v=2UZ5hWzYZ9A',
  },
  {
    name: 'Sustainable Packaging',
    href: 'https://learn.packagingschool.com/enroll/36829',
    description:
      'Have you ever wondered how grocery store produce ships from the farm to the grocery store?',
    icon: ArchiveBoxIcon,
    background: 'bg-base-dark',
    video: 'https://www.youtube.com/watch?v=ynDhF_jYZn8',
  },
  {
    name: 'Paperboard Cartons',
    href: '#',
    description:
      'Explore the capabilities of paperboard cartons in this course, and comprehend why it’s widely used across the packaging industry.',
    icon: ArchiveBoxIcon,
    background: 'bg-base-dark',
    video: 'https://www.youtube.com/watch?v=YZ5tmiPh1Tw',
  },
  {
    name: 'Flexographic Print Fundamentals',
    href: 'https://learn.packagingschool.com/enroll/210496',
    description:
      'Master how to produce and troubleshoot flexographic printing to produce high quality work.',
    icon: SwatchIcon,
    background: 'bg-clemson',
    video: 'https://youtu.be/nfznWqSAH4w',
  },
  {
    name: 'Packaging Machinery',
    href: 'https://learn.packagingschool.com/enroll/36823',
    description:
      'An online course that provides a thorough look at the machinery used to produce high volumes of quality packages.',
    icon: Cog6ToothIcon,
    background: 'bg-base-brand',
    video: 'https://www.youtube.com/watch?v=uvbv2gkIcZc',
  },
  {
    name: 'Packaging Laws and Regulations',
    href: 'https://learn.packagingschool.com/enroll/36828',
    description:
      'In this course, we map out the major regulatory agencies such as FDA, EPA, USDA, CFR, ASTM, and ISO. ',
    icon: TruckIcon,
    background: 'bg-clemson-dark',
    video: 'https://www.youtube.com/watch?v=t5onp2Ey8Gg',
  },
  {
    name: 'Pack Design Workshop',
    href: 'https://learn.packagingschool.com/enroll/2330944',
    description:
      'Students completing the workshop will design and improve a paperboard carton or corrugated container and learn how to price and order production samples of their packaging. ',
    icon: SwatchIcon,
    background: 'bg-clemson',
    video: '',
  },
  {
    name: 'Packaging Distribution',
    href: 'https://learn.packagingschool.com/enroll/36827',
    description:
      'An essential course that provides a thorough teaching of the distribution process and how to ensure packages remain intact through the duration of each stage. ',
    icon: TruckIcon,
    background: 'bg-clemson-dark',
    video: 'https://www.youtube.com/watch?v=VS-pa7eRowg',
  },
  {
    name: 'IADD Diecutting Academy: Diecutting 101',
    href: 'https://learn.packagingschool.com/enroll/761677',
    description:
      'Diecutting 101 covers the fundamentals of diecutting; starting with an overview of the practice of this fabrication process. ',
    icon: TruckIcon,
    light: false,
    background: 'bg-clemson-dark',
    video: 'https://player.vimeo.com/video/332036673',
  },
];

export default function Page() {
  return (
    <>
      <Head>
        <title>Packaging School | Your-Company</title>
        <meta name='robots' content='noindex,nofollow' />
      </Head>
      <div className='bg-white'>
        {/* Header */}
        <div className='relative bg-white pb-40 overflow-hidden'>
          <div
            className='hidden lg:absolute lg:inset-0 lg:block'
            aria-hidden='true'
          >
            <svg
              className='absolute left-1/2 top-0 -translate-y-8 translate-x-64 transform'
              width={640}
              height={784}
              fill='none'
              viewBox='0 0 640 784'
            >
              <defs>
                <pattern
                  id='9ebea6f4-a1f5-4d96-8c4e-4c2abf658047'
                  x={118}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className='text-neutral-300'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect
                y={72}
                width={640}
                height={640}
                className='text-neutral-50'
                fill='currentColor'
              />
              <rect
                x={118}
                width={404}
                height={784}
                fill='url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)'
              />
            </svg>
          </div>
          <div className='absolute inset-0'>
            {/* <img
            className='h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100'
            alt=''
          /> */}
            <div
              className='absolute inset-0 bg-neutral-600 mix-blend-multiply'
              aria-hidden='true'
            />
          </div>
          <div className='relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8'>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <div className='w-60'>
                  <Image
                    src={
                      'https://packschool.s3.amazonaws.com/dummy_logo_white.png'
                    }
                    alt='dummy logo'
                    width={747}
                    height={400}
                  />
                </div>
                <p className='mt-6 max-w-xl text-xl text-gray-300'>
                  Find your library of courses below. If you have any questions,
                  please reach out to{' '}
                  <span className='text-indigo-400 underline'>
                    email@yourcompany.com
                  </span>
                </p>
              </div>
              <div className='bg-neutral-100 transition duration-150 ease-out hover:ease-in  hover:scale-105 cursor-pointer text-neutral-700 font-bold flex items-center gap-2 py-3 px-6 rounded-xl shadow-lg text-lg'>
                <div>Your Learning Dashboard</div>
                <div>
                  <ArrowLongRightIcon className='w-8 h-8' />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping cards */}
        <section
          className='relative z-10 mx-auto -mt-32 max-w-7xl px-6 pb-32 lg:px-8'
          aria-labelledby='contact-heading'
        >
          <h2 className='sr-only' id='contact-heading'>
            Contact us
          </h2>
          <div className='grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20'>
            {supportLinks.map((link) => (
              <div key={link.name}>
                <CourseCardVideoHeader link={link} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
