import React, { useState, useEffect } from 'react';
import { getPaths } from '../../helpers/api';
import PathItem from '../../components/shared/PathItem';
import { motion } from 'framer-motion';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    getPaths().then((data) => {
      setPaths(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className='flex flex-col gap-8 mx-auto max-w-6xl py-16'>
      <div className='flex flex-col gap-3'>
        <h2 className='h2-base text-center'>Learning Paths</h2>
        <p className='text-center max-w-3xl mx-auto text-xl text-gray-600'>
          Empowering packaging professionals with curated pathways to innovate,
          excel, and transform your career.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5'>
        {loading ? (
          <div className='grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-10 mt-5 w-full md:!col-span-2 lg:!col-span-3'>
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className='flex flex-col gap-3 p-4 border border-gray-200 rounded-lg bg-white shadow animate-pulse'
              >
                <div className='w-full h-72 bg-gray-200 rounded-lg'></div>
                <div className='h-6 w-3/4 bg-gray-200 rounded'></div>
                <div className='space-y-2'>
                  <div className='h-4 w-full bg-gray-200 rounded'></div>
                  <div className='h-4 w-2/3 bg-gray-200 rounded'></div>
                </div>
                <div className='h-2 w-full bg-gray-200 rounded-full'></div>
              </div>
            ))}
          </div>
        ) : (
          paths
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((path, i) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <PathItem key={path.id} path={path} />
              </motion.div>
            ))
        )}
      </div>
    </div>
  );
};

export default Page;
