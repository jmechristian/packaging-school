import React, { useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [student, setStudent] = useState(null);
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    fetch(`/api/get-student?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'success') {
          setStudent(data.data.items);
          setPath(
            data.data.items
              .filter((course) => course.course_name.includes('CPS-'))
              .sort((a, b) => a.course_name.localeCompare(b.course_name))
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const calculateAveragePercentage = () => {
    if (!path || path.length === 0) return 0;
    const total = path.reduce((acc, course) => {
      // Ensure percentage_completed is a valid number
      const percentage = Number(course.percentage_completed);
      return acc + (isNaN(percentage) ? 0 : percentage);
    }, 0);
    return (total / path.length) * 100; // Convert to percentage
  };

  return (
    <div className='flex flex-col gap-5 max-w-7xl mx-auto py-16'>
      <div className='flex flex-row w-full'>
        <input
          type='email'
          placeholder='Enter student email'
          className='mr-2 w-1/2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2'
          onClick={handleSubmit}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
      <div className='mt-2'>
        {student ? (
          <div className='flex flex-col gap-10 w-full border border-gray-200 p-10'>
            <div className='flex text-xl flex-row gap-5 mb-4 border-b border-gray-200 pb-4'>
              <div>{student[0].user_name}</div>
              <div>{student[0].user_email}</div>
            </div>
            <div className='grid grid-flow-row gap-5'>
              {student
                .sort((a, b) => b.percentage_completed - a.percentage_completed)
                .map((course) => (
                  <div
                    className='flex flex-row gap-2 justify-between'
                    key={course.id}
                  >
                    <div className='font-semibold leading-none w-1/2'>
                      {course.course_name}
                    </div>
                    <div className='w-1/4 bg-gray-200 rounded overflow-hidden mt-2'>
                      <div
                        className='bg-blue-500 text-white text-center rounded h-full'
                        style={{
                          width: `${course.percentage_completed * 100}%`,
                        }}
                      >
                        {course.percentage_completed * 100}%
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div>No student found</div>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-xl font-semibold'>Path to Success</div>
          <div className='text-sm text-gray-500'>
            {calculateAveragePercentage().toFixed(2)}%
          </div>
        </div>
        <div className='grid grid-flow-col'>
          {path &&
            path.map((course) => (
              <div
                className={`flex flex-row gap-2 border border-gray-200 p-2 ${
                  course.percentage_completed > 0.75
                    ? 'bg-green-200'
                    : course.percentage_completed > 0.5
                    ? 'bg-yellow-200'
                    : 'bg-red-200'
                }`}
                key={course.id}
              >
                <div key={course.id}>
                  <div className='font-semibold text-xs leading-tight'>
                    {course.course_name}
                  </div>
                  <div className='text-sm text-gray-500'>
                    {Math.floor(course.percentage_completed * 100)}%
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
