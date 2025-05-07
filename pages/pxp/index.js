import React from 'react';
import {
  GiAwareness,
  GiChampions,
  GiBookPile,
  GiLockedChest,
  GiNotebook,
} from 'react-icons/gi';
import LevelProgressBar from '../../components/LevelProgressBar';
import { useSelector } from 'react-redux';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
const reasons = [
  {
    title: 'Purchase Courses',
    description:
      "For every course you purchase, you'll earn a set amount of PXP. The more you invest in your learning, the faster you level up!",
    icon: GiBookPile,
  },
  {
    title: 'Complete Free Lessons',
    description:
      "You don't have to buy anything to start earning PXP. Complete any free lessons available on the platform, and watch your PXP grow!",
    icon: GiNotebook,
  },
  {
    title: 'Complete Your Profile',
    description:
      'Complete your onboarding and keep your profile update to date to earn easy PXP.',
    icon: GiAwareness,
  },
  //   {
  //     title: 'Login Streaks',
  //     description:
  //       "Stay consistent with your learning! Each day you log in to the platform, you'll earn PXP for maintaining your streak. The longer your streak, the more PXP you'll get!",
  //   },
  {
    title: 'Special Bonuses',
    description:
      "From time to time, we'll offer special bonus events where you can earn extra PXP for completing specific challenges or activities.",
    icon: GiLockedChest,
  },
];

const faqs = [
  {
    id: 1,
    question: ' What is Pack Experience Points (PXP)?',
    answer:
      'Pack Experience Points (PXP) are points you earn by engaging with the platform. You can earn PXP by purchasing courses, completing lessons, updating your profile, and maintaining login streaks. The more you engage, the more PXP you earn, and the higher you level up!',
  },
  {
    id: 2,
    question: 'Is participation in the gamification system mandatory?',
    answer:
      'No, participation is entirely optional! You can continue to enjoy all the features of our platform without engaging in the gamification system. However, if you choose to participate, you&apos;ll be able to earn rewards as you level up and enhance your learning experience.',
  },
  {
    id: 3,
    question: 'How do I level up and what do I earn?',
    answer:
      'You level up by earning PXP through various activities. Every time you earn enough points to reach a new level, you’ll progress from Level 1 up to Level 30. With each new level, you’ll unlock exciting rewards like exclusive swag, course discounts, and waived application fees!',
  },
  {
    id: 4,
    question: 'How do I track my progress?',
    answer:
      'You can track your progress through the interactive chart available on your profile page. It will show how much PXP you’ve earned, what level you’re currently at, and how close you are to unlocking your next reward. You can also see upcoming rewards as you level up.',
  },
  {
    id: 5,
    question: 'How often do I get rewards?',
    answer:
      'You’ll receive rewards at every 5th level (Levels 5, 10, 15, 20, etc.), but smaller rewards and milestones will be available in-between. For example, you might get special badges, course discounts, or other perks as you progress. The higher your level, the bigger the rewards!',
  },
  {
    id: 6,
    question: 'I am having trouble with the PXP system. Who can I contact?',
    answer:
      'If you have any questions or need assistance with the PXP system, please contact us at info@packagingschool.com.',
  },
];

const Page = () => {
  const { userXp } = useSelector((state) => state.auth);
  return (
    <div className='w-full h-full flex flex-col gap-16 lg:gap-20 py-20'>
      <div className='w-full grid lg:grid-cols-12 max-w-7xl mx-auto gap-16'>
        <div className='w-full lg:col-span-8'>
          <div className='w-full flex flex-col gap-5'>
            <div className='h1-base'>Welcome to the Pack XP Experience!</div>
            <div className='w-full text-xl max-w-4xl leading-relaxed'>
              We&apos;re excited to introduce an optional new way to enhance
              your learning experience! With our gamified system, you can earn
              Pack Experience Points (PXP) by completing courses, lessons, and
              other activities on our platform. As you level up, you&apos;ll
              unlock exclusive rewards—just for being active and engaging with
              the content you love! Ready to level up? Let&apos;s get started!
            </div>
          </div>
        </div>
        <div className='w-full lg:col-span-4'>
          <div
            className='w-full h-full bg-center bg-contain bg-no-repeat'
            style={{
              backgroundImage:
                "url('https://packschool.s3.us-east-1.amazonaws.com/xp-hero.png')",
            }}
          ></div>
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto bg-slate-800 rounded-lg px-10 pt-12 pb-16'>
        <div className='w-full flex flex-col gap-12'>
          <div className='w-full flex flex-col gap-3'>
            <div className='w-full text-center text-xl uppercase font-bold text-gray-400 tracking-[0.5em] mb-3'>
              How it works
            </div>
            <div className='h2-base text-white text-center'>
              Earn PXP and Level Up
            </div>
            <div className='w-full text-center text-lg text-white/80 max-w-3xl mx-auto'>
              Earning Pack Experience Points (PXP) is easy and fun! Here&apos;s
              how you can start earning points and leveling up:
            </div>
          </div>
          <div className='w-full grid grid-cols-2 gap-6'>
            {reasons.map((reason, index) => (
              <div
                className='flex items-start gap-5  bg-slate-900 rounded-lg p-6'
                key={index}
              >
                <div className='w-20 h-20 flex items-center justify-center bg-clemson text-white'>
                  <reason.icon size={50} />
                </div>
                <div key={index} className='w-full flex flex-col gap-1.5'>
                  <div className='w-full text-xl font-medium text-clemson'>
                    {reason.title}
                  </div>
                  <div className='w-full text-sm text-white/70'>
                    {reason.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-5'>
        <div className='h2-base text-center'>
          Track Your Progress. Claim Rewards.
        </div>
        <div className='w-full text-center text-lg max-w-4xl mx-auto'>
          As you climb the ranks, exciting rewards await you! From exclusive
          swag to discounts and even waived application fees, there’s plenty to
          earn along the way. Here’s what you’ll unlock:
        </div>
        <LevelProgressBar userXp={userXp} />
      </div>
      <div className='w-full h-px bg-clemson mx-auto max-w-7xl'></div>
      <div className='w-full max-w-7xl mx-auto divide-y divide-gray-900/10'>
        <div className='h2-base text-center text-gray-900'>
          Frequently asked questions
        </div>
        <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
          {faqs.map((faq) => (
            <Disclosure as='div' key={faq.question} className='pt-6'>
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className='flex w-full items-start justify-between text-left text-gray-900'>
                      <span className='text-base font-semibold leading-7'>
                        {faq.question}
                      </span>
                      <span className='ml-6 flex h-7 items-center'>
                        {open ? (
                          <MinusIcon className='h-6 w-6' aria-hidden='true' />
                        ) : (
                          <PlusIcon className='h-6 w-6' aria-hidden='true' />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as='dd' className='mt-2 pr-12'>
                    <p className='text-base leading-7 text-gray-600'>
                      {faq.answer}
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Page;
