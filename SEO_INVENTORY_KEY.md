# SEO Inventory CSV – Column Key

This key describes the columns in `SEO_INVENTORY.csv`.

- **Route**: The public URL path for the page as defined by the Next.js `pages/` file structure (dynamic segments appear like `[id]`).
- **File**: The source file in the repo that defines the route.
- **Render**:
  - **CSR/Static**: No `getStaticProps`/`getServerSideProps`; page content is rendered client-side (and/or at build as static JS/HTML scaffold).
  - **SSG/ISR**: Uses `getStaticProps` (often with `revalidate`) to statically generate HTML and periodically re-generate.
  - **SSR**: Uses `getServerSideProps` to generate HTML on every request.
- **Fallback**: Only relevant when the route uses `getStaticPaths`.
  - `blocking`: first request waits for full HTML generation (best for crawlers).
  - `true`: can serve a fallback shell while data loads (riskier for crawlers).
  - `false`: only the prebuilt paths exist.
- **Uses Meta**: Whether the page uses the shared `components/shared/Meta.js` component to emit SEO tags.
- **Meta passes url prop**: Whether the page explicitly passes a `url={...}` prop into `<Meta />`.
- **In sitemap-1**: Whether the route family is included in the general sitemap (`sitemap-1.xml`). For dynamic families (like lessons/courses), this is inferred based on the sitemap generator logic.
- **In sitemap-2**: Whether the route family is included in the video sitemap (`sitemap-2.xml`).
