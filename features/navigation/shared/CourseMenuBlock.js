import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSelectedFilter } from '../../all_courses/courseFilterSlice';
import {
  setMenuItem,
  setSelectedNav,
  closeMobileMenu,
} from '../navigationSlice';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import DropDownIconBlock from '../Header/MenuDropDowns/DropDownIconBlock';
import BusinessIcon from '../../../components/icons/BusinessIcon';
import DesignIcon from '../../../components/icons/DesignIcon';
import FoodIcon from '../../../components/icons/FoodIcon';
import IndustryIcon from '../../../components/icons/IndustryIcon';
import MaterialIcon from '../../../components/icons/MaterialIcon';
import SupplyIcon from '../../../components/icons/SupplyIcon';

const CourseMenuBlock = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const categoryClickHandler = (name, value) => {
    router.push('/all_courses');
    dispatch(setSelectedFilter({ name: name, value: value }));
    dispatch(closeMobileMenu());
    dispatch(setMenuItem());
    dispatch(setSelectedNav(null));
  };
  return (
    <>
      <DropDownIconBlock
        icon={<BusinessIcon style='h-6 w-6 stroke-slate-700 fill-slate-700' />}
        category='Business'
        value='business'
        desc='Optimize your sales ops and project management workflows'
        setFilter={categoryClickHandler}
      />
      <DropDownIconBlock
        icon={<DesignIcon style='h-6 w-6 stroke-slate-700 fill-slate-700' />}
        category='Design'
        value='design'
        desc='Design smarter with material best practices and human factors in mind'
        setFilter={categoryClickHandler}
      />
      <DropDownIconBlock
        icon={<FoodIcon style='h-6 w-6 stroke-slate-300 fill-slate-700' />}
        category='Food & Beverage'
        value='food'
        desc='Learn in partnership with the International Society of Beverage Technologists (ISBT).'
        setFilter={categoryClickHandler}
      />

      <DropDownIconBlock
        icon={<IndustryIcon style='h-7 w-7 stroke-slate-300 fill-slate-700' />}
        category='Industry'
        value='industry'
        desc='Industry specific courses designed to give you an edge against your competitors'
        setFilter={categoryClickHandler}
      />
      <DropDownIconBlock
        icon={<MaterialIcon style='h-6 w-6 stroke-slate-300 fill-slate-700' />}
        category='Materials'
        value='materials'
        desc='Master the building blocks of the packaging industry'
        setFilter={categoryClickHandler}
      />
      <DropDownIconBlock
        icon={<SupplyIcon style='h-6 w-6 fill-slate-700 stroke-slate-300' />}
        category='Supply Chain & Logistics'
        value='supply'
        desc='Optimize your logistics from hazmat packaging, regulations, distribution, and more.'
        setFilter={categoryClickHandler}
      />
      <div
        className='col-span-2 bg-slate-300 rounded-md'
        onClick={() => {
          categoryClickHandler('All', 'all');
        }}
      >
        <div className='flex justify-center gap-2 items-center py-3 px-8 cursor-pointer'>
          <div className='font-semibold'>Explore All Courses</div>
          <div>
            <ArrowLongRightIcon className='h-5 w-5 fill-slate-900 stroke-slate-900' />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseMenuBlock;
