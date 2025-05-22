import React, { useState, useEffect } from 'react';
import { getPaths } from '../../helpers/api';
import PathItem from '../../components/shared/PathItem';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    getPaths().then((data) => {
      setPaths(data);
      console.log(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className='flex flex-col gap-8 mx-auto max-w-6xl py-20'>
      <div className='flex flex-col gap-3'>
        <h2 className='h2-base text-center'>Learning Paths</h2>
        <p className='text-center max-w-3xl mx-auto text-xl text-gray-600'>
          Empowering packaging professionals with curated pathways to innovate,
          excel, and transform your career.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5'>
        {paths
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((path) => (
            <PathItem key={path.id} path={path} />
          ))}
      </div>
    </div>
  );
};

export default Page;
