import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listTestimonials } from '../../src/graphql/queries';

const CourseTestimonials = () => {
  const [isTestimonials, setIsTestimonials] = useState([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const res = await API.graphql({ query: listTestimonials });
      if (res.data) {
        setIsTestimonials(
          res.data.listTestimonials.items.filter((t) =>
            t.tags.includes('Courses')
          )
        );
      }
    };
    getTestimonials();
  }, []);

  if (isTestimonials.length === 0) return null;

  const rowA = isTestimonials.slice(0, 4);
  const rowB = isTestimonials.slice(0, 4);

  return (
    <div className='relative overflow-hidden'>
      {/* Row 1 — scrolls left */}
      <div className='flex items-center mb-4'>
        <div className='flex animate-marquee'>
          <TestimonialList list={rowA} />
          <TestimonialList list={rowA} />
          <TestimonialList list={rowA} />
        </div>
      </div>
      {/* Row 2 — scrolls right */}
      <div className='flex items-center mb-2'>
        <div className='flex animate-marquee-reverse'>
          <TestimonialList list={rowB} />
          <TestimonialList list={rowB} />
          <TestimonialList list={rowB} />
        </div>
      </div>
    </div>
  );
};

const TestimonialList = ({ list }) => {
  return (
    <div className='flex gap-4 px-2 shrink-0'>
      {list.map((t) => (
        <div
          key={t.id}
          className='shrink-0 bg-white w-[500px] h-[275px] flex flex-col overflow-hidden justify-center items-start relative border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.20)]'
        >
          <div className='absolute right-2 top-2 z-20 w-full max-w-[33%] flex justify-end flex-wrap gap-1'>
            {t.tags.map((tag) => (
              <div
                className='border border-black p-1 text-xs uppercase'
                key={tag}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className='flex items-start gap-3 px-4 w-fit'>
            <div className='h-full'>
              <div
                className='aspect-[1/1] rounded-full bg-indigo-400 w-9 mx-auto bg-cover bg-center border-2 border-black'
                style={{
                  backgroundImage: `url(${
                    t.headshot ||
                    'https://packschool.s3.amazonaws.com/avatar_default.jpeg'
                  })`,
                }}
              />
            </div>
            <div className='flex w-full'>
              <div className='flex flex-col justify-center h-full'>
                <span className='block font-semibold leading-tight'>
                  {t.author}
                </span>
                <span className='block text-sm font-medium text-neutral-600'>
                  {t.title}, {t.company}
                </span>
              </div>
            </div>
          </div>
          <div className='px-4 mt-2'>
            <span className='block leading-snug text-sm'>{t.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseTestimonials;
