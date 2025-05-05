import React, { useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { GiSpaceship, GiDiploma, GiGems, GiChampions } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

const WhyPschool = () => {
  const [active, setActive] = useState(0);

  const items = [
    {
      id: 1,
      title: 'Flexible, Self‑Paced Learning',
      description:
        'Access bite‑sized modules 24/7—so individuals can learn on their own schedule and teams can roll out training without disrupting workflows.',
      icon: GiSpaceship,
    },
    {
      id: 2,
      title: 'Career Support & Certification',
      description:
        'Earn industry‑recognized certificates at each milestone, and tap into our job‑board partnerships to connect talent with top employers.',
      icon: GiDiploma,
    },
    {
      id: 3,
      title: 'Industry‑Recognized Curriculum',
      description:
        'Developed and taught by leading packaging engineers, designers, and supply‑chain specialists with decades of hands‑on experience.',
      icon: GiGems,
    },
    {
      id: 4,
      title: 'Scalable Corporate Training & Onboarding',
      description:
        "Customize group portals, track employee progress, and ensure new hires ramp up quickly on today's best practices—complete with team discounts and dedicated support.",
      icon: GiChampions,
    },
  ];

  // Render function for the right side content
  const renderContent = (activeItem) => {
    if (activeItem.id === 1) {
      return (
        <motion.div
          key='learning-browser'
          className='w-full h-full bg-cover aspect-square'
          style={{
            backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/learning-browser.png')`,
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        ></motion.div>
      );
    } else if (activeItem.id === 2) {
      return (
        <motion.div
          key='student-composite'
          className='w-full h-full bg-cover bg-center aspect-square rounded-l-xl overflow-hidden'
          style={{
            backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/student-composite.png')`,
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        ></motion.div>
      );
    } else if (activeItem.id === 3) {
      return (
        <motion.div
          key='curriculum'
          className='flex flex-col gap-2 h-full w-full'
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <div className='w-full grid lg:grid-cols-12 items-center h-full'>
            <div className='w-full flex flex-col gap-0 lg:col-span-8 bg-slate-100 p-5 rounded-md'>
              <div className='h4-base leading-none'>Dr. Andrew Hurley</div>
              <div className=' text-slate-800 text-xl'>Founder</div>
              <div className='text-slate-600 text-sm mt-1'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                egestas, eros et accumsan scelerisque, orci ligula rhoncus
                neque, at fermentum mauris purus sed purus. Etiam in nulla
                purus. Curabitur viverra nec ipsum sed sagittis. Nulla ut
                molestie felis. Vivamus sodales, metus lobortis fermentum
              </div>
            </div>
            <div className='lg:col-span-4'>
              <div
                className='w-full aspect-square bg-cover bg-center'
                style={{
                  backgroundImage: `url('https://packschool.s3.us-east-1.amazonaws.com/post-cG9zdDo1ODU%3D-ANDREW-2018-sm.jpg')`,
                }}
              ></div>
            </div>
            <div className='lg:col-span-4'>
              <div
                className='w-full aspect-square bg-cover bg-center'
                style={{
                  backgroundImage: `url('https://packschool.s3.amazonaws.com/JULIE-2018-sm.jpg')`,
                }}
              ></div>
            </div>
            <div className='w-full flex flex-col gap-0 lg:col-span-8 bg-slate-100 p-5 rounded-md'>
              <div className='h4-base'>Dr. Julie Rice Suggs</div>
              <div className=' text-slate-800 text-xl'>Academic Director</div>
              <div className='text-slate-600 text-sm mt-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                egestas, eros et accumsan scelerisque, orci ligula rhoncus
                neque, at fermentum mauris purus sed purus. Etiam in nulla
                purus. Curabitur viverra nec ipsum sed sagittis. Nulla ut
                molestie felis. Vivamus sodales, metus lobortis fermentum
                gravida, magna nisl luctus.
              </div>
            </div>
          </div>
        </motion.div>
      );
    } else if (activeItem.id === 4) {
      return (
        <motion.div
          key='training'
          className='px-4 flex flex-col gap-4'
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <h2 className='text-center text-lg font-bold text-gray-900 font-greycliff'>
            Trusted by the world’s most innovative teams
          </h2>
          <div className='mx-auto mt-4 grid grid-cols-4 items-center gap-x-4 gap-y-2  sm:grid-cols-3 lg:mx-0 '>
            <img
              className='col-span-2 max-h-28 w-full object-contain lg:col-span-1'
              src='https://packschool.s3.amazonaws.com/bmw.png'
              alt='BWM'
              width={400}
              height={400}
            />
            <img
              className='col-span-2 max-h-28 w-full object-contain lg:col-span-1'
              src='https://packschool.s3.amazonaws.com/starbucks-coffee-logo.png'
              alt='Starbucks'
              width={400}
              height={400}
            />
            <img
              className='col-span-2 max-h-28 w-full object-contain lg:col-span-1'
              src='https://packschool.s3.amazonaws.com/coke.png'
              alt='Coke'
              width={400}
              height={400}
            />
            <img
              className='col-span-2 max-h-28 w-full object-contain sm:col-start-2 lg:col-span-1'
              src='https://packschool.s3.us-east-1.amazonaws.com/sm-westrock.png'
              alt='Smurfit Westrock'
              width={400}
              height={400}
            />
            <img
              className='col-span-2 col-start-2 max-h-28 w-full object-contain sm:col-start-auto lg:col-span-1'
              src='https://packschool.s3.amazonaws.com/3m.png'
              alt='3M'
              width={400}
              height={400}
            />
            <img
              className='col-span-2 col-start-2 max-h-28 w-full object-contain sm:col-start-auto lg:col-span-1'
              src='https://packschool.s3.amazonaws.com/colgate.png'
              alt='3M'
              width={400}
              height={400}
            />
            <img
              className='col-span-2 col-start-2 max-h-28 w-full object-contain sm:col-start-auto lg:col-span-1'
              src='https://packschool.s3.amazonaws.com/3m.png'
              alt='3M'
              width={400}
              height={400}
            />
            <img
              className='col-span-2 col-start-2 max-h-28 w-full object-contain sm:col-start-auto lg:col-span-1'
              src='https://packschool.s3.amazonaws.com/colgate.png'
              alt='3M'
              width={400}
              height={400}
            />
          </div>
          <div className='max-w-prose mx-auto mt-2 bg-gray-100 p-4 rounded-md'>
            <div className='text-center text-lg font-bold leading-snug'>
              Honored to be{' '}
              <span className='text-base-brand tracking-normal'>
                nominated and awarded in two categories for learning
                advancements{' '}
              </span>
              by our multi-year client,{' '}
              <a
                href='https://www.colgatepalmolive.com/en-us'
                target='_blank'
                rel='noreferrer'
              >
                Colgate.
              </a>
            </div>
          </div>
          <div className='mx-auto grid grid-cols-2 items-center gap-x-4 gap-y-10  sm:grid-cols-2 lg:mx-0'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <img
                className='col-span-2 max-h-36 w-full object-contain lg:col-span-1'
                src='https://packschool.s3.amazonaws.com/2023_L%26D+Silver.png'
                alt='Silver Brandon Hall Group Excellence Award'
                width={350}
                height={350}
              />
              <div className='text-sm text-center font-semibold'>
                Best Advance in Custom Content
              </div>
            </div>
            <div className='flex flex-col items-center gap-4'>
              <img
                className='col-span-2 max-h-36 w-full object-contain lg:col-span-1'
                src='https://packschool.s3.amazonaws.com/2023_L%26D+Bronze.png'
                alt='Bronze Brandon Hall Group Excellence Award'
                width={350}
                height={350}
              />
              <div className='text-sm font-semibold text-center'>
                Best Advance in Competencies and Skill Development
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className='w-full flex flex-col gap-6 relative'>
      <div className='w-full flex flex-col gap-5 mx-auto max-w-7xl'>
        <h2 className='h2-base text-center max-w-2xl mx-auto'>
          See How Packaging School Empowers Individuals and Teams.
        </h2>
        <div className='text-xl text-center max-w-5xl mx-auto text-slate-600'>
          Packaging School equips individuals and teams with expert‑led,
          real‑world packaging skills—from design and sustainability to
          supply‑chain efficiency and quality assurance.
        </div>
      </div>
      <div className='w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 border-t border-clemson pt-12'>
        <div className='w-full flex flex-col gap-4'>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`w-full border flex gap-1.5 p-6 items-center rounded-md ring-2 transition-all hover:bg-slate-100 cursor-pointer duration-300 ring-clemson ${
                active === index ? 'ring-clemson scale-105' : 'ring-transparent'
              }`}
            >
              <div
                className={`w-16 h-16 aspect-square rounded-full flex justify-center items-center ${
                  active === index ? 'bg-slate-200' : 'bg-transparent'
                }`}
              >
                <item.icon size={50} />
              </div>
              <div className='w-full flex flex-col gap-0.5'>
                <div className='text-lg font-bold'>{item.title}</div>
                <div className='text-slate-600 leading-snug'>
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full'>
          <AnimatePresence mode='wait'>
            {renderContent(items[active])}
          </AnimatePresence>
        </div>
      </div>
      <div className='w-full flex justify-center mt-5'>
        <div className='w-fit px-6 py-2 bg-clemson text-white text-xl  hover:bg-clemson-dark cursor-pointer font-bold rounded'>
          Schedule a Call with a Counselor
        </div>
      </div>
    </div>
  );
};

export default WhyPschool;
