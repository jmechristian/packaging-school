import React, { useState, useEffect } from 'react';
// import { getCohorts } from '../../lib/api';

const Page = () => {
  //   const [cohorts, setCohorts] = useState([]);

  //   useEffect(() => {
  //     const fetchCohorts = async () => {
  //       const cohorts = await getCohorts();
  //       setCohorts(cohorts);
  //     };
  //     fetchCohorts();
  //   }, []);

  return (
    <div className='w-full max-w-7xl mx-auto flex flex-col gap-12'>
      <div className='flex flex-col items-center justify-center gap-5 mx-auto max-w-4xl'>
        <h3 className='h3-base'>Comprehensive Certificate Cohorts</h3>
      </div>
    </div>
  );
};

export default Page;
