import React, { useState, useEffect } from 'react';
import { getCohorts } from '../../helpers/api';
import {
  MdAdd,
  MdGroup,
  MdRocket,
  MdEmojiObjects,
  Md3P,
  MdConnectWithoutContact,
  MdNetworkWifi,
  MdCellTower,
} from 'react-icons/md';
import CohortItem from '../../components/shared/CohortItem';
const Page = () => {
  const [cohorts, setCohorts] = useState([]);

  const content = [
    {
      id: 1,
      icon: <MdGroup color='white' size={24} />,
      title: 'Social Support and Networking',
      content:
        'Cohorts foster a sense of community among students. They provide opportunities for networking, collaboration, and peer support. Students can share experiences, ideas, and resources, enhancing their learning through discussions and group projects.',
    },
    {
      id: 2,
      icon: <MdRocket color='white' size={24} />,
      title: 'Consistency and Motivation',
      content:
        'Cohorts often follow a structured schedule or curriculum, creating a consistent learning environment. This structure helps students stay motivated and accountable, as they progress through the program together and can support each other in staying on track.',
    },
    {
      id: 3,
      icon: <MdEmojiObjects color='white' size={24} />,
      title: 'Enhanced Learning Experience',
      content:
        'Collaborative learning in cohorts promotes active engagement and deeper understanding of the material. Through peer interactions, students can gain different perspectives, clarify concepts, and reinforce their knowledge through teaching others.',
    },
    {
      id: 4,
      icon: <Md3P color='white' size={24} />,
      title: 'Personalized Learning',
      content:
        'While cohorts provide a group setting, they also allow for personalized learning experiences. Students can receive feedback tailored to their progress and needs, both from instructors and peers, which can accelerate learning and skill development.',
    },
    {
      id: 5,
      icon: <MdConnectWithoutContact color='white' size={24} />,
      title: 'Building Professional Relationships',
      content:
        'In professional and educational settings, cohorts often include individuals from diverse backgrounds and experiences. This diversity enriches discussions and exposes students to different viewpoints, preparing them for collaborative work in future careers.',
    },
    {
      id: 6,
      icon: <MdCellTower color='white' size={24} />,
      title: 'Long-Term Support and Alumni Networks',
      content:
        'Cohorts often continue to stay connected even after completing the program. This can lead to long-term professional relationships, mentorship opportunities, and access to alumni networks that support career advancement.',
    },
  ];

  useEffect(() => {
    const fetchCohorts = async () => {
      const cohorts = await getCohorts();
      setCohorts(cohorts);
    };
    fetchCohorts();
  }, []);

  return (
    <div className='w-full max-w-7xl mx-auto flex flex-col gap-6 py-16'>
      <div className='flex flex-col justify-center gap-5'>
        <h3 className='h3-base'>View Our Upcoming Cohorts</h3>
      </div>
      <div className='w-full grid grid-cols-12 gap-5'>
        <div className='col-span-8 border p-5 flex flex-col gap-3'>
          {cohorts.map((cohort) => (
            <CohortItem
              key={cohort.id}
              cohort={cohort}
              onSelectCohort={() => {}}
            />
          ))}
        </div>
        <div className='col-span-4 border p-5 bg-gray-100 flex flex-col gap-3'>
          <div className='h4-base'>Why Learn in a Cohort?</div>
          <div className='grid gap-3'>
            {content.map((it) => (
              <div
                className='w-full border-white bg-white border flex flex-col gap-2 p-4'
                key={it.id}
              >
                <div className='flex items-center gap-3'>
                  <div>
                    <div className='w-9 h-9 bg-clemson rounded-full flex items-center justify-center'>
                      {it.icon}
                    </div>
                  </div>
                  <div className='font-bold text-lg leading-tight text-base-brand'>
                    {it.title}
                  </div>
                </div>
                <div className='text-sm leading-snug tracking-normal dark:text-neutral-700'>
                  {it.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
