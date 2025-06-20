import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const AccordionSolutions = () => {
  const [open, setOpen] = useState(solutions[0].id);
  const imgSrc = solutions.find((s) => s.id === open)?.imgSrc;
  return (
    <section>
      <div className='w-full max-w-5xl mx-auto grid gap-8 grid-cols-1 lg:!grid-cols-[1fr_350px] overflow-hidden'>
        <div>
          <div className='flex flex-col gap-2'>
            {solutions.map((q) => {
              return (
                <Solution
                  {...q}
                  key={q.id}
                  open={open}
                  setOpen={setOpen}
                  index={q.id}
                />
              );
            })}
          </div>
        </div>
        <AnimatePresence mode='wait'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={imgSrc}
            className='bg-slate-300 rounded-2xl aspect-[4/3] lg:!aspect-auto lg:!h-full lg:!w-full border border-slate-300'
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: 'top left',
              backgroundSize: 'cover',
            }}
          />
        </AnimatePresence>
      </div>
    </section>
  );
};

const Solution = ({ title, description, index, open, setOpen }) => {
  const isOpen = index === open;

  return (
    <div
      onClick={() => setOpen(index)}
      className='p-0.5 rounded-lg relative overflow-hidden cursor-pointer'
    >
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? '148px' : '52px',
        }}
        className='py-3 px-5 rounded-[7px] bg-white flex flex-col justify-between relative z-20'
      >
        <div>
          <motion.p
            initial={false}
            animate={{
              color: isOpen ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)',
            }}
            className='text-xl font-medium w-fit bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text'
          >
            {title}
          </motion.p>
          <motion.p
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
            }}
            className='mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent'
          >
            {description}
          </motion.p>
        </div>
        <motion.button
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
          }}
          className='-ml-6 -mr-6 -mb-6 mt-4 py-2 rounded-b-md flex items-center justify-center gap-1 group transition-[gap] bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
        >
          {/* <span>Learn more</span>
          <FiArrowRight className='group-hover:translate-x-1 transition-transform' /> */}
        </motion.button>
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
        }}
        className='absolute inset-0 z-10 bg-gradient-to-r from-violet-600 to-indigo-600'
      />
      <div className='absolute inset-0 z-0 bg-slate-200' />
    </div>
  );
};

export default AccordionSolutions;

const solutions = [
  {
    id: 1,
    title: 'Your Enrollments',
    description:
      'Quick access to your active courses — pick up where you left off with ease. Stay organized and monitor your progress as you advance through each course.',
    imgSrc: 'https://packschool.s3.us-east-1.amazonaws.com/enrollments.gif',
  },
  {
    id: 2,
    title: 'Learning Paths',
    description:
      'Follow expert-curated pathways to deepen your skills and knowledge. Each path helps you build a comprehensive understanding of key topics, step by step.',
    imgSrc: 'https://packschool.s3.us-east-1.amazonaws.com/paths.gif',
    new: true,
  },
  {
    id: 3,
    title: 'Saved & Completed Lessons',
    description:
      'Bookmark key lessons to return to later, and easily revisit material you’ve already completed. Strengthen retention and refresh your knowledge anytime.',
    imgSrc: 'https://packschool.s3.us-east-1.amazonaws.com/lessons.gif',
    new: true,
  },
  {
    id: 4,
    title: 'Wishlist Courses',
    description:
      'Plan your next learning steps by saving courses of interest. Your wishlist keeps future opportunities at your fingertips when you’re ready to enroll.',
    imgSrc: 'https://packschool.s3.us-east-1.amazonaws.com/wishlist.gif',
  },
];
