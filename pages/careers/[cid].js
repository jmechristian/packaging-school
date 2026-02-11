import CareerFeature from '../../components/careers/CareerFeature';
import CareerHero from '../../components/careers/CareerHero';
import CareerAction from '../../components/careers/CareerAction';
import CareerCTA from '../../components/careers/CareerCTA';
import Meta from '../../components/shared/Meta';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsExports from '../../src/aws-exports';
import { generateMetadata } from '../../libs/seo/generateMetadata';

Amplify.configure(awsExports);

const Page = ({ career }) => {
  const metadata = career
    ? generateMetadata({
        pageType: 'CAREER',
        data: career,
        pathname: `/careers/${career.slug}`,
      })
    : generateMetadata({ pageType: 'STATIC', pathname: '/careers' });

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url={career?.slug ? `/careers/${career.slug}` : '/careers'}
        keywords='packaging, careers, careers in packaging'
      />
      <div className='w-full h-full relative flex flex-col mt-8'>
        <CareerHero
          title={career.title}
          altName={career.altName}
          media={career.media}
          subhead={career.subhead}
        />
        <CareerAction
          apcCopy={career.apcCopy}
          beverageCopy={career.beverageCopy}
          cmpmCopy={career.cmpmCopy}
          coreCopy={career.coreCopy}
          cpsCopy={career.cpsCopy}
          electiveCopy={career.electiveCopy}
          freeCopy={career.freeCopy}
        />
        <CareerFeature
          name={career.name}
          altName={career.altName}
          items={career.dayInLife.items}
        />
        <CareerCTA />
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const listCareers = /* GraphQL */ `
    query ListCareers {
      listCareers {
        items {
          id
          slug
        }
      }
    }
  `;

  try {
    const res = await API.graphql(graphqlOperation(listCareers));
    const career = await res.data.listCareers.items;
    const paths = career.map((less) => ({
      params: { cid: `${less.slug}` },
    }));
    console.log(paths);
    return { paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const { cid } = params;

  const getCareer = /* GraphQL */ `
    query MyQuery($slug: String!) {
      careersBySlug(slug: $slug) {
        items {
          altName
          apcCopy
          beverageCopy
          cmpmCopy
          coreCopy
          cpsCopy
          dayInLife {
            items {
              name
              desc
              icon
            }
          }
          electiveCopy
          freeCopy
          media
          slug
          subhead
          title
        }
      }
    }
  `;

  const variables = {
    slug: cid, // key is "input" based on the mutation above
  };

  const res = await API.graphql(graphqlOperation(getCareer, variables));
  const career = await res.data.careersBySlug.items[0];

  return { props: { career }, revalidate: 10 };
}

export default Page;
