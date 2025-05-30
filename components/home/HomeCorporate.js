const HomeCorporate = () => {
  return (
    <div className='w-full grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto'>
      <div className='w-full h-full '>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-5 px-5'>
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
              onClick={() =>
                window.open(
                  'https://calendar.app.google/qUZMKuFbF7NhpxgL8',
                  '_blank'
                )
              }
            >
              Schedule a Free Demo &rarr;
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
      <div className='w-full lg:col-span-2'>
        <div className='mx-auto max-w-7xl flex flex-col bg-base-brand/60 lg:!rounded-lg px-6 py-8 gap-5'>
          <h2 className='text-center text-white font-semibold text-xl'>
            Corporate Education Partners to the World&apos;s Most Innovative
            Teams
          </h2>
          <div className='mx-auto max-w-4xl grid grid-cols-6 items-center gap-x-16 lg:mx-0 overflow-hidden w-full'>
            <img
              className='col-span-2 max-h-28 w-full object-contain lg:col-span-1 p-1'
              src='https://packschool.s3.us-east-1.amazonaws.com/ul-black.png'
              alt='Unilever'
              width={400}
              height={400}
            />
            <img
              className='col-span-2 max-h-28 w-full object-contain lg:col-span-1 p-1'
              src='https://packschool.s3.us-east-1.amazonaws.com/cummins.png'
              alt='Cummins'
              width={400}
              height={400}
            />
            <img
              className='col-span-2 col-start-2 max-h-28 w-full object-contain sm:col-start-auto lg:col-span-1'
              src='https://packschool.s3.us-east-1.amazonaws.com/pda-new.png'
              alt='PDA'
              width={400}
              height={400}
            />
            <img
              className='col-span-2 max-h-28 w-full object-contain lg:col-span-1'
              src='https://packschool.s3.us-east-1.amazonaws.com/dvi-new.png'
              alt='DVI'
              width={400}
              height={400}
            />

            <img
              className='col-span-2 max-h-28 w-full object-contain sm:col-start-2 lg:col-span-1'
              src='https://packschool.s3.us-east-1.amazonaws.com/clemsonn.png'
              alt='Smurfit Westrock'
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCorporate;
