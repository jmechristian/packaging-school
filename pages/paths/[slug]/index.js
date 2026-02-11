import { getPathBySlug } from '../../../helpers/api';
import PathWrapper from '../../../components/paths/PathWrapper';
import Meta from '../../../components/shared/Meta';
import { generateMetadata } from '../../../libs/seo/generateMetadata';

const Page = ({ path }) => {
  const metadata = path
    ? generateMetadata({
        pageType: 'PATH',
        data: path,
        pathname: `/paths/${path.slug}`,
      })
    : generateMetadata({ pageType: 'STATIC', pathname: '/paths' });

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url={path?.slug ? `/paths/${path.slug}` : '/paths'}
      />
      <div>
        <PathWrapper path={path} />
      </div>
    </>
  );
};

export default Page;

// export const getStaticPaths = async () => {
//   const paths = await getPaths();
//   return {
//     paths: paths.map((path) => ({ params: { slug: path.slug } })),
//     fallback: false,
//   };
// };

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;
  const path = await getPathBySlug(slug);
  return {
    props: { path: path.items[0] },
  };
};
