import Link from 'next/link';

const TestimonialsCallout = () => {
  return (
    <section className='relative overflow-hidden bg-base-dark'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none font-greycliff text-[14rem] leading-none text-white/10 sm:text-[18rem]'
      >
        “
      </div>
      <div className='relative mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
          <div className='max-w-3xl'>
            <p className='text-sm font-bold uppercase tracking-widest text-base-light font-greycliff'>
              Student Stories
            </p>
            <h2 className='mt-3 text-3xl font-bold font-greycliff tracking-tight text-white sm:text-4xl lg:text-5xl'>
              See what our students say about Packaging School
            </h2>
            <p className='mt-4 text-lg leading-8 text-gray-300'>
              Hear from packaging professionals at brands, suppliers, and
              manufacturers who have put their learning to work. Real stories
              from the tens of thousands we have empowered.
            </p>
          </div>
          <Link
            href='/testimonials'
            className='inline-flex shrink-0 items-center justify-center bg-clemson px-6 py-3.5 text-center text-base font-bold font-greycliff text-white hover:bg-clemson/80 sm:text-xl'
          >
            Read Testimonials
            <span aria-hidden='true' className='ml-2'>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCallout;
