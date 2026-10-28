import Meta from '../components/shared/Meta';
import { generateMetadata } from '../libs/seo/generateMetadata';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
} from '../libs/seo/organizationJsonLd';

export default function EmailPolicy() {
  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: '/email-policy',
    title: 'Email Policy',
    description:
      'The Packaging School does not advertise packagingschool.com with unsolicited email. We mail people who enrolled, purchased, or asked to hear from us.',
  });
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'Email Policy', path: '/email-policy' }],
    siteUrl,
  );

  return (
    <>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url='/email-policy'
        image='https://packschool.s3.us-east-1.amazonaws.com/default-seo.webp'
        structuredData={[organization, website, breadcrumb]}
      />
      <article className='bg-white'>
        <div className='mx-auto max-w-3xl px-6 py-16 sm:py-24'>
          <p className='text-sm font-medium text-gray-500'>
            The Packaging School
          </p>
          <h1 className='mt-2 text-3xl font-semibold tracking-tight text-gray-900'>
            Email Policy
          </h1>
          <p className='mt-4 text-sm text-gray-500'>
            Effective October 28, 2026
          </p>

          <div className='mt-10 space-y-8 text-base leading-7 text-gray-700'>
            <p>
              Packaging School LLC, which operates{' '}
              <a
                className='text-clemson underline'
                href='https://packagingschool.com'
              >
                packagingschool.com
              </a>
              , does not advertise this website, or any site we operate, with
              unsolicited email.
            </p>

            <section>
              <h2 className='text-xl font-semibold text-gray-900'>
                Who we email
              </h2>
              <p className='mt-3'>
                We send email only to a person who enrolled in a course,
                purchased from us, or asked to hear from us. Course and account
                notices go to the address on that account. Marketing messages
                go only to people who requested them.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900'>
                Addresses we do not use
              </h2>
              <p className='mt-3'>
                We do not buy, rent, scrape, or harvest email addresses. We do
                not send mail to a list whose owners have not asked to hear
                from The Packaging School.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900'>
                Other senders
              </h2>
              <p className='mt-3'>
                We do not allow affiliates, partners, or anyone else to
                advertise packagingschool.com in unsolicited messages. A
                message that advertises this site and that you did not ask for
                was not sent with our permission.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900'>
                Unsubscribe
              </h2>
              <p className='mt-3'>
                Every marketing message includes a working unsubscribe link.
                Using that link stops further marketing mail to that address.
                You can also write to{' '}
                <a
                  className='text-clemson underline'
                  href='mailto:info@packagingschool.com'
                >
                  info@packagingschool.com
                </a>{' '}
                and ask to be removed.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900'>
                Report a message
              </h2>
              <p className='mt-3'>
                If you received a message advertising The Packaging School that
                you did not request, forward it to{' '}
                <a
                  className='text-clemson underline'
                  href='mailto:info@packagingschool.com'
                >
                  info@packagingschool.com
                </a>
                . Include the full headers when you can.
              </p>
            </section>

            <section>
              <h2 className='text-xl font-semibold text-gray-900'>Contact</h2>
              <p className='mt-3'>
                Packaging School LLC
                <br />
                3620 Pelham Rd. 294
                <br />
                Greenville, South Carolina 29615
                <br />
                <a
                  className='text-clemson underline'
                  href='mailto:info@packagingschool.com'
                >
                  info@packagingschool.com
                </a>
                <br />
                864-412-5000
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
