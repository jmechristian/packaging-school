import React, { useMemo } from 'react';
import Card from '../../../components/cards/Card';
import CardTwo from '../../../components/cards/CardTwo';
import CardThree from '../../../components/cards/CardThree';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const Page = () => {
  // const [isLegendaries, setIsLegendaries] = useState([
  //   'ff174f01-5f76-486c-8d7a-849d6d3ff914',
  //   '672c1d2b-ba6c-4e02-8c34-83e8c3e4f7b3',
  //   '2418801f-a352-4eae-a394-87a5c0c55f79',
  // ]);

  const { allCourses } = useSelector((state) => state.course_filter);

  const isLegendaries = useMemo(() => {
    return (
      allCourses &&
      allCourses.filter((c) => c.partOf && c.partOf.includes('CPS'))
    );
  }, [allCourses]);

  return (
    <div className='w-full h-full my-24 max-w-7xl mx-auto flex flex-col gap-16'>
      <div className='w-full flex justify-between items-center'>
        <div>
          <h1 className='text-4xl'>CPS Courses</h1>
        </div>
        <div className='flex gap-2 items-center'>
          <Image
            src={'https://packschool.s3.amazonaws.com/gold-diamon.png'}
            alt='legendary'
            width={51}
            height={46}
          />
          <div className='font-bold'>Legendaries</div>
        </div>
      </div>
      <div className='w-full h-full grid grid-cols-3 gap-10 border p-6'>
        {isLegendaries &&
          isLegendaries.map((l) => (
            <div className='flex justify-center items-center' key={l.id}>
              <CardThree id={l.id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
