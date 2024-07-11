import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  RocketLaunchIcon,
  SignalIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

import WiredCourseCard from '../shared/WiredCourseCard';

const SPCLibraryModule = ({ featured, reference, path }) => {
  return (
    <motion.div className='px-0 lg:px-6 w-fit mx-auto grid gap-12 md:gap-6 lg:gap-16 md:grid-cols-2 lg:grid-cols-3 md:pb-10 py-9'>
      <WiredCourseCard
        id={'5fc017b2-2149-40d7-a6d2-272afad2c4e3'}
        reference={reference}
        link_text={'Select Topic'}
      />
      <WiredCourseCard
        id={'13c3013a-a246-4a02-b974-9d2e6c2254df'}
        reference={reference}
        link_text={'Select Topic'}
      />
      <WiredCourseCard
        id={'02a237f0-3709-4c3a-8e02-47e04d8f1977'}
        reference={reference}
        link_text={'Select Topic'}
      />
      <WiredCourseCard
        id={'b8a62fef-5d63-4730-8cb5-0e0a9aec7486'}
        reference={reference}
        external={true}
        link_text={'Select Topic'}
      />
      <WiredCourseCard
        id={'4f1fdc1d-2a88-4ac3-9bd6-4b46a7b6ae08'}
        reference={reference}
        external={true}
        link_text={'Select Topic'}
      />
      <WiredCourseCard
        id={'8bc8c4ff-6c1d-40cd-9a2e-e9a71e826fa8'}
        reference={reference}
        external={true}
        link_text={'Select Topic'}
      />
      <WiredCourseCard
        id={'83b10e68-0bb0-44e6-a746-cfca4cbbe56e'}
        reference={reference}
        external={true}
        link_text={'Select Topic'}
      />
      <WiredCourseCard
        id={'e0dcbb7d-5a5a-4e36-a907-772a60766ccd'}
        reference={reference}
        external={true}
        link_text={'Select Topic'}
      />
    </motion.div>
  );
};

export default SPCLibraryModule;
