import { Amplify, API, graphqlOperation } from 'aws-amplify';
import {
  listLessons,
  listCourses,
  listLMSCourses,
  listBlogs,
  listCareers,
} from '../src/graphql/queries';

const URL = 'https://packagingschool.com';

function generateSiteMap(lessons, courses, articles, careers) {
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
       <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
         <url>
           <loc>${URL}</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/about</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
          <url>
           <loc>${URL}/acccsa</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
          <url>
           <loc>${URL}/all_courses</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/andrew</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/automotive-courses</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/automotive-faculty</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/cmpm-vs-cps</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/contact</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/cybermonday</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/edu</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/faq</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/food-packaging</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/isbt</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/library</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/pack-design-workshop-for-educators</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/packaging-events</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/packnotes</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/partner-with-us</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/sustainability-workshop</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/testimonials</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/your-company</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications/get-to-know-apc</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications/get-to-know-cmpm</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications/get-to-know-cps</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications/get-to-know-csp</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/certifications/csp/syllabus</loc>
           <lastmod>2024-03-06</lastmod>
         </url>
         <url>
           <loc>${URL}/404</loc>
           <lastmod>2024-03-06</lastmod>
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
           ${articles
             .map(({ slug, date }) => {
               return `
                <url>
                    <loc>${`${URL}/articles/${slug}`}</loc>
                    <lastmod>${formatDate(date)}</lastmod>
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
       </urlset>
     `;
}

export async function getServerSideProps({ res }) {
  const lessons = await API.graphql({
    query: listLessons,
    variables: { filter: { status: { eq: 'PUBLISHED' } }, limit: 500 },
  });

  const courses = await API.graphql({
    query: listLMSCourses,
    variables: { filter: { collection: { contains: 'null' } }, limit: 500 },
  });

  const getArticles = /* GraphQL */ `
    query MyQuery {
      listBlogs {
        items {
          id
          slug
          title
          content
          date
        }
      }
    }
  `;

  const articles = await API.graphql(graphqlOperation(getArticles));

  const careers = await API.graphql(graphqlOperation(listCareers));

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(
    lessons.data.listLessons.items,
    courses.data.listLMSCourses.items,
    articles.data.listBlogs.items,
    careers.data.listCareers.items
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
