import { useState, useMemo } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import FAQItem from '../components/shared/FAQItem';
import Meta from '../components/shared/Meta';
import { generateMetadata } from '../libs/seo/generateMetadata';
import { getAllFaqs } from '../helpers/api';
import FaqSection from '../components/shared/FaqSection';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from '../libs/seo/organizationJsonLd';

// const faqs = [
//   {
//     question: 'Who created The Packaging School?',
//     answer:
//       'The Packaging School was founded by Dr. Andrew Hurley, Associate Professor of Packaging Science at Clemson University, after continuous requests from manufacturers, converters, distributors, printers, designers, logistics carriers and brand owners to provide continuing education for their employees.',
//   },
//   {
//     question: 'So, are you Clemson University?',
//     answer:
//       'We are a separate entity from Clemson University, established as an LLC. We partner with schools, companies, associations and subject matter experts to create and provide unbiased online education in the realm of packaging. ',
//   },
//   {
//     question: 'What courses/programs do you offer?',
//     answer: (
//       <div>
//         <Link className='underline' href='/all_courses'>
//           Check out our Course Catalog
//         </Link>
//       </div>
//     ),
//   },
//   {
//     question:
//       'What is the difference between the Certificate of Packaging Science and the Certificate of Mastery in Packaging Management?',
//     answer: (
//       <div className='flex flex-col gap-4'>
//         <div>
//           The{' '}
//           <Link
//             href={'https://packagingschool.com/certifications/get-to-know-cps'}
//           >
//             Certificate of Packaging Science
//           </Link>{' '}
//           is a one year online program that teaches the materials, processes,
//           and influences shaping the advancement of the industry. From design
//           conception to production and end-of-life, students will learn how to
//           speak the language of packaging and utilize it as a key differentiator
//           for you and your company. This program has 60 hours of content, 12
//           courses, and 6 CEUs (continuing education credits). The cost is $3,999
//           or $349/month for 12 monthly payments.
//         </div>
//         <div>
//           The{' '}
//           <Link
//             href={'https://packagingschool.com/certifications/get-to-know-cmpm'}
//           >
//             Certificate of Mastery in Packaging Management
//           </Link>{' '}
//           is an online, interactive teaching series that guides organization
//           leaders through a process of designing effective packaging systems.
//           The teachings enable students to realize their creativity, actualize
//           cost-savings for their company, and develop complete packaging
//           systems. Throughout the business quarter, students complete ten online
//           courses and a packaging development plan, which applies the teachings
//           of the courses to a current work project. The lessons within each
//           course are on-demand, which means students can log in and learn at the
//           time that best suits their schedule. This program has 80 hours of
//           content, 10 courses, and 8 CEUs. The cost is $7,000 since it is
//           instructor led and payment plans are available as well.
//         </div>
//       </div>
//     ),
//   },
//   {
//     question: 'What does it take to earn the Certificate of Packaging Science?',
//     answer:
//       'Composed of 12 courses, students will develop a comprehensive understanding of the industry, materials, processes, and development strategies.',
//   },
//   {
//     question: 'What will the Certificate of Packaging Science do for me?',
//     answer:
//       'You will learn the knowledge necessary to have a holistic understanding of packaging. This intelligence will open up opportunities for you to advance into new packaging fields. Discover applications for innovation in your packaging career.',
//   },
//   {
//     question: 'How are courses structured?',
//     answer: (
//       <div className='flex flex-col gap-4'>
//         <div>
//           We embrace MicroLearning! Smartphones have accustomed us to accessing
//           the information we need at rapid speed and in short bursts. Long
//           training sessions, multiple day workshops, and huge manuals are not a
//           desirable way to learn information. Instead, we use a technique called
//           MicroLearning to break difficult topics down into lessons of
//           bite-sized chunks that students can engage with on any device. These
//           lessons take the form of infographics, quick readings, videos,
//           animations, discussions, and interactive slides. This delivery method
//           empowers students to complete courses at their leisure, when they’re
//           ready to learn, and still gain an essential education.
//         </div>
//         <div>
//           Short, focused sessions (less than 7 minutes) avoid mental burnout and
//           suit the brain with respect to energy and alertness. Bite-sized
//           content perfectly suits an information-rich lifestyle because it
//           enables learners to access small chunks of information instantly,
//           anytime, and from anywhere. And because microlearning is short and
//           seemingly current, trainees can rest easy that the content is up to
//           date, correct, and meaningful to their work.
//         </div>
//         <div>
//           Courses are organized by Modules, which are composed of Lessons and
//           cover 3-5 Learning Goals over an hour-long engagement period. All
//           lessons are unique, so the number of lessons it takes to communicate a
//           course varies. In our experience, most courses incorporate 1-8 hours
//           of engagement.
//         </div>
//       </div>
//     ),
//   },
//   {
//     question: 'What kind of experience can I expect when taking a course?',
//     answer:
//       'Each course with The Packaging School is an engaging experience. Lessons are structured in small pieces with a specific flow so it makes it easy for you to advance at your own pace. Within the lesson, you will encounter a variety of content types including text, graphics, images, videos, interactive application models, peer discussions and quizzes.',
//   },
//   {
//     question: 'How do I know I’m really learning?',
//     answer:
//       'Learning goals with real world application guide all knowledge provided in the course. Each lesson presents information tailored to your professional growth. Simulations and small assessments at the end of lessons allow you to measure your progress. Track advancement in the My Achievements tab of your profile.',
//   },
//   {
//     question: 'Can I access courses from my tablet or mobile device?',
//     answer:
//       'YES! The Packaging School’s learning management system is suited for on-the-go education. Access it from any smart phone.',
//   },
//   {
//     question: 'How long will it take to finish the certificate?',
//     answer:
//       'The Packaging Certificate will take around 60 total hours to achieve. A working professional allocating 30 minutes of their lunch break a day could complete the Certificate in three months.',
//   },
//   {
//     question: 'How much time may I have to complete the certificate program?',
//     answer:
//       'Students must finish each single course within 12 months from start of the course. Students who enroll in The Professional Certificate and Quarter Enrollment bundle, will have 24 months to complete all courses.',
//   },
//   {
//     question: 'Do you offer refunds?',
//     answer: (
//       <div className=' flex flex-col gap-4'>
//         <div>
//           Purchase of individual courses are non-refundable upon enrollment of
//           the online course. Course may be transferable if notified in writing
//           within 5 days of purchase.
//         </div>
//         <div>
//           Purchase of the full Certificate program can be canceled & partially
//           refunded provided the student has completed less than 60% of the
//           program. A $100 non-refundable application fee will be retained.
//           Benchmarks for completion are based on program completion at 528
//           microlessons. See the table below for refund percentages. For
//           mitigating circumstances, please email info@packagingschool.com.
//         </div>
//         <div>
//           <strong>
//             Benchmarks to demonstrate percent of completion are as follows:
//           </strong>
//         </div>
//         <div>
//           A student has completed 10% of the program when he or she has
//           completed 53 micro-lessons.
//         </div>
//         <div>
//           A student has completed 20% of the program when he or she has
//           completed 105 micro-lessons in the program.
//         </div>
//         <div>
//           A student has completed 30% of the program when he or she has
//           completed 158 micro-lessons in the program.
//         </div>
//         <div>
//           A student has completed 40% of the program when he or she has
//           completed 212 micro-lessons in the program.
//         </div>
//         <div>
//           A student has completed 50% of the program when he or she has
//           completed 264 micro-lessons.
//         </div>
//         <div>
//           A student has completed 60% of the program when he or she has
//           completed 317 micro-lessons in the program.{' '}
//         </div>
//         <div className='italic'>
//           The Packaging School reserves the right to dispute claims based on
//           student viewing history.
//         </div>
//       </div>
//     ),
//   },
//   {
//     question:
//       'I see specific courses within the Certificate of Packaging Science that I’m interested in. Can I purchase individual courses?',
//     answer:
//       'Yes! You can purchase individual courses! However, in order to obtain your Certificate of Packaging Science you will need to complete all 12 courses.',
//   },
//   {
//     question:
//       'Is there a certificate of accomplishment for individual courses?',
//     answer:
//       'Yes, we do provide a certificate of accomplishment for all individual courses.',
//   },
//   {
//     question: 'Does the Packaging School offer any scholarships?',
//     answer: 'Inquiries should be directed to info@packagingschool.com',
//   },
//   {
//     question: 'How long will this take?',
//     answer:
//       'Individual courses vary in length. We encourage you to complete a section at a time with breaks in between to ensure knowledge retention and immediate application to your real-world projects',
//   },
//   {
//     question: 'Who creates the content you share?',
//     answer:
//       'The Packaging School is the Exclusive Licensee of a professional packaging curriculum developed at Clemson University. The courses are created in a collaborative process between academia and industry leveraging 600+ packaging professionals',
//   },
//   {
//     question: 'Who else will be taking this course?',
//     answer:
//       'Learners from Fortune 500 companies to startups are taking these courses. Age ranges from 18-71 years old.',
//   },
//   {
//     question:
//       'Is the Certificate of Mastery in Packaging Management a Master’s program?',
//     answer:
//       'The Certificate of Mastery in Packaging Management is not a Masters program. Our program takes 12 weeks to complete, whereas an online Masters takes on average 1-2 years to complete.',
//   },
//   {
//     question: 'Can I print materials from the courses?',
//     answer:
//       'We have created custom workbooks for our courses for students to print where you can take notes and keep infographics that may be harder to copy down. Additionally, you will be able to print our PDFs and cheat sheets.',
//   },
//   {
//     question: 'What are the technology requirements of The Packaging School?',
//     answer:
//       'The Packaging School requires all students have access to a computer and at least 3 mpbs of internet. The Packaging School recommends using Chrome as a web browser. Student services will give students suggestions as to how to get access to internet and/or a computer if requested. All other requirements to complete any course or assignment within The Packaging School are embedded into the course. Students will not be asked to purchase any other technology in order to receive the certificate. All study materials will be provided and released at the start of each week. You do not need to prepare anything in advance of the program start date. The Packaging School is accessible from any smartphone or tablet. At this time students may not download any material for offline viewing unless it is intuitive to do so.',
//   },
//   {
//     question: 'Does The Packaging School accept transfer credits?',
//     answer:
//       'No, The Packaging School does not currently accept transfer credits.',
//   },
//   {
//     question: 'What is your grading policy?',
//     answer: 'You must obtain an 80% or greater to pass each course.',
//   },
//   {
//     question: 'Do you accept company purchase orders?',
//     answer:
//       'We accept purchase orders for enrollments totaling $500 and above.',
//   },
//   {
//     question: 'How long will I have access to my courses?',
//     answer:
//       'Unless otherwise noted, you will have access to your courses for 12 months.',
//   },
//   {
//     question: 'Can you send me a 1095-T form for my taxes?',
//     answer: (
//       <div className='flex flex-col gap-4'>
//         <div>
//           Continuing Professional Education are non-credit programs. As a
//           result, we do not provide 1098-T forms. However, continuing education
//           students may be eligible for the Lifetime Learning tax credit. There
//           is no limit on the number of years you can claim the credit. It is
//           worth up to $2,000 per tax return.
//         </div>
//         <div className='font-bold'>Lifetime Learning Tax Credit</div>
//         <div>
//           The Lifetime Learning tax credit is applicable to any level of
//           post-secondary education. It enables a taxpayer to claim a tax credit
//           of up to $2,000 per family for the cost of qualified tuition and
//           related expenses paid by the taxpayer during the tax year on behalf of
//           the taxpayer, the taxpayer’s spouse, or the taxpayer’s dependents. You
//           may qualify for educational tax credit for tuition and fees paid for
//           undergraduate, graduate and continuing education courses.
//         </div>
//         <div>
//           A family can claim on its tax return a credit up to $2,000 ($4,000 if
//           a student lives in a Midwestern disaster area) of educational
//           expenses. Eligible education expenses are offset by scholarships,
//           grants, and employer provided tax free educational assistance. The tax
//           credit is subject to income and other limitations. Taxpayers may file
//           IRS form 8863 Educational Credits with their tax returns to claim tax
//           credits.
//         </div>
//         <div>
//           For detailed information consult IRS Publication 970, Tax Benefits for
//           Higher Education, which describes the tax credits along with other tax
//           savings opportunities related to the higher cost of education. It may
//           be obtained at any IRS office, at
//           <a href='http://www.irs.gov/publications/p970/ch03.html'>
//             http://www.irs.gov/publications/p970/ch03.html
//           </a>
//           , or by calling 1-800-829-1040.
//         </div>
//       </div>
//     ),
//   },
// ];

const Page = ({ faqs }) => {
  const [isShown, setIsShow] = useState(faqs);
  const [isSearchTerm, setIsSearchTerm] = useState('');

  const faqsToShow = useMemo(() => {
    return (
      faqs &&
      faqs.filter(
        (it) =>
          it.question.toLowerCase().includes(isSearchTerm.toLowerCase()) ||
          it.answer.toLowerCase().includes(isSearchTerm.toLowerCase())
      )
    );
  }, [faqs, isSearchTerm]);

  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: '/faq',
    title: 'Packaging School FAQs',
    description:
      'Find answers to packaging education questions. Get quick insights on courses, certifications, and support from the Packaging School.',
  });
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'FAQ', path: '/faq' }],
    siteUrl,
  );
  const faqJsonLd = buildFaqJsonLd(faqs);

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url='/faq'
        structuredData={[organization, website, breadcrumb, faqJsonLd]}
      />
      <div className='w-full flex flex-col gap-10 max-w-7xl mx-auto py-10 lg:py-20'>
        <div className='w-full flex flex-col gap-5 lg:flex-row justify-between items-center px-4 lg:px-0'>
          <div className='h2-base'>Frequently Asked Questions</div>
          <div className='w-full max-w-xl'>
            <div className='flex gap-2 items-center border-2 border-black w-full'>
              <input
                type='text'
                className='w-full flex border-none ring-0 focus:ring-0'
                placeholder='Search FAQs'
                value={isSearchTerm}
                onChange={(e) => setIsSearchTerm(e.target.value)}
              />
              <div>
                <MdOutlineSearch size={28} />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6 lg:gap-10'>
          <FaqSection
            title={'General'}
            type={'GENERAL'}
            faqs={faqsToShow}
            open={true}
          />
          <FaqSection
            title={'Certificates'}
            type={'CERTIFICATES'}
            faqs={faqsToShow}
            open={false}
          />
          <FaqSection
            title={'Courses'}
            type={'COURSES'}
            faqs={faqsToShow}
            open={false}
          />
          <FaqSection
            title={'Purchases'}
            type={'PURCHASES'}
            faqs={faqsToShow}
            open={false}
          />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const faqs = await getAllFaqs();
  // Pass data to the page via props
  return { props: { faqs } };
}

export default Page;
