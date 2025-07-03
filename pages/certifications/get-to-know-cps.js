import {
  BoltIcon,
  CalendarDaysIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import CertificationsFeatureStats from '../../components/certifications/CertificationsFeatureStats';
import CertificationsHero from '../../components/certifications/CertificationsHero';
import CertificationsLogos from '../../components/certifications/CertificationsLogos';
import CertificationsPricing from '../../components/certifications/CertificationsPricing';
import CertificationsSecondFeature from '../../components/certifications/CertificationsSecondFeature';
import GradientCTA from '../../components/GradientCTA';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExports from '../../src/aws-exports';
import DoubleTestimonial from '../../components/DoubleTestimonial';
import CPSHero from '../../components/certifications/cps/CPSHero';
import CPSNav from '../../components/certifications/cps/CPSNav';
import CPSWhat from '../../components/certifications/cps/CPSWhat';
import CPSAbout from '../../components/certifications/cps/CPSAbout';
import CPSHow from '../../components/certifications/cps/CPSHow';
import CPSWhere from '../../components/certifications/cps/CPSWhere';
import Testimonial from '../../components/shared/Testimonial';
import CPSReviews from '../../components/certifications/cps/CPSReviews';
import Head from 'next/head';
import Meta from '../../components/shared/Meta';
Amplify.configure(awsExports);

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_API_KEY = process.env.GRAPHQL_API_KEY;

const primaryFeatures = [
  {
    name: 'Advance Your Career',
    description:
      "This Certificate will show your employers that you're dedicated and possess a hard work ethic.",
    href: '#',
    icon: BoltIcon,
  },
  {
    name: 'Keep Up With Innovation',
    description:
      "Packaging is a field of science, which means materials, processes, and technologies are constantly evolving. We'll keep you informed.",
    href: '#',
    icon: UsersIcon,
  },
  {
    name: 'Find Insights & Inspiration',
    description:
      'Expanding your knowledge base is an excellent way to discover new ideas in packaging and make yourself stand out.',
    href: '#',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Learn The Market',
    description:
      'We exist in a rapidly-changing marketplace where company ownership, business cultures, and packaging responsibilities vary.',
    href: '#',
    icon: BoltIcon,
  },
  {
    name: 'Differentiate Yourself',
    description:
      'Apply your learning right away while you enhance your resume with a specialization in packaging.',
    href: '#',
    icon: UsersIcon,
  },
  {
    name: 'Grow Your Network',
    description:
      'Throughout the program, you will have the opportunity to ask questions, share experiences, and learn from people who have the experience and expertise to help your business flourish.',
    href: '#',
    icon: CalendarDaysIcon,
  },
];

const features = [
  '6-Months Access',
  'Choose Your Own Electives',
  '12 Expert-led Courses',
  'Instructor Email Access',
];

const stats = [
  { id: 1, name: 'Course Hours', value: '60' },
  { id: 2, name: 'Courses Included', value: '12', link: true },
  { id: 3, name: 'CEUs Earned', value: '6' },
  { id: 4, name: 'Flexibility to Complete', value: '12 months' },
];

export const Page = () => {
  return (
    <>
      {/* <Head>
        <title>Packaging School | Certificate of Packaging Science</title>
        <meta
          property='og:title'
          content={`Packaging School |  Certificate of Packaging Science`}
          key='title'
        />
      </Head> */}
      <Meta
        title={'Certificate of Packaging Science (CPS)'}
        description={
          'Ideal for professionals in the packaging or related industries seeking a comprehensive understanding of the packaging industry. With the flexibility of 6-month access, this is an excellent choice for salespeople, packaging engineers, marketing leads, operations personnel, and procurement professionals looking to gain valuable insights.'
        }
        image={'https://packschool.s3.amazonaws.com/cps-1-seoImage.webp'}
        keywords={
          'certification, packaging design, packaging materials, corrugated containers, polymers, machinery, packaging regulations'
        }
      />
      <div className='flex flex-col dark:bg-dark-dark'>
        <CPSHero />
        <CPSNav />
        <CPSWhat />
        <CPSAbout />
        <CPSHow />
        <Testimonial
          id='testimonial'
          author={{
            name: 'Gregory Cox',
            role: 'Packaging and Containers Professional',
            image: 'https://packschool.s3.amazonaws.com/greg_cox.jpeg',
          }}
        >
          <p>
            “If you’re looking to increase your Packaging IQ. Here’s a good
            start! Despite having a degree in packaging and having worked in the
            industry for nearly 10 years, I still learned quite a bit. Very
            proud to share this achievement! Thank you Prof. Andrew Hurley, PhD,
            Julie Rice Suggs, PhD, and everyone at The Packaging School for
            putting together this program. It was a lot of fun and well
            designed! Cheers!”
          </p>
        </Testimonial>
        <CPSWhere />
        <CPSReviews />
      </div>
    </>
  );
};

export default Page;
