'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Stats from '../../../components/partners/Stats';
import CourseClicksTable from '../../../components/partners/CourseClicksTable';
import LandingPageStats from '../../../components/partners/LandingPageStats';
import {
  getPartnerById,
  getPartnerCourseClicks,
  calculateClickStats,
} from '../../../helpers/api';

const Page = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [courseClicks, setCourseClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(id);
    const fetchPartner = async () => {
      const data = await getPartnerById(id);
      console.log(data);
      setPartner(data);
      const courseClicks = await getPartnerCourseClicks(
        '62fe0081-a7e4-4eff-bc36-9fa07786c91f'
      );

      setCourseClicks(courseClicks);
      setLoading(false);
    };
    fetchPartner();
  }, [id]);

  const clickStats = useMemo(() => {
    return calculateClickStats(courseClicks);
  }, [courseClicks]);

  return (
    <div className='flex flex-col gap-8 w-full max-w-7xl mx-auto py-10'>
      <div className='w-full justify-between flex items-center'>
        <div className='w-full space-y-8'>
          {/* Google Analytics Landing Page Stats */}
          {partner && (
            <LandingPageStats
              pagePath={`/courses/introduction-to-corrugated-design`}
              title={'Introduction to Corrugated Design'}
              loading={loading}
            />
          )}
        </div>
      </div>
      {partner &&
        partner.courses.items.map((course) => (
          <Stats
            key={course.id}
            title={'Introduction to Corrugated Design'}
            clickStats={clickStats}
            loading={loading}
          />
        ))}
      {partner && partner.courses.items.length > 0 && (
        <>
          <CourseClicksTable courseClicks={courseClicks} loading={loading} />
        </>
      )}
    </div>
  );
};

export default Page;
