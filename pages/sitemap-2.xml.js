import { API } from 'aws-amplify';
import { listLessons, listLMSCourses } from '../src/graphql/queries';

const URL = 'https://packagingschool.com';

function formatDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  const convertedDate = new Date(date);
  const year = convertedDate.getFullYear();
  // getMonth() returns 0 for January, 11 for December, so we need to add 1
  const month = ('0' + (convertedDate.getMonth() + 1)).slice(-2);
  const day = ('0' + convertedDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

function generateSiteMap(lessons, courses) {
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
                    <video:uploader info="https://packagingschool.com">Packaging School</video:uploader>
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
                    <loc>${`${URL}/lessons/${slug}`}</loc>
                    <lastmod>${formatDate(updatedAt)}</lastmod>
                    <video:video>
                     <video:content_loc>${media}</video:content_loc>
                     <video:title>${title
                       .toString()
                       .replace(/&/g, 'and')}</video:title>
                     <video:description>${subhead
                       .toString()
                       .replace(/&/g, 'and')}</video:description>
                     <video:uploader info="https://packagingschool.com">Packaging School</video:uploader>
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
  const fetchAll = async (query, variables, path) => {
    let items = [];
    let nextToken = null;
    do {
      const resp = await API.graphql({ query, variables: { ...variables, nextToken } });
      let page = resp.data;
      for (const key of path) page = page?.[key];
      items = items.concat(page?.items || []);
      nextToken = page?.nextToken || null;
    } while (nextToken);
    return items;
  };

  const lessons = await fetchAll(
    listLessons,
    { filter: { mediaType: { eq: 'VIDEO' }, status: { eq: 'PUBLISHED' } }, limit: 200 },
    ['listLessons']
  );

  const courses = await fetchAll(
    listLMSCourses,
    {
      filter: {
        preview: { attributeExists: true },
        collection: { contains: 'null' },
      },
      limit: 200,
    },
    ['listLMSCourses']
  );

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(
    lessons,
    courses
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
