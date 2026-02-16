import { API } from 'aws-amplify';
import {
  listLessons,
  listLMSCourses,
  listCareers,
} from '../src/graphql/queries';

const URL = 'https://packagingschool.com';

function isValidSlug(slug) {
  return (
    typeof slug === 'string' &&
    slug.length > 0 &&
    !slug.includes('[') &&
    !slug.includes(']') &&
    slug !== 'undefined' &&
    slug !== 'null'
  );
}

function formatDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  const convertedDate = new Date(date);
  const year = convertedDate.getFullYear();
  // getMonth() returns 0 for January, 11 for December, so we need to add 1
  const month = ('0' + (convertedDate.getMonth() + 1)).slice(-2);
  const day = ('0' + convertedDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

function generateSiteMap(lessons, courses, careers) {
  const today = formatDate(new Date());
  const entries = [];

  const staticUrls = [
    '/',
    '/about',
    '/acccsa',
    '/all_courses',
    '/andrew',
    '/automotive-courses',
    '/automotive-faculty',
    '/cmpm-vs-cps',
    '/contact',
    '/cybermonday',
    '/edu',
    '/faq',
    '/food-packaging',
    '/glossary',
    '/isbt',
    '/library',
    '/pack-design-workshop-for-educators',
    '/packaging-events',
    '/packnotes',
    '/partner-with-us',
    '/sustainability-workshop',
    '/testimonials',
    '/your-company',
    '/certifications/get-to-know-apc',
    '/certifications/get-to-know-cmpm',
    '/certifications/get-to-know-cps',
    '/certifications/get-to-know-csp',
    '/certifications/csp/syllabus',
    '/certifications',
  ];

  const seen = new Set();

  for (const path of staticUrls) {
    const loc = path === '/' ? URL : `${URL}${path}`;
    if (!seen.has(loc)) {
      seen.add(loc);
      entries.push({ loc, lastmod: today });
    }
  }

  for (const { slug, updatedAt } of lessons) {
    if (!isValidSlug(slug)) continue;
    const loc = `${URL}/lessons/${slug}`;
    if (!seen.has(loc)) {
      seen.add(loc);
      entries.push({ loc, lastmod: formatDate(updatedAt) });
    }
  }

  for (const { slug, updatedAt } of courses) {
    if (!isValidSlug(slug)) continue;
    const loc = `${URL}/courses/${slug}`;
    if (!seen.has(loc)) {
      seen.add(loc);
      entries.push({ loc, lastmod: formatDate(updatedAt) });
    }
  }

  for (const { slug, updatedAt } of careers) {
    if (!isValidSlug(slug)) continue;
    const loc = `${URL}/careers/${slug}`;
    if (!seen.has(loc)) {
      seen.add(loc);
      entries.push({ loc, lastmod: formatDate(updatedAt) });
    }
  }

  const urlEntries = entries
    .map(
      ({ loc, lastmod }) => `
       <url>
           <loc>${loc}</loc>
           <lastmod>${lastmod}</lastmod>
       </url>
     `
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
       <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
         ${urlEntries}
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

  const sitemap = generateSiteMap(lessons, courses, careers);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
