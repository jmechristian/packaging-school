const HomeCorporate = () => {
  return (
    <div className='w-full grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto'>
      <div className='w-full h-full '>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-5 px-7'>
            <div className=' text-lg tracking-wide font-oswald uppercase text-white font-medium bg-clemson px-3 py-1 rounded w-fit'>
              Reach Goals Faster
            </div>
            <div className=' h2-base'>
              Accelerate Team Growth in a Branded Learning Hub
            </div>
            <div className='text-xl'>
              Give your team access to a curated library of courses, wrapped in
              your branding, with full tracking and reporting. Add features like
              Learning of the Month to keep momentum high and progress
              measurable.
            </div>
            <div
              className='text-clemson text-xl underline font-semibold cursor-pointer hover:text-clemson/80 transition-all duration-300'
              onClick={() => router.push('/paths')}
            >
              Schedule a Demo &rarr;
            </div>
          </div>
        </div>
      </div>
      <div
        className='w-full h-full rounded-lg bg-cover bg-left bg-no-repeat aspect-[16/9]'
        style={{
          backgroundImage: `url(https://packschool.s3.us-east-1.amazonaws.com/lib-div-replace.png)`,
        }}
      ></div>
    </div>
  );
};

export default HomeCorporate;
