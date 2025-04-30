const featuredTestimonial = {
  body: 'The CMPM program offers valuable insights into the latest packaging trends and processes.  It also provides an excellent framework for project management. I highly encourage anyone who is interested in taking their packaging knowledge to the next level to take this course.',
  author: {
    name: 'Clay Mitchell',
    handle: 'Category Manager, American Paper and Twine',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
};
const testimonials = [
  [
    [
      {
        body: 'The CMPM is a great program for both up-and-coming professionals curious to know more about packaging engineering as well as seasoned packaging professionals who are looking to do deeper dives and obtain additional knowledge; very fun, useful and engaging overall!',
        author: {
          name: 'Mario Barrios',
          handle: 'Senior Packaging Engineer, Colgate-Palmolive Company',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        body: 'At this point in my career, I was searching for an educational opportunity with the most comprehensive, data driven, and practical program and the CMPM offered that in droves. I was able to use my background to traverse other packaging disciplines and learn all new platforms I had interacted with but never had the chance to dive in. I recommend this program whether you’re just starting in packaging or even with several years under your belt.',
        author: {
          name: 'Adam Moffitt',
          handle: 'Business Development Manager, UPM Raflatac',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        body: 'This program met my expectations. In this program we are learning more in-depth compared to what we could learn in school and at a much more accelerated pace. For the price and going through the program, this program met my objective.',
        author: {
          name: 'Gavan Singh',
          handle: 'Packaging Eng and Logistic Coordinator Draexlmaier',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      // More testimonials...
    ],
  ],
  [
    [
      {
        body: 'I loved the fact that the CMPM program was an interactive online series that inspired my creativity and enabled my ability to use new tools to take back to Nissan North America, Inc. It allowed me to implement an effective and efficient packaging process to help not only me, but my colleagues in their everyday performance on the job.',
        author: {
          name: 'Lauren McDonald',
          handle: 'Packaging Specialist, Volkswagen Group of America, Inc.',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      // More testimonials...
    ],
    [
      {
        body: 'The CMPM is a very complete and inspiring program, its content  has contributed to reinforce my knowledge in key areas such as materials, production processes, and supply chain. This allowed me to keep growing as a packaging professional and will further contribute to strengthen my value proposition and packaging solutions to my customers.',
        author: {
          name: 'Carolina Aristizábal Molina',
          handle: 'Packaging Engineer, Smurfit Kappa',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      {
        body: 'The CMPM was a constructive overview of all things packaging! The coursework provided was informational and applicable to everyday practices within our organization; laying the groundwork for what it takes to launch a package.',
        author: {
          name: 'Garrett Patrick',
          handle: 'Packaging Engineer, Gorilla Glue',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      // More testimonials...
    ],
  ],
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HomeTestimonials() {
  return (
    <div className='relative isolate bg-white'>
      <div
        className='absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl'
        aria-hidden='true'
      >
        <div
          className='ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className='absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end'
        aria-hidden='true'
      >
        <div
          className='ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-xl text-center'>
          <h2 className='text-lg md:text-xl font-greycliff font-bold leading-8 tracking-tight text-base-mid'>
            Testimonials
          </h2>
          <p className='mt-2 text-3xl font-bold font-greycliff tracking-tight text-gray-900 sm:text-4xl'>
            Discover real success stories from the tens of thousands we&apos;ve
            empowered. Explore testimonials showcasing our impactful
            collaborations and achievements.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4'>
          <figure className='col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1'>
            <blockquote className='p-12 text-xl font-semibold leading-8 tracking-tight text-gray-900'>
              <p>{`“${featuredTestimonial.body}”`}</p>
            </blockquote>
            <figcaption className='flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4'>
              <div className='flex-auto'>
                <div className='font-semibold'>
                  {featuredTestimonial.author.name}
                </div>
                <div className='text-gray-600'>{`${featuredTestimonial.author.handle}`}</div>
              </div>
            </figcaption>
          </figure>
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className='space-y-8 xl:contents xl:space-y-0'
            >
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8'
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial.author.handle}
                      className='rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5'
                    >
                      <blockquote className='text-gray-900'>
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className='mt-6 flex items-center gap-x-4'>
                        <div>
                          <div className='font-semibold'>
                            {testimonial.author.name}
                          </div>
                          <div className='text-gray-600'>{`${testimonial.author.handle}`}</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
