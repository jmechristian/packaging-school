import { CheckIcon } from '@heroicons/react/20/solid';

const CertificationsPricing = ({
  pricing_features,
  price_full,
  price_monthly,
}) => {
  const tiers = [
    {
      name: 'Pay In Full',
      id: 'tier-hobby',
      href: '#',
      priceMonthly: price_full.toLocaleString(),
      description:
        'Modi dolorem expedita deleniti. Corporis iste qui inventore pariatur adipisci vitae.',
      features: pricing_features,
      callout: 'Most Savings!',
      monthly: false,
      background: 'bg-white dark:bg-slate-800',
    },
    {
      name: 'Flex Payments',
      id: 'tier-team',
      href: '#',
      priceMonthly: price_monthly,
      description:
        'Explicabo quo fugit vel facere ullam corrupti non dolores. Expedita eius sit sequi.',
      features: pricing_features,
      monthly: true,
      background: 'bg-slate-100 dark:bg-slate-900',
    },
  ];

  return (
    <div>
      <div className='mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-12'>
        <div className='mx-auto max-w-2xl sm:text-center'>
          <h2 className='font-greycliff text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl'>
            Flexible pricing
          </h2>
        </div>
        <div className='mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2'>
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-3xl ${
                tier.background
              } p-8 shadow-xl  ${
                !tier.monthly
                  ? 'ring-clemson ring-2'
                  : 'ring-gray-900/10 dark:ring-white/20 ring-1'
              } sm:p-10`}
            >
              <div>
                <div className='flex items-center justify-between gap-x-4'>
                  <h3 className='text-xl md:text-2xl font-greycliff font-semibold leading-8 dark:text-white text-slate-900'>
                    {tier.name}
                  </h3>
                  {tier.callout ? (
                    <p className='rounded-full bg-base-mid py-1 px-2.5 text-xs font-semibold leading-5 text-white'>
                      {tier.callout}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div className='mt-4 flex items-baseline gap-x-2'>
                  <span className='text-5xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    ${tier.priceMonthly}
                  </span>
                  {tier.monthly ? (
                    <span className='text-base font-semibold leading-7 text-gray-500 dark:text-white/60'>
                      /month
                    </span>
                  ) : null}
                </div>
                <ul
                  role='list'
                  className='mt-12 space-y-4 leading-6 text-gray-500 dark:text-white/60'
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className='flex gap-x-3 font-bold'>
                      <CheckIcon
                        className='h-6 w-5 flex-none text-clemson'
                        aria-hidden='true'
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className='mt-8 block rounded-md font-greycliff font-bold bg-clemson px-3.5 py-3.5 text-center text-lg leading-6 text-white shadow-sm hover:bg-clemson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clemson-dark'
              >
                Apply Today
              </a>
              <p className='text-center text-sm text-slate-500 dark:text-white/60 mt-6'>
                Not ready to commit? Try a{' '}
                <a href='#' className='font-bold'>
                  risk-free demo!
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsPricing;
