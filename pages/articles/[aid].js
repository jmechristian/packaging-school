import React, { useEffect } from 'react';
import Head from 'next/head';

import { Amplify, API, graphqlOperation } from 'aws-amplify';

import awsExports from '../../src/aws-exports';
Amplify.configure(awsExports);

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_API_KEY = process.env.GRAPHQL_API_KEY;
import ArticleHeader from '../../components/articles/ArticleHeader';
import LessonsHeader from '../../components/lessons/LessonsHeader';
import SocialShare from '../../components/shared/SocialShare';
import ArticleContent from '../../components/articles/ArticleContent';
import ArticleMedia from '../../components/articles/ArticleMedia';
import RelatedCourses from '../../components/shared/RelatedCourses';
import Meta from '../../components/shared/Meta';

const Index = ({ article }) => {
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='title' content={article.title} />
        <meta
          name='description'
          content='The Packaging School brings together the business, art, and science of packaging so you can lead projects, optimize supply chains, increase margins, and develop sustainable solutions.'
        />
        <meta name='keywords' content='packaging, sustainability' />
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      {/* <Meta
        title={article.title}
        description={article.subhead}
        image={article.media}
      /> */}
      <div className='flex flex-col gap-12 pt-12 dark:bg-dark-dark'>
        <ArticleHeader
          title={article.title}
          subhead={''}
          date={article.date}
          author={article.author}
          id={article.id}
        />
        {article.media && (
          <div>
            <ArticleMedia
              media={article.media && article.media}
              title={article.title}
            />
          </div>
        )}
        <ArticleContent content={article.content} />
        <div>
          {article.relatedCourses && (
            <RelatedCourses relatedCourses={article.relatedCourses.items} />
          )}
          <SocialShare
            title={article.title}
            slug={article.slug}
            subhead={article.subhead ? article.subhead : ''}
            type='blog'
          />
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const query = /* GraphQL */ `
    query ListBlogs {
      listBlogs {
        items {
          id
          slug
        }
      }
    }
  `;

  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
  const GRAPHQL_API_KEY = process.env.GRAPHQL_API_KEY;

  try {
    const res = await API.graphql(graphqlOperation(query));
    const articles = await res.data.listBlogs.items;
    const paths = articles.map((less) => ({
      params: { aid: `${less.slug}` },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const { aid } = params;

  const getBlog = /* GraphQL */ `
    query MyQuery($slug: String!) {
      blogsBySlug(slug: $slug) {
        items {
          author
          content
          date
          media
          slug
          title
          id
        }
      }
    }
  `;

  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
  const GRAPHQL_API_KEY = process.env.GRAPHQL_API_KEY;

  const variables = {
    slug: aid, // key is "input" based on the mutation above
  };

  const res = await API.graphql(graphqlOperation(getBlog, variables));
  const article = await res.data.blogsBySlug.items[0];

  return { props: { article }, revalidate: 10 };
}

export default Index;
