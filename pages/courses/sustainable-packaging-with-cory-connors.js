import CourseMain from '../../components/courses/CourseMain';
import CCCourseMain from '../../components/courses/CCCourseMain';
import CourseBottom from '../../components/courses/CourseBottom';
import CoursePreview from '../../components/course-card/CoursePreview';
import { useSelector, useDispatch } from 'react-redux';
import { setPreviewClosed } from '../../features/all_courses/courseFilterSlice';
import CourseContentMenu from '../../components/courses/CourseContentMenu';
import { lMSCoursesBySlug } from '../../src/graphql/queries';
import { API } from 'aws-amplify';
import Meta from '../../components/shared/Meta';
import CCCourseBottom from '../../components/courses/CCCourseBottom';

const Page = ({ course }) => {
  const dispatch = useDispatch();
  const { preview } = useSelector((state) => state.course_filter);
  return (
    <>
      <Meta
        title={course && `Packaging School | ${course.title}`}
        description={course && course.subheadline}
        image='course && course.seoImage'
      />
      <div className='relative'>
        <CCCourseMain data={course} />
        <CCCourseBottom
          category={course && course.category}
          id={course && course.id}
        />
        {preview && (
          <CoursePreview close={() => dispatch(setPreviewClosed())} />
        )}
        <CourseContentMenu
          link={course && course.link}
          trialLink={`${course && course.link}?et=free_trial`}
        />
      </div>
    </>
  );
};

export default Page;

export async function getServerSideProps() {
  const res = await API.graphql({
    query: lMSCoursesBySlug,
    variables: { slug: 'sustainable-packaging-with-cory-connors' },
  });
  const course = res.data.lMSCoursesBySlug.items[0];

  return {
    props: { course },
  };
}
