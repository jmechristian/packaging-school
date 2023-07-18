import CourseMain from '../../components/courses/CourseMain';
import CourseBottom from '../../components/courses/CourseBottom';
import CoursePreview from '../../components/course-card/CoursePreview';
import { useSelector, useDispatch } from 'react-redux';
import { setPreviewClosed } from '../../features/all_courses/courseFilterSlice';
import CourseContentMenu from '../../components/courses/CourseContentMenu';
import { lMSCoursesBySlug, listLMSCourses } from '../../src/graphql/queries';
import { API } from 'aws-amplify';

const Page = ({ course }) => {
  const dispatch = useDispatch();
  const { preview } = useSelector((state) => state.course_filter);
  return (
    <div className='relative'>
      <CourseMain data={course} />
      <CourseBottom
        category={course && course.category}
        id={course && course.id}
      />
      {preview && <CoursePreview close={() => dispatch(setPreviewClosed())} />}
      <CourseContentMenu
        link={course && course.link}
        trialLink={`${course && course.link}?et=free_trial`}
      />
    </div>
  );
};

export default Page;

export async function getStaticPaths() {
  const res = await API.graphql({
    query: listLMSCourses,
    variables: { filter: { collection: { contains: 'null' } } },
  });
  const paths = res.data.listLMSCourses.items.map((course) => ({
    params: { uid: course.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const slug = params.uid;
  const res = await API.graphql({
    query: lMSCoursesBySlug,
    variables: { slug: slug },
  });
  const course = res.data.lMSCoursesBySlug.items[0];

  return {
    props: { course },
  };
}
