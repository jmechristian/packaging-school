import Link from 'next/link';
import clsx from 'clsx';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export const CERT_HERO_ID = 'cert-hero';

const CERTS = [
  {
    id: 'cmpm',
    label: 'Packaging Management',
    shortLabel: 'Management',
    href: '/certifications/get-to-know-cmpm',
    title: 'Certificate of Mastery in Packaging Management',
    badge: 'Premier',
  },
  {
    id: 'cps',
    label: 'Packaging Science',
    shortLabel: 'Science',
    href: '/certifications/get-to-know-cps',
    title: 'Certificate of Packaging Science',
  },
  {
    id: 'apc',
    label: 'Automotive',
    href: '/certifications/get-to-know-apc',
    title: 'Automotive Packaging Certificate',
  },
  {
    id: 'csp',
    label: 'Sustainability',
    href: '/certifications/get-to-know-csp',
    title: 'Certificate of Sustainable Packaging',
  },
  {
    id: 'food',
    label: 'Food',
    href: '/food-packaging',
    title: 'Food Packaging Certificate',
  },
];

function scrollToHero(e) {
  e.preventDefault();
  const el = document.getElementById(CERT_HERO_ID);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function CertLink({ cert, isActive, onNavigate, className, compact }) {
  const href = isActive ? `#${CERT_HERO_ID}` : cert.href;
  const label =
    compact && cert.shortLabel ? cert.shortLabel : cert.label;

  return (
    <Link
      href={href}
      title={cert.title}
      aria-current={isActive ? 'page' : undefined}
      onClick={(e) => {
        if (isActive) scrollToHero(e);
        onNavigate?.(e);
      }}
      className={className}
    >
      <span className='leading-none'>{label}</span>
      {cert.badge ? (
        <span
          className={clsx(
            'text-[10px] font-semibold uppercase leading-none tracking-wide',
            isActive
              ? 'text-clemson'
              : 'text-slate-400 group-hover:text-clemson',
          )}
        >
          · {cert.badge}
        </span>
      ) : null}
    </Link>
  );
}

/**
 * Subtle cross-cert context bar for certification landing pages.
 * Pass `active` as one of: cps | apc | csp | food | cmpm
 */
const CertContextNav = ({ active }) => {
  const current = CERTS.find((c) => c.id === active) || CERTS[0];

  return (
    <nav
      aria-label='Certificate programs'
      className='border-b border-slate-200/80 bg-slate-50/95 text-slate-600 dark:border-slate-700/80 dark:bg-dark-mid/90 dark:text-slate-300'
    >
      {/* Mobile — collapse to current cert */}
      <div className='md:hidden'>
        <Disclosure>
          {({ open, close }) => (
            <div>
              <Disclosure.Button className='flex w-full items-center justify-between gap-3 px-4 py-3 text-left'>
                <span className='flex min-w-0 items-center gap-2'>
                  <span className='shrink-0 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-slate-400 dark:text-slate-500'>
                    5 Certificates
                  </span>
                  <span
                    className='h-3 w-px shrink-0 bg-slate-300 dark:bg-slate-600'
                    aria-hidden='true'
                  />
                  <span className='truncate text-sm font-semibold leading-none text-slate-900 dark:text-white'>
                    {current.shortLabel || current.label}
                  </span>
                  {current.badge ? (
                    <span className='shrink-0 text-[10px] font-semibold uppercase leading-none tracking-wide text-clemson'>
                      · {current.badge}
                    </span>
                  ) : null}
                </span>
                <ChevronDownIcon
                  className={clsx(
                    'h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200',
                    open && 'rotate-180',
                  )}
                  aria-hidden='true'
                />
              </Disclosure.Button>

              <Transition
                enter='transition duration-150 ease-out'
                enterFrom='opacity-0 -translate-y-1'
                enterTo='opacity-100 translate-y-0'
                leave='transition duration-100 ease-in'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 -translate-y-1'
              >
                <Disclosure.Panel className='border-t border-slate-200/80 px-2 pb-2 dark:border-slate-700/80'>
                  <ul className='flex flex-col py-1'>
                    {CERTS.map((cert) => {
                      const isActive = active === cert.id;
                      return (
                        <li key={cert.id}>
                          <CertLink
                            cert={cert}
                            isActive={isActive}
                            compact
                            onNavigate={() => close()}
                            className={clsx(
                              'group flex w-full items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm leading-none transition',
                              isActive
                                ? 'bg-white font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200/80 dark:bg-dark-dark dark:text-white dark:ring-slate-600'
                                : 'font-medium text-slate-500 hover:bg-white/70 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-dark-dark/60 dark:hover:text-white',
                            )}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </div>

      {/* Desktop — full horizontal row */}
      <div className='mx-auto hidden max-w-7xl items-center justify-center gap-3 px-4 py-2.5 sm:px-6 md:flex lg:px-8'>
        <span className='shrink-0 self-center text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-slate-400 dark:text-slate-500'>
          5 Certificates
        </span>
        <div className='flex items-center gap-1' role='list'>
          {CERTS.map((cert) => {
            const isActive = active === cert.id;
            return (
              <div key={cert.id} role='listitem'>
                <CertLink
                  cert={cert}
                  isActive={isActive}
                  className={clsx(
                    'group relative inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm leading-none transition',
                    isActive
                      ? 'bg-white font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200/80 dark:bg-dark-dark dark:text-white dark:ring-slate-600'
                      : 'font-medium text-slate-500 hover:bg-white/70 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-dark-dark/60 dark:hover:text-white',
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default CertContextNav;
