import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCohorts, getCertificates } from '../../helpers/api';
import CohortModal from '../shared/CohortModal';
import CertificateModal from '../shared/CertificateModal';
import { MdAccessAlarm } from 'react-icons/md';
const SubscriptionWhat = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [cohorts, setCohorts] = useState([]);
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const features = [
    {
      title: 'Full Course Catalog Access',
      description:
        'Gain unlimited access to our ever-growing library of expert-led courses and lessons, with new content added monthly.',
    },
    {
      title: 'Certificates of Completion',
      description:
        'Earn industry-recognized certificates as you progress through your learning journey, proving your expertise and boosting your credibility.',
    },
    {
      title: 'Learning Paths',
      description:
        'Follow structured learning paths designed to guide you through essential packaging topics, making it easier to master key skills.',
    },
    {
      title: 'Learn Anywhere',
      description:
        'Access your courses anytime, anywhere—on desktop, tablet, or mobile—so you can learn at your own pace, on your schedule.',
    },
    {
      title: 'Personalized Dashboard',
      description:
        'Track your progress, manage your courses, and see your achievements in one convenient, easy-to-use dashboard.',
    },
    {
      title: 'Full Lesson Library Access',
      description:
        'Gain unlimited access to our ever-growing library of expert-led courses and lessons, with new content added monthly.',
    },
  ];

  useEffect(() => {
    const fetchCohorts = async () => {
      const cohorts = await getCohorts();
      setCohorts(cohorts);
    };
    const fetchCertificates = async () => {
      const certificates = await getCertificates();
      setCertificates(certificates);
    };
    fetchCohorts();
    fetchCertificates();
  }, []);

  const handleCohortModalToggle = () => {
    setIsCohortModalOpen(!isCohortModalOpen);
  };

  const handleSelectCohort = (cohort) => {
    console.log('Selected cohort:', cohort);
    // Add your cohort selection logic here
    setIsCohortModalOpen(false);
  };

  return (
    <div className='w-full max-w-7xl mx-auto flex flex-col gap-12 relative'>
      {isCohortModalOpen && (
        <CohortModal
          isOpen={isCohortModalOpen}
          setIsOpen={setIsCohortModalOpen}
          cohorts={cohorts}
          onSelectCohort={handleSelectCohort}
        />
      )}
      {isCertificateModalOpen && (
        <CertificateModal
          isOpen={isCertificateModalOpen}
          setIsOpen={setIsCertificateModalOpen}
          certificates={certificates.filter(
            (certificate) =>
              certificate.abbreviation !== 'CMPM' &&
              certificate.abbreviation !== 'FPC'
          )}
        />
      )}
      <div className='flex flex-col items-center justify-center gap-5 mx-auto max-w-4xl'>
        <h3 className='h3-base'>
          Stop Scrolling, Start Learning—Unlock Full Access Today.
        </h3>
        <p className='text-xl text-center'>
          With hundreds of lessons and courses, choosing can feel overwhelming.
          That&apos;s why we&apos;ve made it easy—get full access with a
          certificate or alumni subscription.
        </p>
      </div>
      <div className='w-full text-center text-xl uppercase font-bold text-gray-500 tracking-[0.5em]'>
        Choose Your Path
      </div>
      <div className='grid lg:grid-cols-3 gap-5 w-full items-center'>
        {/* COHORT */}
        <div className='w-full h-full flex flex-col gap-3 px-5 py-5 border rounded-lg shadow-lg hover:ring-4 hover:ring-clemson hover:shadow-xl transition-shadow duration-300'>
          <div className='w-full text-2xl font-semibold leading-tight select-none'>
            Comprehensive Certificate Cohorts
          </div>
          <div className='w-full text-lg leading-snug select-none'>
            Join one of our immersive, expert-led certificate cohorts for a
            collaborative learning experience complete with 12-month full
            catalog access.
          </div>
          <div className='grid w-full gap-5 mt-2'>
            <div className='w-full p-4 border-t-4 border-l border-l-gray-300 border-r border-r-gray-300 border-b border-b-gray-300 border-t-clemson flex flex-col gap-4'>
              <div className='w-full flex items-center justify-between select-none'>
                <div className='font-semibold text-gray-500'>
                  12-Month Access
                </div>
                <div className='bg-gray-200 rounded-lg px-4 py-2 font-semibold text-sm'>
                  Most Immersive!
                </div>
              </div>
              <div className='w-full flex items-center justify-between border border-gray-300 rounded-lg py-4 px-5 h-[100px] select-none'>
                <div className='w-full text-5xl font-bold'>
                  $7,000
                  <span className='text-gray-500 text-lg font-medium'>
                    /USD
                  </span>
                </div>
              </div>
              <div
                className='w-full font-bold text-white bg-clemson hover:bg-clemson-dark transition-colors duration-300 rounded-lg px-4 py-2 text-center cursor-pointer'
                onClick={handleCohortModalToggle}
              >
                View Available Cohorts
              </div>
              <div
                className='text-sm text-brand-indigo text-center cursor-pointer mt-2'
                onClick={() => router.push('/cohorts')}
              >
                Why Cohort Learning?
              </div>
              {cohorts.length > 0 && (
                <div className='flex flex-col gap-2 bg-gray-100 p-4 rounded-lg mt-2 select-none h-[235px]'>
                  <div className='w-full h-full text-sm font-bold border-b border-gray-300 pb-2'>
                    Featured Cohort: {cohorts[0].type} - {cohorts[0].name}
                  </div>
                  <div className='flex items-center gap-1'>
                    <div className='text-sm font-bold'>
                      <MdAccessAlarm size={16} />
                    </div>
                    <div className='text-sm font-bold'>
                      Deadline: {cohorts[0].deadline}
                    </div>
                  </div>
                  <div className='flex flex-col gap-1 divide-y divide-gray-500 divide-dashed'>
                    <div className='w-full h-full py-1 text-sm'>
                      Clemson University Certificate. 100% online.
                    </div>
                    <div className='w-full h-full py-1 text-sm'>
                      Structured 12-week program with custom project related to
                      your goals.
                    </div>
                    <div className='w-full h-full py-1 text-sm'>
                      12-month access to all courses and a dynamic lesson
                      library.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* CERTS */}
        <div className='w-full h-full flex flex-col gap-3 p-5 border rounded-lg shadow-lg hover:ring-4 hover:ring-base-brand hover:shadow-xl transition-shadow duration-300'>
          <div className='w-full text-2xl font-semibold leading-tight'>
            Individual Certificate
            <br /> Access
          </div>
          <div className='w-full text-lg leading-snug'>
            Select a focused pathway tailored to your career goals. Purchase a
            single certificate for 12 months of in-depth, self-paced learning
            and exclusive content.
          </div>
          <div className='grid w-full gap-5 mt-2'>
            <div className='w-full p-4 border-t-4 border-l border-l-gray-300 border-r border-r-gray-300 border-b border-b-gray-300 border-t-base-brand flex flex-col gap-4'>
              <div className='w-full flex items-center justify-between'>
                <div className='font-semibold text-gray-500'>
                  12-Month Access
                </div>
                <div className='bg-gray-200 rounded-lg px-4 py-2 font-semibold text-sm'>
                  Self-Paced
                </div>
              </div>
              <div className='flex w-full items-center justify-between border border-gray-300 rounded-lg py-4 pl-3 pr-4 h-[100px]'>
                <div className='w-fit flex items-end justify-center text-4xl font-bold tracking-tight'>
                  $4,000
                  <span className='text-gray-500 text-sm font-medium'>
                    /USD
                  </span>
                </div>
                <div className='w-px h-full bg-gray-400'></div>
                <div className='flex flex-col items-center justify-center text-center'>
                  <div className='text-sm font-medium text-gray-500'>
                    5 Payments of
                  </div>
                  <div className='text-4xl tracking-tight font-bold'>$800</div>
                </div>
              </div>
              <div
                className='font-bold text-white bg-base-brand rounded-lg px-4 py-2 text-center cursor-pointer'
                onClick={() => setIsCertificateModalOpen(true)}
              >
                Choose Your Certificate
              </div>
              <div
                className='text-sm text-brand-indigo text-center cursor-pointer mt-2'
                onClick={() => router.push('/certifications')}
              >
                Learn More About Certificates
              </div>
              <div className='flex flex-col gap-2 bg-gray-100 p-4 rounded-lg mt-2 select-none h-[235px]'>
                <div className='w-full h-full text-sm font-bold '>
                  Featured Certification: Certificate of Packaging Science
                </div>

                <div className='flex flex-col gap-1 divide-y divide-gray-500 divide-dashed'>
                  <div className='w-full h-full py-1 text-sm'>
                    Learn at your own pace, 100% online. Earn a certificate upon
                    completion.
                  </div>
                  <div className='w-full h-full py-1 text-sm'>
                    60 hours curriculum. Choose your own elective course.
                  </div>

                  <div className='w-full h-full py-1 text-sm'>
                    12-month access to all courses and a dynamic lesson library.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ALUMNI */}
        <div className='w-full h-full flex flex-col gap-5 p-4 border rounded-lg shadow-lg hover:ring-4 hover:ring-brand-yellow hover:shadow-xl transition-shadow duration-300'>
          <div className='w-full text-2xl font-semibold'>
            Alumni Library
            <br /> Access
          </div>
          <div className='w-full text-lg'>
            Exclusively for our certificate graduates: continue your learning
            journey with 12-month access to our curated Alumni Library.
          </div>
          <div className='grid w-full gap-5 mt-2'>
            <div className='w-full p-4 border-t-4 border-l border-l-gray-300 border-r border-r-gray-300 border-b border-b-gray-300 border-t-brand-yellow flex flex-col gap-4'>
              <div className='w-full flex items-center justify-between'>
                <div className='font-semibold text-gray-500'>
                  12-Month Access
                </div>
                <div className='bg-gray-200 rounded-lg px-4 py-2 font-semibold text-sm'>
                  Alumni Exclusive
                </div>
              </div>
              <div className='w-full flex items-center justify-between border border-gray-300 rounded-lg py-4 px-5 h-[100px]'>
                <div className='w-full text-5xl font-bold'>
                  $399
                  <span className='text-gray-500 text-lg font-medium'>
                    /USD
                  </span>
                </div>
              </div>
              <div className='w-full font-bold text-white bg-yellow-500 rounded-lg px-4 py-2 text-center'>
                Purchase Alumni Access
              </div>
              <div
                className='text-sm text-brand-indigo text-center cursor-pointer mt-2'
                onClick={() => router.push('/all_courses')}
              >
                View Course Catalog
              </div>
              <div className='flex flex-col gap-2 bg-gray-100 p-4 rounded-lg mt-2 select-none h-[235px]'>
                <div className='w-full text-sm font-bold leading-tight'>
                  You must have completed one of the following certificates to
                  qualify for alumni access:
                </div>
                <div className='flex flex-col gap-1 divide-y divide-gray-500 divide-dashed'>
                  <div className='w-full h-full py-1 text-sm leading-tight'>
                    Certificate of Mastery in Packaging Management
                  </div>
                  <div className='w-full h-full py-1 text-sm leading-tight'>
                    Certificate of Packaging Science
                  </div>

                  <div className='w-full h-full py-1 text-sm leading-tight'>
                    Automotive Packaging Certificate
                  </div>
                  <div className='w-full h-full py-1 text-sm leading-tight'>
                    Certificate of Sustainable Packaging
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full text-center text-lg'>
        All plans include the option to have your manager complete the checkout
        process
      </div>
      <div className='w-full border-t border-clemson pt-16 flex flex-col gap-16'>
        <div className='text-center text-xl font-bold'>
          All Subscriptions Include:
        </div>
        <div className='w-full grid grid-cols-3 gap-10'>
          {features.map((feature, index) => (
            <div key={index} className='w-full  flex flex-col gap-2'>
              <div className='w-full text-2xl font-semibold'>
                {feature.title}
              </div>
              <div className='w-full h-full text-lg'>{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionWhat;
