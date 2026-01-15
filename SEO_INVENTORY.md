# SEO Inventory (auto-generated)

Generated: 2026-01-15T10:24:17.732Z

## Executive summary (for SEO agency)
- **Framework**: Next.js (pages router) with shared SEO helper `components/shared/Meta.js` controlling `<title>`, meta description, OpenGraph, Twitter, and JSON-LD.
- **Critical crawler behavior**: Social bots + Google need meta tags in the **initial HTML** (not client-side hydration). Key dynamic templates were updated to use **`fallback: 'blocking'`** to avoid serving a JS-only fallback shell.
- **Canonical hostname is inconsistent today**:
  - `robots.txt` + `/api/sitemap-index` advertise **`https://www.packagingschool.com/...`**
  - sitemap generators (`pages/sitemap-1.xml.js`, `pages/sitemap-2.xml.js`) emit URLs using **`https://packagingschool.com`** (non-www)
  - `Meta` defaults to **`https://packagingschool.com`** unless `NEXT_PUBLIC_SITE_URL` is set
  - **Action**: pick ONE canonical host (www vs non-www), enforce with redirects, and align `robots.txt`, sitemap index, sitemap locs, and canonical tags.
- **Canonical + `og:url` only exist on pages that pass `url` to `<Meta />`**:
  - Many pages use `<Meta />` but do **not** provide `url`, so they emit no canonical link and no `og:url`.
  - **Action**: for all indexable templates (marketing pages, `/articles/*`, `/careers/*`, `/courses/*`, `/lessons/*`, `/collections/*`, `/<iid>`), pass `url` into `<Meta />`.
- **Sitemap coverage is partial by design**:
  - `sitemap-1.xml` includes: a fixed list of “marketing” pages + **PUBLISHED lessons** + **LMS courses (non-collections)** + **careers**.
  - It does **not** include `/<iid>` pages or `/collections/[uid]` (and articles look disabled/commented).
  - `sitemap-2.xml` is a **video sitemap** for video lessons and courses with previews.
  - **Action**: confirm which route families you *want indexed*; expand sitemap coverage accordingly.
- **Sitemap generation model**:
  - `sitemap-1.xml` and `sitemap-2.xml` are generated via **`getServerSideProps`** (computed on request).
  - `/api/sitemap-index` sets `<lastmod>` to “now” on every request.
  - **Action**: ensure caching/headers are sensible and avoid “always changing” signals unless intentional.

## Key SEO routes
- **Robots**: `public/robots.txt`
- **Sitemap index**: `pages/api/sitemap-index.js` → points to `pages/sitemap-1.xml.js` and `pages/sitemap-2.xml.js`
- **Primary SEO component**: `components/shared/Meta.js`
- **Course JSON-LD**: `libs/seo/courseJsonLd.js` (used by `pages/courses/[uid].js`)

## Sitemap architecture
- robots.txt points to `https://www.packagingschool.com/api/sitemap-index`
- `/api/sitemap-index` returns 2 sitemap parts: `sitemap-1.xml` (general) + `sitemap-2.xml` (video)
- Note: sitemap index uses **www**, while sitemap generators use `https://packagingschool.com` (non-www). Aligning canonical host is recommended.

## How pages are made crawlable
- Page metadata is primarily set via `components/shared/Meta.js` (title/description/OG/Twitter/canonical/JSON-LD).
- Social crawlers need tags in the *initial HTML*. Dynamic routes should use `fallback: "blocking"` (or SSR) to avoid a JS-only shell.

## Route inventory
Columns: render mode, `Meta` usage, whether `Meta` is given a `url` prop (canonical + og:url), and sitemap inclusion.

| Route | File | Render | Fallback | Uses Meta | Meta has url | In sitemap-1 | In sitemap-2 |
|---|---|---:|---:|---:|---:|---:|---:|
| `/` | `pages/index.js` | CSR/Static |  | Yes | No | Yes | No |
| `/[iid]` | `pages/[iid]/index.js` | SSG/ISR | 'blocking' | Yes | Yes | No | No |
| `/404` | `pages/404.js` | CSR/Static |  | Yes | No | Yes | No |
| `/about` | `pages/about.js` | CSR/Static |  | Yes | No | Yes | No |
| `/acccsa` | `pages/acccsa.js` | CSR/Static |  | Yes | No | Yes | No |
| `/acme` | `pages/acme.js` | SSR |  | No | No | No | No |
| `/after-sso` | `pages/after-sso.js` | CSR/Static |  | No | No | No | No |
| `/all_courses` | `pages/all_courses.js` | CSR/Static |  | Yes | No | Yes | No |
| `/all-access` | `pages/all-access/index.js` | CSR/Static |  | No | No | No | No |
| `/all-access-update` | `pages/all-access-update/index.js` | CSR/Static |  | No | No | No | No |
| `/alt/lessons/[id]` | `pages/alt/lessons/[id].js` | SSG/ISR | 'blocking' | Yes | Yes | No | No |
| `/andrew` | `pages/andrew.js` | CSR/Static |  | Yes | No | Yes | No |
| `/archived/cybermonday` | `pages/archived/cybermonday.js` | SSR |  | Yes | No | No | No |
| `/archived/cybermonday-24` | `pages/archived/cybermonday-24.js` | CSR/Static |  | Yes | No | No | No |
| `/articles/[aid]` | `pages/articles/[aid].js` | SSG/ISR | false | Yes | No | No | No |
| `/articles/brandon-hall-excellence-awards-2023` | `pages/articles/brandon-hall-excellence-awards-2023.js` | CSR/Static |  | No | No | No | No |
| `/automotive-courses` | `pages/automotive-courses.js` | CSR/Static |  | Yes | No | Yes | No |
| `/automotive-faculty` | `pages/automotive-faculty.js` | CSR/Static |  | Yes | No | Yes | No |
| `/careers/[cid]` | `pages/careers/[cid].js` | SSG/ISR | false | No | No | Yes | No |
| `/certificate-of-mastery-in-packaging-management` | `pages/certificate-of-mastery-in-packaging-management.js` | CSR/Static |  | Yes | No | No | No |
| `/certificate-of-packaging-science-application` | `pages/certificate-of-packaging-science-application.js` | CSR/Static |  | Yes | No | No | No |
| `/certifications` | `pages/certifications/index.js` | SSG/ISR |  | Yes | No | No | No |
| `/certifications/csp/syllabus` | `pages/certifications/csp/syllabus.js` | CSR/Static |  | No | No | Yes | No |
| `/certifications/get-to-know-apc` | `pages/certifications/get-to-know-apc.js` | SSR |  | Yes | No | Yes | No |
| `/certifications/get-to-know-cmpm` | `pages/certifications/get-to-know-cmpm.js` | CSR/Static |  | Yes | No | Yes | No |
| `/certifications/get-to-know-cps` | `pages/certifications/get-to-know-cps.js` | CSR/Static |  | Yes | No | Yes | No |
| `/certifications/get-to-know-csp` | `pages/certifications/get-to-know-csp.js` | CSR/Static |  | Yes | No | Yes | No |
| `/church-and-dwight` | `pages/church-and-dwight/index.js` | CSR/Static |  | No | No | No | No |
| `/church-and-dwight-spc` | `pages/church-and-dwight-spc/index.js` | CSR/Static |  | No | No | No | No |
| `/cmpm-application-confirmation` | `pages/cmpm-application-confirmation.js` | CSR/Static |  | Yes | No | No | No |
| `/cmpm-custom-development-plan-registration` | `pages/cmpm-custom-development-plan-registration.js` | CSR/Static |  | Yes | No | No | No |
| `/cmpm-epr` | `pages/cmpm-epr/index.js` | CSR/Static |  | No | No | No | No |
| `/cmpm-student-apply` | `pages/cmpm-student-apply.js` | CSR/Static |  | Yes | No | No | No |
| `/cmpm-vs-cps` | `pages/cmpm-vs-cps.js` | CSR/Static |  | Yes | No | Yes | No |
| `/cohorts` | `pages/cohorts/index.js` | CSR/Static |  | No | No | No | No |
| `/collections/[uid]` | `pages/collections/[uid].js` | SSG/ISR | 'blocking' | Yes | Yes | No | No |
| `/complete-profile` | `pages/complete-profile.js` | CSR/Static |  | No | No | No | No |
| `/contact` | `pages/contact.js` | CSR/Static |  | Yes | No | Yes | No |
| `/continue-certificate-of-mastery-in-packaging-management` | `pages/continue-certificate-of-mastery-in-packaging-management.js` | CSR/Static |  | Yes | No | No | No |
| `/continue-certificate-of-packaging-science` | `pages/continue-certificate-of-packaging-science.js` | CSR/Static |  | Yes | No | No | No |
| `/corporate-login` | `pages/corporate-login.js` | CSR/Static |  | No | No | No | No |
| `/courses/[uid]` | `pages/courses/[uid].js` | SSG/ISR | 'blocking' | Yes | Yes | Yes | Yes |
| `/courses/categories/[cat]` | `pages/courses/categories/[cat].js` | CSR/Static |  | Yes | No | Yes | Yes |
| `/courses/sustainable-packaging-with-cory-connors` | `pages/courses/sustainable-packaging-with-cory-connors.js` | SSR |  | Yes | No | Yes | Yes |
| `/cps-application-confirmation` | `pages/cps-application-confirmation.js` | CSR/Static |  | Yes | No | No | No |
| `/cps-student-apply` | `pages/cps-student-apply.js` | CSR/Static |  | Yes | No | No | No |
| `/cummins` | `pages/cummins/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum` | `pages/curriculum/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]` | `pages/curriculum/[cirriculumid]/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]/[courseid]` | `pages/curriculum/[cirriculumid]/[courseid]/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]/[courseid]/[lessonid]` | `pages/curriculum/[cirriculumid]/[courseid]/[lessonid]/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]/[courseid]/branding-basics` | `pages/curriculum/[cirriculumid]/[courseid]/branding-basics/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]/[courseid]/branding-basics/brand-development-lab` | `pages/curriculum/[cirriculumid]/[courseid]/branding-basics/brand-development-lab/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]/[courseid]/branding-basics/color-theory-and-symbolism` | `pages/curriculum/[cirriculumid]/[courseid]/branding-basics/color-theory-and-symbolism/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]/[courseid]/branding-basics/conclusion-and-bonus-content` | `pages/curriculum/[cirriculumid]/[courseid]/branding-basics/conclusion-and-bonus-content/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]/[courseid]/branding-basics/introduction-to-branding-basics` | `pages/curriculum/[cirriculumid]/[courseid]/branding-basics/introduction-to-branding-basics/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]/[courseid]/branding-basics/style-guide-lab` | `pages/curriculum/[cirriculumid]/[courseid]/branding-basics/style-guide-lab/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]/[courseid]/branding-basics/trademark-and-copyright` | `pages/curriculum/[cirriculumid]/[courseid]/branding-basics/trademark-and-copyright/index.js` | CSR/Static |  | No | No | No | No |
| `/curriculum/[cirriculumid]/[courseid]/branding-basics/typography` | `pages/curriculum/[cirriculumid]/[courseid]/branding-basics/typography/index.js` | CSR/Static |  | No | No | No | No |
| `/cybermonday` | `pages/cybermonday/index.js` | CSR/Static |  | Yes | No | Yes | No |
| `/dev/store` | `pages/dev/store/index.js` | CSR/Static |  | No | No | No | No |
| `/dev/store/cart/[id]` | `pages/dev/store/cart/[id]/index.js` | CSR/Static |  | No | No | No | No |
| `/dev/store/checkout/[id]` | `pages/dev/store/checkout/[id]/index.js` | CSR/Static |  | No | No | No | No |
| `/dev/store/order-confirmation/[id]` | `pages/dev/store/order-confirmation/[id]/index.js` | SSR |  | No | No | No | No |
| `/dev/store/products/[id]` | `pages/dev/store/products/[id].js` | CSR/Static |  | No | No | No | No |
| `/dev/sub` | `pages/dev/sub/index.js` | CSR/Static |  | No | No | No | No |
| `/drafts/lessons/[id]` | `pages/drafts/lessons/[id].js` | SSG/ISR | true | Yes | Yes | No | No |
| `/dvi` | `pages/dvi/index.js` | CSR/Static |  | No | No | No | No |
| `/edu` | `pages/edu.js` | CSR/Static |  | Yes | No | Yes | No |
| `/enroll/[id]` | `pages/enroll/[id].js` | SSR |  | No | No | No | No |
| `/events/aps-2024` | `pages/events/aps-2024.js` | SSR |  | Yes | No | No | No |
| `/events/aps-2025` | `pages/events/aps-2025.js` | SSR | true | Yes | No | No | No |
| `/express-signin` | `pages/express-signin/index.js` | CSR/Static |  | No | No | No | No |
| `/external-redirect` | `pages/external-redirect.js` | CSR/Static |  | No | No | No | No |
| `/faq` | `pages/faq.js` | SSR |  | Yes | No | Yes | No |
| `/food-packaging` | `pages/food-packaging.js` | CSR/Static |  | Yes | No | Yes | No |
| `/form-thank-you` | `pages/form-thank-you.js` | CSR/Static |  | Yes | No | No | No |
| `/forms/automotive-form` | `pages/forms/automotive-form.js` | CSR/Static |  | No | No | No | No |
| `/forms/certificate-of-packaging-science-application` | `pages/forms/certificate-of-packaging-science-application.js` | CSR/Static |  | No | No | No | No |
| `/forms/client-satisfaction-survey` | `pages/forms/client-satisfaction-survey.js` | CSR/Static |  | No | No | No | No |
| `/forms/cmpm/[fid]` | `pages/forms/cmpm/[fid].js` | CSR/Static |  | No | No | No | No |
| `/forms/cmpm/icpf/[fid]` | `pages/forms/cmpm/icpf/[fid].js` | CSR/Static |  | No | No | No | No |
| `/forms/cps/[fid]` | `pages/forms/cps/[fid].js` | CSR/Static |  | No | No | No | No |
| `/forms/food-packaging-certificate-interest-form` | `pages/forms/food-packaging-certificate-interest-form.js` | CSR/Static |  | Yes | No | No | No |
| `/forms/food-packaging-sponsor-form` | `pages/forms/food-packaging-sponsor-form.js` | CSR/Static |  | Yes | No | No | No |
| `/forms/pgsf/[fid]` | `pages/forms/pgsf/[fid].js` | CSR/Static |  | No | No | No | No |
| `/forms/sales-bootcamp-registration` | `pages/forms/sales-bootcamp-registration.js` | CSR/Static |  | Yes | No | No | No |
| `/forms/scholarship-application-form` | `pages/forms/scholarship-application-form.js` | CSR/Static |  | Yes | No | No | No |
| `/fpa` | `pages/fpa/index.js` | CSR/Static |  | No | No | No | No |
| `/greenblue` | `pages/greenblue.js` | SSR |  | No | No | No | No |
| `/icpf` | `pages/icpf/index.js` | CSR/Static |  | Yes | No | No | No |
| `/india` | `pages/india.js` | CSR/Static |  | Yes | No | No | No |
| `/isbt` | `pages/isbt.js` | SSR |  | Yes | No | Yes | No |
| `/lessons` | `pages/lessons/index.js` | CSR/Static |  | No | No | No | No |
| `/lessons/[id]` | `pages/lessons/[id].js` | SSG/ISR | 'blocking' | Yes | Yes | Yes | Yes |
| `/libraries/[id]` | `pages/libraries/[id].js` | SSG/ISR | false | No | No | No | No |
| `/library` | `pages/library.js` | CSR/Static |  | Yes | No | Yes | No |
| `/login` | `pages/login/index.js` | CSR/Static |  | No | No | No | No |
| `/mexico` | `pages/mexico.js` | CSR/Static |  | Yes | No | No | No |
| `/order/[oid]` | `pages/order/[oid]/index.js` | SSR |  | No | No | No | No |
| `/pack-design-workshop-for-educators` | `pages/pack-design-workshop-for-educators.js` | CSR/Static |  | Yes | No | Yes | No |
| `/packaging-events` | `pages/packaging-events.js` | CSR/Static |  | Yes | No | Yes | No |
| `/packnotes` | `pages/packnotes.js` | CSR/Static |  | Yes | No | Yes | No |
| `/partner-with-us` | `pages/partner-with-us.js` | CSR/Static |  | Yes | No | Yes | No |
| `/partner/[id]` | `pages/partner/[id]/index.js` | CSR/Static |  | No | No | No | No |
| `/password-reset-success` | `pages/password-reset-success.js` | CSR/Static |  | No | No | No | No |
| `/paths` | `pages/paths/index.js` | CSR/Static |  | No | No | No | No |
| `/paths/[slug]` | `pages/paths/[slug]/index.js` | CSR/Static | false | No | No | No | No |
| `/paths/draft/[slug]` | `pages/paths/draft/[slug]/index.js` | CSR/Static | false | No | No | No | No |
| `/payment/confirmation` | `pages/payment/confirmation/index.js` | CSR/Static |  | No | No | No | No |
| `/pda` | `pages/pda.js` | SSR |  | No | No | No | No |
| `/pgsf` | `pages/pgsf/index.js` | CSR/Static |  | Yes | No | No | No |
| `/pgsf-application-confirmation` | `pages/pgsf-application-confirmation.js` | CSR/Static |  | Yes | No | No | No |
| `/presale/food-packaging-certificate-packaging-and-preservation` | `pages/presale/food-packaging-certificate-packaging-and-preservation.js` | CSR/Static |  | No | No | No | No |
| `/profile` | `pages/profile/index.js` | CSR/Static |  | No | No | No | No |
| `/pxp` | `pages/pxp/index.js` | CSR/Static |  | No | No | No | No |
| `/registration-confirmation` | `pages/registration-confirmation.js` | CSR/Static |  | Yes | No | No | No |
| `/sales-bootcamp` | `pages/sales-bootcamp.js` | CSR/Static |  | Yes | No | No | No |
| `/sales-bootcamp-registration-page` | `pages/sales-bootcamp-registration-page.js` | CSR/Static |  | Yes | No | No | No |
| `/sandbox` | `pages/sandbox/index.js` | CSR/Static |  | No | No | No | No |
| `/sandbox/auth` | `pages/sandbox/auth/index.js` | CSR/Static |  | No | No | No | No |
| `/sandbox/demos` | `pages/sandbox/demos/index.js` | CSR/Static |  | No | No | No | No |
| `/sandbox/form` | `pages/sandbox/form/index.js` | CSR/Static |  | No | No | No | No |
| `/sandbox/profile` | `pages/sandbox/profile/index.js` | CSR/Static |  | No | No | No | No |
| `/sandbox/word-cloud` | `pages/sandbox/word-cloud/index.js` | CSR/Static |  | No | No | No | No |
| `/schwarzpartners` | `pages/schwarzpartners/index.js` | CSR/Static |  | No | No | No | No |
| `/sso-prepare` | `pages/sso-prepare.js` | CSR/Static |  | No | No | No | No |
| `/subscribe` | `pages/subscribe.js` | CSR/Static |  | Yes | No | No | No |
| `/subscribed` | `pages/subscribed.js` | CSR/Static |  | No | No | No | No |
| `/sustainability-workshop` | `pages/sustainability-workshop.js` | CSR/Static |  | Yes | No | Yes | No |
| `/testimonials` | `pages/testimonials.js` | CSR/Static |  | Yes | No | Yes | No |
| `/unilever` | `pages/unilever.js` | SSR |  | No | No | No | No |
| `/unilever-light` | `pages/unilever-light.js` | SSR |  | No | No | No | No |
| `/your-company` | `pages/your-company.js` | CSR/Static |  | No | No | Yes | No |

## Sitemap-1 contents (implementation notes)
- `sitemap-1.xml` is generated at request time via `getServerSideProps` and includes:
  - Static routes hard-coded in `pages/sitemap-1.xml.js` (28 entries)
  - Lessons: Yes (PUBLISHED)
  - Courses: Yes (LMS courses where collection contains "null")
  - Careers: Yes
  - Articles: No (looks currently disabled/commented)

## Sitemap-2 contents (video sitemap)
- `sitemap-2.xml` is generated at request time via `getServerSideProps` and includes video entries for:
  - Video courses (preview exists): Yes
  - Video lessons (mediaType=VIDEO): Yes

## Suggested follow-ups for SEO agency
- Confirm canonical hostname (www vs non-www) and ensure redirects + canonical tags + sitemaps are consistent.
- Ensure key indexable templates pass `url` to `Meta` (so canonical + og:url are present).
- Consider adding missing route families to sitemaps if you want them indexed (e.g., `/collections/[uid]`, `/<iid>` index pages, articles if applicable).