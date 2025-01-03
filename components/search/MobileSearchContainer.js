import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Configure,
} from 'react-instantsearch-hooks-web';
import Link from 'next/link';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { closeSearch } from '../../features/navigation/navigationSlice';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

function Hit({ hit }) {
  return (
    (<article className='w-full py-4 text-white my-3'>
      <div className='flex flex-col gap-3'>
        <div className='font-greycliff font-semibold text-base-brand text-lg leading-tight'>
          {hit.title}
        </div>
        <div className=' text-slate-300 text-sm line-clamp-3'>
          {hit.subheadline}
        </div>
        <Link
          href={`/courses/${hit.slug}`}
          className='text-white font-semibold bg-clemson rounded-lg py-1.5 px-3 text-sm w-fit'>
          
            View Course
          
        </Link>
      </div>
    </article>)
  );
}

const MobileSearchContainer = () => {
  const dispatch = useDispatch();
  return (
    <div className='fixed inset-0 flex justify-center items-between p-4 bg-black/60 backdrop-blur-sm z-[60]'>
      <div className='dark:bg-[#222] bg-white w-full h-full rounded-lg px-6 py-6 flex flex-col justify-between'>
        <InstantSearch searchClient={searchClient} indexName='COURSES'>
          <Configure hitsPerPage={3} />
          <div className='w-full flex flex-col justify-between'>
            <div className='flex items-start justify-between w-full'>
              <div className='flex gap-2 items-center mb-3'>
                <div>
                  <MagnifyingGlassIcon className='w-5 h-5 fill-white' />
                </div>
                <div className='font-semibold font-greycliff text-white text-2xl'>
                  Search
                </div>
              </div>
              <div onClick={() => dispatch(closeSearch())}>
                <XMarkIcon className='w-6 h-6 fill-white' />
              </div>
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-col gap-3 h-full'>
                <SearchBox
                  placeholder='What Do You Want To Learn?'
                  autoFocus
                  classNames={{
                    root: 'w-full',
                    input: 'w-full bg-[#383838] text-white rounded-lg',
                    submit: 'hidden',
                    submitIcon: 'hidden',
                    reset: 'hidden',
                  }}
                />
                <Hits hitComponent={Hit} classNames={{ list: 'divide-y' }} />
              </div>
            </div>
          </div>
          <Pagination
            classNames={{
              root: 'w-full',
              list: 'flex text-white gap-4 justify-center',
            }}
          />
        </InstantSearch>
      </div>
    </div>
  );
};

export default MobileSearchContainer;
