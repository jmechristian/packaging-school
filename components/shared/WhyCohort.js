import React from 'react';
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

const WhyCohort = () => {
  return (
    <div className='max-w-7xl w-full bg-neutral-900'>
      <div className='p-8 flex flex-col gap-5'>
        <div className='text-white h2-base'>Why Learn in a Cohort?</div>
        <div className='grid lg:grid-cols-3 gap-5'>
          {content.map((it) => (
            <div
              className='w-full border-white bg-white border flex flex-col gap-3 p-6'
              key={it.id}
            >
              <div className='w-12 h-12 bg-clemson rounded-full flex items-center justify-center'>
                {it.icon}
              </div>
              <div className='h4-base text-base-brand'>{it.title}</div>
              <div className='text-sm leading-snug tracking-normal'>
                {it.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyCohort;
