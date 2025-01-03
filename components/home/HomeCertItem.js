import React, { useState } from 'react';
import Link from 'next/link';
import CertIcon from '../icons/CertIcon';
import { AnimatePresence, motion } from 'framer-motion';

const HomeCertItem = ({ cert }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    (<div
      className='bg-slate-200 rounded-lg py-9 px-6 h-full cursor-pointer'
      key={1}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className='flex flex-col justify-between gap-4 h-full'>
        <div className='flex flex-col gap-4'>
          <motion.div
            initial={{ scale: 1 }}
            animate={isHover ? { scale: 1.1 } : { scale: 1 }}
            className={`w-20 h-20 rounded-full ${cert.background} flex items-center justify-center shadow-lg mb-4`}
          >
            <CertIcon className='w-10 h-10 stroke-white fill-transparent stroke-2' />
          </motion.div>
          <div className='font-semibold text-2xl font-greycliff'>
            {cert.name}
          </div>
          <div className='text-slate-600'>{cert.body}</div>
        </div>
        <div className='flex gap-4'>
          {cert.apply && (
            <Link href={cert.apply} legacyBehavior>
              <div
                className={`${
                  isHover ? 'bg-clemson-dark shadow-lg' : 'bg-clemson'
                } cursor-pointer text-white font-greycliff font-semibold rounded-lg p-2`}
              >
                {cert.enroll ? 'Enroll Now' : 'Apply Now'}
              </div>
            </Link>
          )}
          <Link href={cert.link} legacyBehavior>
            <div className='border cursor-pointer border-slate-600 text-slate-800 font-greycliff font-semibold rounded-lg p-2'>
              More Info
            </div>
          </Link>
        </div>
      </div>
    </div>)
  );
};

export default HomeCertItem;
