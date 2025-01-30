import { Fragment, Suspense, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  MdLogin,
  MdVerifiedUser,
  MdAccountCircle,
  MdShoppingCart,
  MdOutlineShoppingCart,
  MdNotificationsNone,
  MdOutlineNotifications,
} from 'react-icons/md';

import Logo from '../../../components/layout/Logo';
import Link from 'next/link';
import CertMegaMenu from '../../../components/nav/CertMegaMenu';
import CertMegaCallout from '../../../components/nav/CertMegaCallout';
import { showSearch } from '../navigationSlice';
import { useDispatch } from 'react-redux';
import LogoSquare from '../../../components/layout/LogoSquare';
import { useRouter } from 'next/router';
import SalesBar from './SalesBar';
import LogoWhite from '../../../components/layout/LogoWhite';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HeaderNew() {
  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = router.asPath;

  const navigation = {
    categories: [
      {
        name: 'Certificates',
        body: <CertMegaMenu onClose={() => setOpen(false)} />,
        callout: <CertMegaCallout onClose={() => setOpen(false)} />,
      },
    ],
    pages: [
      { name: 'Certifications', href: '/certifications' },
      { name: 'Courses', href: '/all_courses' },
      { name: 'Lessons', href: '/lessons' },
      { name: 'About', href: '/about' },
      // { name: 'Campus Store', href: '#' },
    ],
  };

  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-40 lg:hidden'
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex max-h-screen'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative flex w-full h-full max-w-full flex-col justify-between overflow-y-scroll bg-base-brand dark:bg-dark-dark shadow-xl'>
                <div className='flex w-full justify-between p-4 mb-5'>
                  <Link href='/' legacyBehavior>
                    <div className=' w-44'>
                      <LogoWhite />
                    </div>
                  </Link>
                  <button
                    type='button'
                    className='-m-2 inline-flex items-center justify-center rounded-md p-2 text-white'
                    onClick={() => setOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-7 w-7' aria-hidden='true' />
                  </button>
                </div>

                {/* Links */}

                <div className='space-y-3 px-4 py-6'>
                  {navigation.pages.map((page) => (
                    <div
                      key={page.name}
                      className='flow-root'
                      onClick={() => setOpen(false)}
                    >
                      <Link
                        href={page.href}
                        className='-m-2 block p-2 h1-base text-white dark:text-white'
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className='space-y-2 text-white px-4 py-6'>
                  <div className='flow-root'>
                    <Link
                      href={'/partner-with-us'}
                      className='-m-2 block p-2 h3-base text-white'
                    >
                      Collaborate
                    </Link>
                  </div>
                  <div className='flow-root'>
                    <Link
                      href={'/faq'}
                      className='-m-2 block p-2 h3-base text-white'
                    >
                      FAQs
                    </Link>
                  </div>
                  <div className='flow-root'>
                    <Link
                      href={'/certificates'}
                      className='-m-2 block p-2 h3-base text-white'
                    >
                      Team Learning
                    </Link>
                  </div>
                </div>
                <div className='space-y-5 border-t-2 border-white bg-black text-neutral-400 px-4 py-6'>
                  <div className='flow-root'>
                    <a
                      href='https://learn.packagingschool.com'
                      target='_blank'
                      rel='noreferrer'
                      className='dark:text-white font-medium'
                    >
                      Go to My Learning Dashbooard
                    </a>
                  </div>
                  <div className='flow-root'>
                    <Link
                      href={
                        user
                          ? '/api/auth/logout'
                          : `/api/auth/login?returnTo=${currentPath}`
                      }
                      className='-m-2 block p-2 font-medium text-neutral-400'
                    >
                      {user ? 'Sign Out' : 'Sign In to Packagingschool.com'}
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <header className='relative'>
        <nav aria-label='Top' className='sticky top-0 z-50'>
          {/* Secondary navigation */}
          <div className='bg-white dark:bg-dark-mid'>
            <div className=''>
              <div className='border-b border-t lg:border-t-0 border-slate-400 dark:border-gray-700'>
                <div className='flex h-20 items-center justify-between px-4 md:px-8 xl:px-0 mx-auto max-w-7xl'>
                  {/* Logo (lg+) */}
                  <div className='hidden lg:flex lg:items-center'>
                    <Link href='/' legacyBehavior>
                      <div className='h-full w-44'>
                        <Logo />
                      </div>
                    </Link>
                  </div>

                  <div className='hidden h-full lg:flex'>
                    {/* Mega menus */}
                    <Popover.Group className='ml-8'>
                      <div className='flex h-full justify-center space-x-8'>
                        {navigation.pages.map((page) => (
                          <Link
                            passHref
                            href={page.href}
                            key={page.name}
                            className='flex items-center font-semibold font-greycliff text-slate-700 dark:hover:text-gray-500 hover:text-slate-800 dark:text-white/80'
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className='flex flex-1 items-center lg:hidden'>
                    <button
                      type='button'
                      className='rounded-md bg-white dark:bg-dark-mid p-2 text-slate-400 dark:text-white/40'
                      onClick={() => setOpen(true)}
                    >
                      <span className='sr-only'>Open menu</span>
                      <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                    </button>

                    {/* Search */}
                    <a
                      href='#'
                      className='ml-2 p-2 text-slate-400 hover:text-slate-500 dark:text-white/40'
                      onClick={() => dispatch(showSearch())}
                    >
                      <span className='sr-only'>Search</span>
                      <MagnifyingGlassIcon
                        className='h-6 w-6'
                        aria-hidden='true'
                      />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <Link href='/' className='lg:hidden'>
                    <span className='sr-only'>Packaging School</span>
                    <LogoSquare className='w-6 h-6' />
                  </Link>

                  <div className='flex flex-1 items-center justify-end'>
                    <div className='flex items-center lg:ml-8'>
                      <div className='flex space-x-5'>
                        <div className='hidden lg:flex'>
                          <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search...'
                            className='px-2 py-1.5 w-72 rounded-md border border-slate-300 dark:border-gray-700 bg-white dark:bg-dark-mid text-slate-700 dark:text-white/80 focus:ring-0 text-sm placeholder:text-sm'
                          />
                        </div>

                        <div className='flex items-center gap-1.5'>
                          <div
                            className='cursor-pointer hover:bg-slate-200 rounded-lg p-1 transition-all duration-300'
                            onClick={() => router.push(`/api/auth/login`)}
                          >
                            {user ? (
                              <div className='rounded-full ring-2 ring-clemson'>
                                <MdAccountCircle color='#6B7A8F' size={24} />
                              </div>
                            ) : (
                              <MdLogin color='#6B7A8F' size={24} />
                            )}
                          </div>
                          <div className='cursor-pointer hover:bg-slate-200 rounded-lg p-1 transition-all duration-300'>
                            <MdOutlineNotifications color='#6B7A8F' size={24} />
                          </div>
                          <div className='cursor-pointer hover:bg-slate-200 rounded-lg p-1 transition-all duration-300'>
                            <MdOutlineShoppingCart color='#6B7A8F' size={24} />
                          </div>
                        </div>
                      </div>

                      {/* <div className='flow-root'>
                        {darkMode ? (
                          <div
                            onClick={() => {
                              dispatch(setLight());
                              document.body.classList.remove('dark');
                            }}
                          >
                            <MoonIcon className='w-6 h-6 text-gray-400 group-hover:text-gray-500 dark:text-white/40 cursor-pointer' />
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              dispatch(setDark());
                              document.body.classList.add('dark');
                            }}
                          >
                            <LightBulbIcon
                              className='h-6 w-6 flex-shrink-0 text-gray-400 dark:text-white/40 group-hover:text-gray-500 cursor-pointer'
                              aria-hidden='true'
                            />
                          </div>
                        )}
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Top navigation */}
          <Suspense>
            <SalesBar />
          </Suspense>
        </nav>
      </header>
    </div>
  );
}
