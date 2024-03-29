import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

import WiredCourseCard from '../shared/WiredCourseCard';

const CustomerOfferings = ({ featured, reference }) => {
  return (
    <motion.div className='px-0 lg:px-6 w-fit mx-auto grid gap-12 md:gap-6 lg:gap-16 md:grid-cols-2 lg:grid-cols-3 md:pb-10 my-9 overflow-hidden'>
      <WiredCourseCard
        id={'5fc017b2-2149-40d7-a6d2-272afad2c4e3'}
        reference={reference}
        external={true}
        link_text={'Select Topic'}
      />
      <WiredCourseCard
        id={'13c3013a-a246-4a02-b974-9d2e6c2254df'}
        reference={reference}
        external={true}
        link_text={'Select Topic'}
      />
    </motion.div>
  );
};

export default CustomerOfferings;
