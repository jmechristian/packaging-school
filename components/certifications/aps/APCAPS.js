import APSLogo from '../../shared/APSLogo';

export default function APCAPS() {
  return (
    <div className='overflow-hidden'>
      <div className='mx-auto max-w-7xl px-6 lg:flex lg:px-8'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8'>
          <div className='lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8'>
            <div className='w-56 lg:w-72 h-auto mb-6'>
              <APSLogo />
            </div>

            {/* <p className='mt-6 text-xl lg:text-2xl font-semibold  text-base-mid whitespace-pre-wrap'>
              October 21-23rd, 2024
              <br /> Hyatt Regency,{'\n'}Greenville SC
            </p> */}
            <p className='mt-6 text-xl text-gray-600 dark:text-gray-500'>
              The premier open forum for OEMs, Tier 1 Part Suppliers and
              Packaging Solution Providers to discuss packaging innovations and
              challenges. Since 2017, we’ve helped gather knowledge leaders for
              a unique event called the Automotive Packaging Summit. Over 250
              automotive packaging professionals from OEMs, Tier 1 part
              suppliers, and packaging solution providers have gathered in South
              Carolina to discuss common industry hurdles and solutions.
            </p>
            <div className='mt-10 flex'>
              <a
                href='https://autopacksummit.com'
                className='rounded-md bg-clemson px-3.5 py-3 text-lg font-semibold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Visit Website <span aria-hidden='true'>&rarr;</span>
              </a>
            </div>
          </div>
          <div className='flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents'>
            <div className='w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end'>
              <img
                src='https://apsmedia.s3.amazonaws.com/images/IMG_5975.webp'
                alt=''
                className='aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover'
              />
            </div>
            <div className='contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8'>
              <div className='order-first flex w-64 flex-none justify-end self-end lg:w-auto'>
                <img
                  src='https://apsmedia.s3.amazonaws.com/images/IMG_2020.webp'
                  alt=''
                  className='aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover'
                />
              </div>
              <div className='flex w-96 flex-auto justify-end lg:w-auto lg:flex-none'>
                <img
                  src='https://apsmedia.s3.amazonaws.com/images/IMG_5966.webp'
                  alt=''
                  className='aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover'
                />
              </div>
              <div className='hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none'>
                <img
                  src='https://apsmedia.s3.amazonaws.com/images/IMG_3545.webp'
                  alt=''
                  className='aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
