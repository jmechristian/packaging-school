import {
  ArrowPathIcon,
  BeakerIcon,
  AcademicCapIcon,
  CubeTransparentIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { MdArrowRight } from 'react-icons/md';

const features = [
  {
    name: 'Research',
    description:
      'Research programs helping brands develop attention-grabbing packaging and lift sales on the shelf.',
    href: '#',
    icon: BeakerIcon,
    image: 'https://packschool.s3.us-east-1.amazonaws.com/hurley-research.png',
  },
  {
    name: 'Design',
    description:
      'Laboratories that enable you to prototype your CPG vision through prototyping.',
    href: '#',
    icon: CubeTransparentIcon,
    image: 'https://packschool.s3.us-east-1.amazonaws.com/hurley-design.png',
  },
  {
    name: 'Education',
    description:
      'Students work on real-life projects that align with business, resume, and/or portfolio goals.',
    href: '#',
    image: 'https://packschool.s3.us-east-1.amazonaws.com/hurley-education.png',
    icon: AcademicCapIcon,
  },
];

export default function AndrewAbout() {
  const router = useRouter();
  return (
    <div className='bg-white py-16'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-20'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-16'>
          <div className='col-span-2'>
            <div
              className='aspect-[4/4.5] bg-black w-full h-full rounded-lg bg-cover bg-bottom'
              style={{
                backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/meet-hurley.png')`,
              }}
            ></div>
          </div>
          <div className='col-span-3'>
            <div className='mt-2 text-gray-900 h2-base'>
              What’s Dr. Hurley Up To?
            </div>
            <div className='mt-6 text-lg text-gray-600'>
              Dr. Hurley’s research lab answers complex questions on product
              marketing and packaging. His experienced group has tested
              thousands of packages for hundreds of brands. And his efforts have
              resulted in multiple awards, patents, and increased sales by 40%
              for small and large businesses.
            </div>
            <div className='mt-6 text-lg text-gray-600'>
              Dr. Hurley is also the lead instructor for the Certificate of
              Mastery in Packaging Management run through Clemson University’s
              Center for Corporate Learning. This program is a state-of-the-art,
              online curriculum teaching the business acumen and professional
              vocabulary necessary to succeed within the packaging industry.
            </div>
            <div
              className='mt-6 flex items-center justify-center w-full bg-base-brand/20 hover:bg-base-brand/30 cursor-pointer rounded-lg p-4'
              onClick={() => {
                router.push('/certifications/get-to-know-cmpm');
              }}
            >
              <div className='text-base-dark font-semibold text-lg'>
                Learn More about the Certificate of Mastery of Packaging
                Management
              </div>
              <div>
                <MdArrowRight className='w-8 h-8 text-base-dark' />
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-16'>
          {features.map((feature) => (
            <div key={feature.name} className='flex flex-col'>
              <div
                className='w-full h-64 rounded-lg relative overflow-hidden'
                style={{
                  backgroundImage: `url(${feature.image})`,
                  backgroundSize: 'cover',
                }}
              >
                <div className='absolute top-0 left-0 w-full h-full rounded-lg z-5'></div>
                <div className='absolute inset-0 flex items-end pb-4 px-4 z-10 bg-gradient-to-t from-base-brand/90 to-base-brand/50'>
                  <div className='text-white text-2xl font-bold'>
                    {feature.name}
                    <div className='text-base font-medium leading-tight'>
                      {feature.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            {features.map((feature) => (
              <div key={feature.name} className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base xl:text-lg font-bold leading-7 text-gray-900 font-greycliff'>
                  <feature.icon
                    className='h-6 w-6 flex-none text-clemson'
                    aria-hidden='true'
                  />
                  {feature.name}
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div> */}
      </div>
    </div>
  );
}
