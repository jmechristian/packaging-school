import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Stats from '../../../components/partners/Stats';
import CourseClicksTable from '../../../components/partners/CourseClicksTable';
import LandingPageStats from '../../../components/partners/LandingPageStats';
import {
  getPartnerById,
  getPartnerCourseClicks,
  calculateClickStats,
} from '../../../helpers/api';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [partner, setPartner] = useState(null);
  const [courseClicks, setCourseClicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const data = await getPartnerById(
          '62fe0081-a7e4-4eff-bc36-9fa07786c91f'
        );
        console.log('Partner data:', data);
        setPartner(data);

        const courseClicks = await getPartnerCourseClicks(
          '62fe0081-a7e4-4eff-bc36-9fa07786c91f'
        );
        console.log('Course clicks:', courseClicks);

        setCourseClicks(courseClicks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPartner();
  }, []);

  const clickStats = useMemo(() => {
    return calculateClickStats(courseClicks);
  }, [courseClicks]);

  console.log('Render state:', {
    partner,
    loading,
    courseClicks: courseClicks.length,
  });

  return (
    <div className='flex flex-col gap-8 w-full max-w-7xl mx-auto py-10'>
      <div className='w-full justify-between flex items-center'>
        <div className='w-full space-y-8'>
          {/* Google Analytics Landing Page Stats */}
          <LandingPageStats
            pagePath={`/courses/introduction-to-corrugated-design`}
            title={'Introduction to Corrugated Design'}
            loading={loading}
          />
        </div>
      </div>
      <Stats
        title={'Introduction to Corrugated Design'}
        clickStats={clickStats}
        loading={loading}
      />
      <CourseClicksTable courseClicks={courseClicks} loading={loading} />
    </div>
  );
};

export default Page;
