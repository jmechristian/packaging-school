import { getPaths, getPathBySlug } from '../../../helpers/api';
import PathWrapper from '../../../components/paths/PathWrapper';

const Page = ({ path }) => {
  return (
    <div>
      <PathWrapper path={path} />
    </div>
  );
};

export default Page;

export const getStaticPaths = async () => {
  const paths = await getPaths();
  return {
    paths: paths.map((path) => ({ params: { slug: path.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const path = await getPathBySlug(slug);
  return {
    props: { path: path.items[0] },
  };
};
