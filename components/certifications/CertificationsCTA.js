import React from 'react';

const CertificationsCTA = ({ darkMode }) => {
  return (
    // <div className='relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8'>
    //   {darkMode ? (
    //     <>
    //       <svg
    //         className='absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
    //         aria-hidden='true'
    //       >
    //         <defs>
    //           <pattern
    //             id='1d4240dd-898f-445f-932d-e2872fd12de3'
    //             width={200}
    //             height={200}
    //             x='50%'
    //             y={0}
    //             patternUnits='userSpaceOnUse'
    //           >
    //             <path d='M.5 200V.5H200' fill='none' />
    //           </pattern>
    //         </defs>
    //         <svg x='50%' y={0} className='overflow-visible fill-gray-800/20'>
    //           <path
    //             d='M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z'
    //             strokeWidth={0}
    //           />
    //         </svg>
    //         <rect
    //           width='100%'
    //           height='100%'
    //           strokeWidth={0}
    //           fill='url(#1d4240dd-898f-445f-932d-e2872fd12de3)'
    //         />
    //       </svg>
    //       <div className='absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl'>
    //         <svg
    //           viewBox='0 0 1108 632'
    //           aria-hidden='true'
    //           className='w-[69.25rem] flex-none'
    //         >
    //           <path
    //             fill='url(#175c433f-44f6-4d59-93f0-c5c51ad5566d)'
    //             fillOpacity='.2'
    //             d='M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z'
    //           />
    //           <defs>
    //             <linearGradient
    //               id='175c433f-44f6-4d59-93f0-c5c51ad5566d'
    //               x1='1220.59'
    //               x2='-85.053'
    //               y1='432.766'
    //               y2='638.714'
    //               gradientUnits='userSpaceOnUse'
    //             >
    //               <stop stopColor='#4F46E5' />
    //               <stop offset={1} stopColor='#80CAFF' />
    //             </linearGradient>
    //           </defs>
    //         </svg>
    //       </div>
    //     </>
    //   ) : (
    //     <>
    //       <svg
    //         className='absolute inset-0 -z-10 hidden h-full w-full stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] sm:block'
    //         aria-hidden='true'
    //       >
    //         <defs>
    //           <pattern
    //             id='55d3d46d-692e-45f2-becd-d8bdc9344f45'
    //             width={200}
    //             height={200}
    //             x='50%'
    //             y={0}
    //             patternUnits='userSpaceOnUse'
    //           >
    //             <path d='M.5 200V.5H200' fill='none' />
    //           </pattern>
    //         </defs>
    //         <svg x='50%' y={0} className='overflow-visible fill-gray-50'>
    //           <path
    //             d='M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z'
    //             strokeWidth={0}
    //           />
    //         </svg>
    //         <rect
    //           width='100%'
    //           height='100%'
    //           strokeWidth={0}
    //           fill='url(#55d3d46d-692e-45f2-becd-d8bdc9344f45)'
    //         />
    //       </svg>
    //       <div className='relative'>
    //         <div className='absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl'>
    //           <svg
    //             viewBox='0 0 1313 771'
    //             aria-hidden='true'
    //             className='ml-[max(50%,38rem)] w-[82.0625rem]'
    //           >
    //             <path
    //               id='bc169a03-3518-42d4-ab1e-d3eadac65edc'
    //               fill='url(#85a0eca5-25f1-4ab9-af84-4e2d8d9cdbf3)'
    //               d='M360.508 589.796 231.671 770.522 0 498.159l360.508 91.637 232.034-325.485c1.485 150.396 51.235 393.965 238.354 165.069C1064.79 143.261 1002.42-107.094 1171.72 46.97c135.44 123.252 148.51 335.641 138.11 426.428L971.677 339.803l24.062 411.461-635.231-161.468Z'
    //             />
    //             <defs>
    //               <linearGradient
    //                 id='85a0eca5-25f1-4ab9-af84-4e2d8d9cdbf3'
    //                 x1='1313.17'
    //                 x2='-88.881'
    //                 y1='.201'
    //                 y2='539.417'
    //                 gradientUnits='userSpaceOnUse'
    //               >
    //                 <stop stopColor='#9089FC' />
    //                 <stop offset={1} stopColor='#FF80B5' />
    //               </linearGradient>
    //             </defs>
    //           </svg>
    //         </div>
    //       </div>
    //     </>
    //   )}

    //   <div className='mx-auto max-w-2xl text-center'>
    //     <h2 className='text-3xl font-bold tracking-tight dark:text-white sm:text-5xl'>
    //       Boost your productivity.
    //       <br />
    //       Start using our app today.
    //     </h2>
    //     <p className='mx-auto mt-6 max-w-xl text-lg lg:text-lg lg:leading-9 leading-8 text-slate-500 dark:text-slate-500 dark:text-gray-300'>
    //       Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim
    //       id veniam aliqua proident excepteur commodo do ea.
    //     </p>
    //     <div className='mt-10 flex items-center justify-center gap-x-6'>
    //       <a
    //         href='#'
    //         className='rounded-md bg-clemson-dark px-3.5 py-2.5 text-lg font-semibold text-white/90 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    //       >
    //         Get started
    //       </a>
    //       <a
    //         href='#'
    //         className='text-lg font-semibold leading-6 dark:text-white'
    //       >
    //         Connect to Learn More <span aria-hidden='true'>→</span>
    //       </a>
    //     </div>
    //   </div>
    // </div>
    (<div className='bg-gradient-to-tr from-clemson via-base-dark to-base-brand mt-16'>
      <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8'>
        <h2 className='text-3xl font-bold font-greycliff tracking-tight text-white sm:text-5xl'>
          Ready to dive in?
          <br />
          Try a course, risk-free.
        </h2>
        <div className='mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0'>
          <a
            href='#'
            className='rounded-md bg-clemson px-5 py-4 text-sm md:text-xl font-semibold text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Get Started For Free
          </a>
          <a
            href='#'
            className='text-sm md:text-lg font-semibold leading-6 text-white'
          >
            Explore Careers <span aria-hidden='true'>→</span>
          </a>
        </div>
      </div>
    </div>)
  );
};

export default CertificationsCTA;
