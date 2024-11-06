export default function HomeLogos() {
  return (
    <div className='mx-auto max-w-7xl px-6 lg:px-8'>
      <h2 className='text-center text-xl font-bold text-gray-900 font-greycliff'>
        Trusted by the world’s most innovative teams
      </h2>
      <div className='mx-auto mt-10 grid grid-cols-4 items-center gap-x-4 gap-y-10  sm:grid-cols-3 lg:mx-0 '>
        <img
          className='col-span-2 max-h-28 w-full object-contain lg:col-span-1'
          src='https://packschool.s3.amazonaws.com/bmw.png'
          alt='BWM'
          width={400}
          height={400}
        />
        <img
          className='col-span-2 max-h-28 w-full object-contain lg:col-span-1'
          src='https://packschool.s3.amazonaws.com/starbucks-coffee-logo.png'
          alt='Starbucks'
          width={400}
          height={400}
        />
        <img
          className='col-span-2 max-h-28 w-full object-contain lg:col-span-1'
          src='https://packschool.s3.amazonaws.com/coke.png'
          alt='Coke'
          width={400}
          height={400}
        />
        <img
          className='col-span-2 max-h-28 w-full object-contain sm:col-start-2 lg:col-span-1'
          src='https://packschool.s3.us-east-1.amazonaws.com/sm-westrock.png'
          alt='Smurfit Westrock'
          width={400}
          height={400}
        />
        <img
          className='col-span-2 col-start-2 max-h-28 w-full object-contain sm:col-start-auto lg:col-span-1'
          src='https://packschool.s3.amazonaws.com/3m.png'
          alt='3M'
          width={400}
          height={400}
        />
        <img
          className='col-span-2 col-start-2 max-h-28 w-full object-contain sm:col-start-auto lg:col-span-1'
          src='https://packschool.s3.amazonaws.com/colgate.png'
          alt='3M'
          width={400}
          height={400}
        />
      </div>
      <div className='max-w-prose mx-auto'>
        <div className='text-center text-xl font-bold text-gray-900 font-greycliff mt-24'>
          Honored to be{' '}
          <span className='text-base-brand tracking-normal'>
            nominated and awarded in two categories for learning advancements{' '}
          </span>
          by our multi-year client,{' '}
          <a
            href='https://www.colgatepalmolive.com/en-us'
            target='_blank'
            rel='noreferrer'
          >
            Colgate.
          </a>
        </div>
      </div>
      <div className='mx-auto mt-12 grid grid-cols-2 items-center gap-x-4 gap-y-10  sm:grid-cols-2 lg:mx-0'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <img
            className='col-span-2 max-h-40 w-full object-contain lg:col-span-1'
            src='https://packschool.s3.amazonaws.com/2023_L%26D+Silver.png'
            alt='Silver Brandon Hall Group Excellence Award'
            width={400}
            height={400}
          />
          <div className='text-sm text-center font-semibold'>
            Best Advance in Custom Content
          </div>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <img
            className='col-span-2 max-h-40 w-full object-contain lg:col-span-1'
            src='https://packschool.s3.amazonaws.com/2023_L%26D+Bronze.png'
            alt='Bronze Brandon Hall Group Excellence Award'
            width={400}
            height={400}
          />
          <div className='text-sm font-semibold text-center'>
            Best Advance in Competencies and Skill Development
          </div>
        </div>
      </div>
    </div>
  );
}
