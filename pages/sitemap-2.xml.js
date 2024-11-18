import { Amplify, API, graphqlOperation } from 'aws-amplify';
import {
  listLessons,
  listCourses,
  listLMSCourses,
  listBlogs,
  listCareers,
} from '../src/graphql/queries';

const URL = 'https://packagingschool.com';

function generateSiteMap(lessons, courses) {
  function formatDate(date) {
    const convertedDate = new Date(date);
    const year = convertedDate.getFullYear();
    // getMonth() returns 0 for January, 11 for December, so we need to add 1
    const month = ('0' + (convertedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + convertedDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  console.log(formatDate(today));

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
         ${courses
           .map(({ slug, updatedAt, preview, title, subheadline }) => {
             return `
               <url>
                   <loc>${`${URL}/courses/${slug}`}</loc>
                   <lastmod>${formatDate(updatedAt)}</lastmod>
                   <video:video>
                    <video:content_loc>${preview}</video:content_loc>
                    <video:title>${title
                      .toString()
                      .replace(/&/g, 'and')}</video:title>
                    <video:description>${subheadline
                      .toString()
                      .replace(/&/g, 'and')}</video:description>
                    <video:uploader info="http://www.packagingschool.com">Packaging School</video:uploader>
                    <video:family_friendly>yes</video:family_friendly>
                    </video:video>
               </url>
             `;
           })
           .join('')}
           ${lessons
             .map(({ slug, updatedAt, media, title, subhead }) => {
               return `
                <url>
                    <loc>${`${URL}/courses/${slug}`}</loc>
                    <lastmod>${formatDate(updatedAt)}</lastmod>
                    <video:video>
                     <video:content_loc>${media}</video:content_loc>
                     <video:title>${title
                       .toString()
                       .replace(/&/g, 'and')}</video:title>
                     <video:description>${subhead
                       .toString()
                       .replace(/&/g, 'and')}</video:description>
                     <video:uploader info="http://www.packagingschool.com">Packaging School</video:uploader>
                     <video:family_friendly>yes</video:family_friendly>
                     </video:video>
                </url>
              `;
             })
             .join('')}
       </urlset>
     `;
}

export async function getServerSideProps({ res }) {
  const lessons = await API.graphql({
    query: listLessons,
    variables: {
      filter: { mediaType: { eq: 'VIDEO' }, status: { eq: 'PUBLISHED' } },
      limit: 500,
    },
  });

  const courses = await API.graphql({
    query: listLMSCourses,
    variables: {
      filter: {
        preview: { attributeExists: true },
        collection: { contains: 'null' },
      },
      limit: 500,
    },
  });

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(
    lessons.data.listLessons.items,
    courses.data.listLMSCourses.items
  );

  res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
