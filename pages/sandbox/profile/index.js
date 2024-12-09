import React, { useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    fetch(`/api/get-student?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'success') {
          setStudent(data.data.items);
          console.log(data.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
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
    </div>
  );
};

export default Page;
