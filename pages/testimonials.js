import React, { useEffect, useState } from 'react';
import HomeTestimonials from '../components/home/HomeTestimonials';
import Meta from '../components/shared/Meta';
import { getAllTestimonials } from '../helpers/api';

const Page = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const testimonials = await getAllTestimonials();
      setTestimonials(testimonials);
    };
    fetchTestimonials();
  }, []);

  return (
    <>
      <Meta
        title={'Packaging School Testimonials'}
        description={
          "Discover real success stories from the tens of thousands we've empowered. Explore testimonials showcasing our impactful collaborations and achievements."
        }
      />
      <div className='py-16'>
        <HomeTestimonials testimonials={testimonials} />
      </div>
    </>
  );
};

export default Page;
