import { API, graphqlOperation } from 'aws-amplify';
import {
  listLessons,
  listLMSCourses,
  listCareers,
  listCertificateObjects,
} from '../src/graphql/queries';

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

function generateSiteMap(lessons, courses, careers, certs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
         <url>
           <loc>${URL}</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/about</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
          <url>
           <loc>${URL}/acccsa</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
          <url>
           <loc>${URL}/all_courses</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/andrew</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/automotive-courses</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/automotive-faculty</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/cmpm-vs-cps</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/contact</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/cybermonday</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/edu</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/faq</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/food-packaging</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/glossary</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/isbt</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/library</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/pack-design-workshop-for-educators</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/packaging-events</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/packnotes</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/partner-with-us</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/sustainability-workshop</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/testimonials</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/your-company</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications/get-to-know-apc</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications/get-to-know-cmpm</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications/get-to-know-cps</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications/get-to-know-csp</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications/csp/syllabus</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         <url>
           <loc>${URL}/404</loc>
           <lastmod>${formatDate(new Date())}</lastmod>
         </url>
         ${lessons
           .map(({ slug, updatedAt }) => {
             return `
               <url>
                   <loc>${`${URL}/lessons/${slug}`}</loc>
                   <lastmod>${formatDate(updatedAt)}</lastmod>
               </url>
             `;
           })
           .join('')}
         ${courses
           .map(({ slug, updatedAt }) => {
             return `
               <url>
                   <loc>${`${URL}/courses/${slug}`}</loc>
                   <lastmod>${formatDate(updatedAt)}</lastmod>
               </url>
             `;
           })
           .join('')}
           ${careers
             .map(({ slug, updatedAt }) => {
               return `
                <url>
                    <loc>${`${URL}/careers/${slug}`}</loc>
                    <lastmod>${formatDate(updatedAt)}</lastmod>
                </url>
              `;
             })
             .join('')}
         ${certs
           .map(({ abbreviation, title, updatedAt }) => {
             const slug = abbreviation
               ? abbreviation.toLowerCase()
               : (title || 'cert').toLowerCase().replace(/\s+/g, '-');
             return `
               <url>
                   <loc>${`${URL}/certifications/${slug}`}</loc>
                   <lastmod>${formatDate(updatedAt)}</lastmod>
               </url>
             `;
           })
           .join('')}
       </urlset>
     `;
}

async function fetchAll(query, variables, path) {
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
}

export async function getServerSideProps({ res }) {
  const lessons = await fetchAll(
    listLessons,
    { filter: { status: { eq: 'PUBLISHED' } }, limit: 200 },
    ['listLessons']
  );

  const courses = await fetchAll(
    listLMSCourses,
    { filter: { collection: { contains: 'null' } }, limit: 200 },
    ['listLMSCourses']
  );

  const careers = await fetchAll(listCareers, { limit: 200 }, ['listCareers']);
  const certs = await fetchAll(
    listCertificateObjects,
    { filter: { status: { ne: 'DRAFT' } }, limit: 200 },
    ['listCertificateObjects']
  );

  const sitemap = generateSiteMap(lessons, courses, careers, certs);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
