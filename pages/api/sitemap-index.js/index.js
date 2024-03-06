export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
          <loc>https://www.packagingschool.com/sitemap-1.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
      <sitemap>
          <loc>https://www.packagingschool.com/sitemap-2.xml</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
  </sitemapindex>`);
  res.end();
}
