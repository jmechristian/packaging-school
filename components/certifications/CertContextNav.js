import Link from 'next/link';
import clsx from 'clsx';

export const CERT_HERO_ID = 'cert-hero';

const CERTS = [
  {
    id: 'cmpm',
    label: 'Packaging Management',
    href: '/certifications/get-to-know-cmpm',
    title: 'Certificate of Mastery in Packaging Management',
    badge: 'Premier',
  },
  {
    id: 'cps',
    label: 'Packaging Science',
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

/**
 * Subtle cross-cert context bar for certification landing pages.
 * Pass `active` as one of: cps | apc | csp | food | cmpm
 */
const CertContextNav = ({ active }) => {
  return (
    <nav
      aria-label='Certificate programs'
      className='border-b border-slate-200/80 bg-slate-50/95 text-slate-600 dark:border-slate-700/80 dark:bg-dark-mid/90 dark:text-slate-300'
    >
      <div className='mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8'>
        <span className='hidden shrink-0 self-center text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-slate-400 dark:text-slate-500 sm:inline'>
          5 Certificates
        </span>
        <div
          className='flex min-w-0 items-center gap-1 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
          role='list'
        >
          {CERTS.map((cert) => {
            const isActive = active === cert.id;
            const href = isActive ? `#${CERT_HERO_ID}` : cert.href;

            return (
              <Link
                key={cert.id}
                href={href}
                role='listitem'
                title={cert.title}
                aria-current={isActive ? 'page' : undefined}
                onClick={isActive ? scrollToHero : undefined}
                className={clsx(
                  'group relative inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm leading-none transition',
                  isActive
                    ? 'bg-white font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200/80 dark:bg-dark-dark dark:text-white dark:ring-slate-600'
                    : 'font-medium text-slate-500 hover:bg-white/70 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-dark-dark/60 dark:hover:text-white',
                )}
              >
                <span className='leading-none'>{cert.label}</span>
                {cert.badge ? (
                  <span
                    className={clsx(
                      'hidden text-[10px] font-semibold uppercase leading-none tracking-wide lg:inline',
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
          })}
        </div>
      </div>
    </nav>
  );
};

export default CertContextNav;
