import CourseMain from '../../components/courses/CourseMain';
import CourseBottom from '../../components/courses/CourseBottom';
import CoursePreview from '../../components/course-card/CoursePreview';
import { useSelector, useDispatch } from 'react-redux';
import { setPreviewClosed } from '../../features/all_courses/courseFilterSlice';
import CourseContentMenu from '../../components/courses/CourseContentMenu';
import { lMSCoursesBySlug, listLMSCourses } from '../../src/graphql/queries';
import { API } from 'aws-amplify';
import Meta from '../../components/shared/Meta';
import { buildCourseJsonLd } from '../../libs/seo/courseJsonLd';
import { generateMetadata } from '../../libs/seo/generateMetadata';

const Page = ({ course }) => {
  const dispatch = useDispatch();
  const { preview } = useSelector((state) => state.course_filter);
  const { location } = useSelector((state) => state.auth);

  // Use a stable base URL during SSR/SSG so OG tags are absolute and consistent.
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';

  const courseJsonLd = course ? buildCourseJsonLd(course, siteUrl) : null;
  const courseUrl = course?.slug ? `/courses/${course.slug}` : null;

  const metadata = course
    ? generateMetadata({
        pageType: 'COURSE',
        data: course,
        pathname: courseUrl,
      })
    : generateMetadata({ pageType: 'STATIC', pathname: '/courses' });

  if (!course) {
    return (
      <>
        <Meta title={metadata.title} description={metadata.description} url='/courses' />
        <div className='relative py-16' />
      </>
    );
  }
  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        image={course.seoImage}
        url={courseUrl}
        type='website'
        course={courseJsonLd?.course}
        breadcrumb={courseJsonLd?.breadcrumb}
      />
      <div className='relative py-16'>
        <CourseMain
          data={course}
          location={location}
          next={course.link}
          format='COURSE'
        />
        <CourseBottom
          category={course && course.categoryArray}
          id={course && course.id}
        />
        {preview && (
          <CoursePreview close={() => dispatch(setPreviewClosed())} />
        )}
        {/* {course && course.type != 'PREVIEW' && (
          <CourseContentMenu
            link={course && course.link}
            trialLink={`${course && course.link}?et=free_trial`}
          />
        )} */}
      </div>
    </>
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

  // Important for social scrapers + SSG stability: don't serve a "fallback shell"
  // that lacks meta tags and can cause runtime errors during prerender.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const slug = params.uid;
  const res = await API.graphql({
    query: lMSCoursesBySlug,
    variables: { slug: slug },
  });
  const course = res.data.lMSCoursesBySlug.items[0];

  if (!course) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: { course },
    revalidate: 10,
  };
}
