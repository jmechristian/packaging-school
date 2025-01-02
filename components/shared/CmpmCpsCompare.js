import React, { useState } from 'react';
import { MdArrowDownward } from 'react-icons/md';

const data = {
  CMPM: {
    'Hosted By': "Clemson University's Center for Corporate Learning",
    Timeline:
      '3 months synchronous with additional 12 months access and PhD instructor coaching and review',
    Organization: 'PhD-led',
    Credits: '80 hours (8 credits)',
    'Instructor Access':
      'PhD led, feedback, coaching, oversight, and weekly office hours',
    Courses: [
      'Packaging Foundations',
      'Paperboard Cartons',
      'Corrugate Containers',
      'Glass Packaging',
      'Metal Packaging',
      'Polymers in Packaging',
      'Packaging Machinery',
      'Packaging Printing',
      'Package Distribution',
      'Packaging Regulations',
      'Sustainable Packaging',
      'Packaging Design Workflow',
      'Project Management',
      'Human Factors',
      'Package Development Plan Project',
    ],
  },
  CPS: {
    'Hosted By': 'The Packaging School',
    Timeline: 'Up to 12 months asynchronous',
    Organization: 'Self-paced',
    Credits: '60 hours (6 credits)',
    'Instructor Access':
      'Email access, completing one course a month is recommended',
    Courses: [
      'Packaging Foundations',
      'Paperboard Cartons',
      'Corrugate Containers',
      'Glass Packaging',
      'Metal Packaging',
      'Polymers in Packaging',
      'Packaging Machinery',
      'Packaging Printing',
      'Package Distribution',
      'Packaging Regulations',
      'Sustainable Packaging',
      'Packaging Design Workflow',
    ],
  },
};

const CmpmCpsCompare = () => {
  const allCourses = Array.from(
    new Set([...data.CMPM.Courses, ...data.CPS.Courses])
  );

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='container mx-auto'>
      <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse block md:!table mb-4'>
          <thead className='block md:!table-header-group'>
            <tr className='border border-neutral-300 md:!border-none block md:!table-row'>
              <th className='hidden bg-neutral-800 text-white px-2 py-3 font-semibold text-left md:!table-cell'></th>
              <th className='bg-neutral-800 text-white px-2 py-3 font-semibold text-left block md:!table-cell'>
                Certificate of Mastery In Packaging Management
              </th>
              <th className='bg-neutral-800 text-white px-2 py-3 font-semibold text-left block md:!table-cell'>
                Certificate of Packaging Science
              </th>
            </tr>
          </thead>
          <tbody className='block md:!table-row-group'>
            {Object.keys(data.CMPM)
              .filter((key) => key !== 'Courses')
              .map((key) => (
                <tr key={key} className='md:!table-row border-b border-black'>
                  <td className='px-2 py-3 text-neutral-800 font-semibold block md:!table-cell lg:min-w-[280px]'>
                    {key}
                  </td>
                  <td className='px-2 py-3 text-neutral-800 block md:!table-cell'>
                    <span className='md:hidden text-xs font-bold text-white mr-1.5 bg-black px-1.5 py-1'>
                      CMPM
                    </span>
                    {data.CMPM[key]}
                  </td>
                  <td className='px-2 py-3 text-neutral-800 block md:!table-cell'>
                    <span className='md:hidden text-xs font-bold text-white mr-1.5 bg-black px-1.5 py-1'>
                      CPS
                    </span>
                    {data.CPS[key]}
                  </td>
                </tr>
              ))}
            <tr className='bg-neutral-100 md:!border border-neutral-300 md:!border-none block md:!table-row'>
              <td className='px-2 py-3 text-neutral-800 block md:!table-cell border-y-2 border-y-black bg-neutral-200'>
                <strong>Courses</strong>
              </td>

              <td
                className='px-2 py-3 transition-all ease-in text-neutral-800 block md:!table-cell border-y-2 border-y-black bg-neutral-200'
                colSpan={2}
              >
                <div
                  className='flex justify-start items-center gap-1.5 w-fit'
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <strong className='text-center cursor-pointer w-full'>
                    {isExpanded ? 'Hide' : 'Show'} Comparison
                  </strong>
                  <div
                    className={`${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    } transition-all ease-linear`}
                  >
                    <MdArrowDownward color='black' size={18} />
                  </div>
                </div>
              </td>
            </tr>
            {isExpanded &&
              allCourses.map((course) => (
                <tr
                  key={course}
                  className='border border-neutral-300 md:!border-none block md:!table-row'
                >
                  <td className='px-2 py-4 text-neutral-800 block md:!table-cell border-y border-y-black'>
                    {course}
                  </td>
                  <td className='px-5 py-4 text-neutral-800 block md:!table-cell border-y border-y-black'>
                    <span className='md:hidden text-xs font-bold text-white mr-1.5 bg-black px-1.5 py-1'>
                      CMPM
                    </span>
                    {data.CMPM.Courses.includes(course) ? '✔️' : '✖'}
                  </td>
                  <td className='px-5 py-4 text-neutral-800 block md:!table-cell border-y border-y-black'>
                    <span className='md:hidden text-xs font-bold text-white mr-1.5 bg-black px-1.5 py-1'>
                      CPS
                    </span>
                    {data.CPS.Courses.includes(course) ? '✔️' : '✖'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CmpmCpsCompare;
