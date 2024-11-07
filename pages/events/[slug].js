import React from 'react';
import Image from 'next/image';
import { getAllEvents, getEventBySlug } from '../../helpers/api';
import {
  MdCalendarMonth,
  MdLocationOn,
  MdPhotoLibrary,
  MdSlideshow,
} from 'react-icons/md';
import {
  DropDownSelect,
  ThumbnailGallery,
  BrutalButton,
} from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import APSPresentations from '../../components/shared/APSPresentations';
import APSImageGallery from '../../components/shared/APSImageGallery';
import { presentations } from '../../data/presentations';

const EventPage = ({ event }) => {
  const mappedImages =
    event &&
    event.photos.items.map((photo) => ({
      id: photo.id,
      src: photo.photo,
      caption: photo.caption || '',
      alt: photo.caption || '',
      uploadedBy: photo.uploadedBy || '',
      uploadedAt: photo.createdAt,
    }));

  return event ? (
    <div className='max-w-7xl mx-auto flex flex-col gap-16 lg:gap-20 py-10 md:py-20'>
      {/* HEADER */}
      <div className='grid md:grid-cols-2 gap-8'>
        <div className='grid content-center '>
          <Image src={event.hero} alt={event.title} width={800} height={600} />
        </div>
        <div className='flex flex-col gap-5 p-5 lg:p-10'>
          <h1 className='text-4xl md:text-5xl font-bold'>{event.title}</h1>
          <p className='text-lg md:text-xl leading-normal'>
            {event.description}
          </p>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <div>
                <MdCalendarMonth color='black' size={24} />
              </div>
              <span className='font-semibold '>{event.startDate}</span>
              <span className=''>-</span>
              <span className='font-semibold'>{event.endDate}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div>
                <MdLocationOn color='black' size={24} />
              </div>
              <span className='font-semibold '>{event.location}</span>
            </div>
          </div>
          <div className='flex gap-4'>
            <BrutalButton
              text='View Event Site'
              background='bg-clemson'
              link='https://www.autopacksummit.com'
              textColor='text-white'
            />
          </div>
        </div>
      </div>
      {/* MENU */}
      <div className='w-full flex justify-center md:hidden'>
        <DropDownSelect
          text='Navigate'
          backgroundColor='bg-black'
          links={[
            { text: 'Agenda', link: '#agenda', icon: MdCalendarMonth },
            { text: 'Photos', link: '#photos', icon: MdPhotoLibrary },
            {
              text: 'Presentations',
              link: '#presentations',
              icon: MdSlideshow,
            },
          ]}
        />
      </div>
      <div className='max-w-7xl mx-auto lg:px-0 grid grid-cols-4  w-fit divide-x divide-neutral-900 bg-neutral-900 py-3'>
        <div className='flex items-center justify-center gap-2 w-60'>
          <h2 className='text-sm uppercase font-bold text-brand-yellow'>
            Navigate
          </h2>
        </div>
        <div className='flex items-center gap-2'>
          <MdCalendarMonth color='white' size={24} />
          <h2 className='text-2xl font-semibold text-white'>Agenda</h2>
        </div>
        <div className='flex items-center gap-2'>
          <MdPhotoLibrary color='white' size={24} />
          <h2 className='text-2xl font-semibold text-white'>Photos</h2>
        </div>
        <div className='flex items-center gap-2'>
          <MdSlideshow color='white' size={24} />
          <h2 className='text-2xl font-semibold text-white'>Presentations</h2>
        </div>
      </div>
      {/* AGENDA */}
      <div id='agenda' className='flex flex-col gap-8 md:gap-10'>
        <div className='flex items-center gap-2'>
          <MdCalendarMonth color='black' size={24} />
          <h2 className='text-2xl md:text-3xl font-bold'>Agenda</h2>
        </div>
        <div className='grid w-full aspect-[4/3] border border-black'></div>
      </div>
      {/* PHOTOS */}
      <div id='photos'>
        <div className='flex flex-col gap-8 md:gap-10'>
          {/* <div className='flex items-center gap-2'>
            <MdPhotoLibrary color='black' size={24} />
            <h2 className='text-2xl md:text-3xl font-bold'>Gallery</h2>
          </div> */}
          <APSImageGallery images={mappedImages && mappedImages} />
        </div>
      </div>
      {/* PRESENTATIONS */}
      <div id='presentations'>
        <div className='flex flex-col gap-8 md:gap-10'>
          <APSPresentations presentations={presentations} />
        </div>
      </div>
      {/* CTA */}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const event = await getEventBySlug(slug);

  return { props: { event: event.items[0] }, revalidate: 10 };
}

export default EventPage;
