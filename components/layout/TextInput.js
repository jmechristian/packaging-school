import {
  BarsArrowUpIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid';

export default function TextInput() {
  return (
    <div>
      <label
        htmlFor='email'
        className='block sr-only text-sm font-medium leading-6 text-gray-900'
      >
        Search candidates
      </label>
      <div className='mt-2 flex rounded-md shadow-sm'>
        <div className='relative flex flex-grow items-stretch focus-within:z-10'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <MagnifyingGlassIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </div>
          <input
            type='text'
            name='search'
            id='search'
            className='block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            placeholder='What do you want to learn?'
          />
        </div>
        <button
          type='button'
          className='relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
        >
          <ChevronDownIcon
            className='-ml-0.5 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
          All
        </button>
      </div>
    </div>
  );
}
