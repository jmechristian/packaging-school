import React from 'react';
import { MdPlayArrow } from 'react-icons/md';
import {
  GiBookPile,
  GiFizzingFlask,
  GiFinishLine,
  GiInspiration,
} from 'react-icons/gi';

const Page = () => {
  return (
    <div className='w-full max-w-[2000px] mx-auto flex flex-col pb-24'>
      <div className='w-full h-[70vh] lg:h-[44vh] bg-dark flex justify-center relative'>
        {/* Textural Background */}
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

        <div className='w-full max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16 mt-12 lg:mt-24 px-6 lg:px-0'>
          <div className='w-full grid grid-cols-6 gap-8 lg:!gap-0'>
            <div className='h1-base text-clemson col-span-6 lg:!col-span-4 flex flex-col gap-0'>
              <span className='text-base-brand leading-[1]'>
                Advance your career.
              </span>
              <span className='text-white leading-[1]'>Boost your resume.</span>
              <span className='text-clemson leading-[1]'>Keep learning.</span>
            </div>
            <div className='col-span-6 lg:!col-span-2 flex flex-col gap-6'>
              <div className='text-slate-300 text-xl lg:text-2xl leading-[1.2]'>
                We’re excited to announce a fresh, more powerful learning
                experience — coming soon — designed to help you get even more
                out of your education.
              </div>
              <div className='w-full grid grid-cols-4 gap-6 pr-6'>
                <div className='aspect-[5/4] w-full bg-clemson flex items-center justify-center rounded-lg'>
                  <GiBookPile size={50} className='text-white' />
                </div>
                <div className='aspect-[5/4] w-full bg-clemson flex items-center justify-center rounded-lg'>
                  <GiFizzingFlask size={45} className='text-white' />
                </div>
                <div className='aspect-[5/4] w-full bg-clemson flex items-center justify-center rounded-lg'>
                  <GiFinishLine size={45} className='text-white' />
                </div>
                <div className='aspect-[5/4] w-full bg-clemson flex items-center justify-center rounded-lg'>
                  <GiInspiration size={45} className='text-white' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative bg-dark rounded-b-3xl'>
        {/* Your content inside the container */}

        {/* Notch */}
        <div className='absolute bottom-0 left-1/2 w-[180px] h-[180px] -translate-x-1/2 translate-y-1/2 bg-dark rounded-full z-10 flex items-center justify-center'>
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
            <div className='text-clemson font-bold text-lg z-10 rotate-90'>
              <MdPlayArrow size={60} />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24 mt-40 px-6 lg:px-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24'>
          <div className='flex flex-col gap-5'>
            <div className='text-xl font-medium font-oswald text-clemson uppercase tracking-wider'>
              All-Access Pass
            </div>
            <div className='h3-base leading-[1.2]'>
              Experience Full-Access to the Entire Packaging School Catalog.
            </div>
            <div className='text-slate-700 text-lg leading-snug'>
              With hundreds of lessons and courses to explore, getting started
              can feel overwhelming. That&apos;s why we&apos;ve made it simple
              to get full 12-month access: you can join one of our expert-led,
              immersive certificate cohorts for a collaborative learning
              experience, purchase a single certificate program for flexible,
              self-paced learning, or, if you&apos;re an alumni, maintain
              discounted access to the entire course library.
            </div>
            <div
              className='w-fit bg-black text-white rounded px-6 py-3 text-center font-semibold mt-2 cursor-pointer hover:bg-slate-800 transition-colors'
              onClick={() => {
                window.open(
                  'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
                  '_blank'
                );
              }}
            >
              Speak to An Advisor About Early Access!
            </div>
          </div>
          <div
            className='w-full rounded-lg overflow-hidden bg-black border border-slate-800 mt-6 bg-cover bg-top aspect-[5/3]'
            style={{
              backgroundImage:
                'url(https://packschool.s3.us-east-1.amazonaws.com/all-access.gif)',
            }}
          ></div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center'>
          <div
            className='w-full rounded-lg aspect-[5/3] overflow-hidden bg-black border border-slate-800 mt-6 bg-cover bg-left-top'
            style={{
              backgroundImage:
                'url(https://packschool.s3.us-east-1.amazonaws.com/profile-dash.gif)',
            }}
          ></div>
          <div className='flex flex-col gap-5'>
            <div className='text-xl font-medium font-oswald text-clemson uppercase tracking-wider'>
              Upgraded Learning Dashboard
            </div>
            <div className='h3-base leading-[1.2]'>
              Everything you need, all in one place. Take Control of Your
              Learning Journey.
            </div>
            <div className='text-slate-700 text-lg leading-snug'>
              Your new Learning Dashboard puts everything at your fingertips.
              Easily view your current enrollments, track your progress, follow
              your Learning Paths, and review your full course history. You can
              also manage your saved and completed lessons from the Lesson
              Library and update all your profile information — everything you
              need, all in one convenient place.
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center'>
          <div className='flex flex-col gap-5'>
            <div className='text-xl font-medium font-oswald text-clemson uppercase tracking-wider'>
              Learning Paths
            </div>
            <div className='h3-base leading-[1.2]'>
              Your Path to New Skills Starts Here.
            </div>
            <div className='text-slate-700 text-lg leading-snug'>
              We&apos;re excited to introduce Learning Paths — a brand new way
              to master an entire skillset through an expertly crafted series of
              courses and lessons. Progress through each path, earn badges along
              the way, and showcase your achievements on LinkedIn and other
              social profiles. Best of all, you can get started for free.
            </div>
          </div>
          <div
            className='w-full rounded-lg aspect-[5/3] overflow-hidden bg-black border border-slate-800 mt-6 bg-cover bg-center'
            style={{
              backgroundImage:
                'url(https://packschool.s3.us-east-1.amazonaws.com/lp-path.gif)',
            }}
          ></div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center'>
          <div
            className='w-full rounded-lg aspect-[5/3] overflow-hidden bg-black border border-slate-800 mt-6 bg-cover bg-center'
            style={{
              backgroundImage:
                'url(https://packschool.s3.us-east-1.amazonaws.com/quiz-lp.gif)',
            }}
          ></div>
          <div className='flex flex-col gap-5'>
            <div className='text-xl font-medium font-oswald text-clemson uppercase tracking-wider'>
              Challenge Yourself
            </div>
            <div className='h3-base leading-[1.2]'>
              Complete Quizzes, Track Progress, Earn Achievements
            </div>
            <div className='text-slate-700 text-lg leading-snug'>
              You can now test your knowledge with quizzes at the end of many
              lessons in the Lesson Library! Quizzes help you check your
              understanding, complete Learning Path objectives, and prepare for
              upcoming Learning Achievements. And there&apos;s more on the way —
              starting Winter 2025, you&apos;ll be able to earn Pack Experience
              Points (PXP) by completing quizzes, with the beta already
              underway. It&apos;s a great time to start building your progress!
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:!grid-cols-4 gap-10 lg:!gap-20 bg-slate-100 rounded-lg p-10'>
          <div className='h3-base lg:h4-base col-span-1'>
            What Do You Need
            <br /> To Do?
          </div>
          <div className='text-slate-700 text-lg leading-snug col-span-3'>
            If you created your account with an email and password, you&apos;ll
            be prompted to reset your password the first time you access the new
            dashboard. You can also login with your social provider of choice if
            that email matches your learner email. If you signed up with Google
            or LinkedIn, or another social provider, no action is needed. And
            don&apos;t worry — we&apos;ll also send a reminder email to help you
            get started!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
