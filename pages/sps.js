import { useState } from 'react';
import Meta from '../components/shared/Meta';
import { generateMetadata } from '../libs/seo/generateMetadata';
import { buildBreadcrumbJsonLd } from '../libs/seo/organizationJsonLd';

const CONTACT_EMAIL = 'info@packagingschool.com';
const PAGE_PATH = '/sps';
const PAGE_TITLE = 'Southeastern Packaging Summit | Packaging School';
const PAGE_DESCRIPTION =
  'Southeastern Packaging Summit, April 19–20, 2027 at the Madren Conference Center at Clemson University. From the team behind AutoPack Summit.';

const metadata = generateMetadata({
  pageType: 'STATIC',
  pathname: PAGE_PATH,
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
});

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Southeastern Packaging Summit',
  description: PAGE_DESCRIPTION,
  startDate: '2027-04-19',
  endDate: '2027-04-20',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  url: 'https://packagingschool.com/sps',
  location: {
    '@type': 'Place',
    name: 'Madren Conference Center at Clemson University',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Clemson',
      addressRegion: 'SC',
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Packaging School',
    url: 'https://packagingschool.com',
  },
};

const interests = [
  { id: 'attend', label: 'Attend' },
  { id: 'sponsor', label: 'Sponsor' },
  { id: 'both', label: 'Both' },
];

export default function SoutheasternPackagingSummit() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'attend',
  });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus('saving');
    setMessage('');
    try {
      const response = await fetch('/api/sps/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || 'Could not save your request.');
      }
      setStatus('saved');
      setForm({ name: '', email: '', company: '', interest: 'attend' });
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <div className='sps-page'>
      <Meta
        title={metadata.title}
        description={metadata.description}
        url={PAGE_PATH}
        keywords='Southeastern Packaging Summit, packaging conference, Clemson University, AutoPack Summit, packaging sponsorship'
        structuredData={[
          eventJsonLd,
          buildBreadcrumbJsonLd(
            [{ name: 'Southeastern Packaging Summit', path: PAGE_PATH }],
            'https://packagingschool.com',
          ),
        ]}
      />
      <main className='sps-main'>
        <div className='sps-layout'>
        <div className='sps-copy'>
          <div className='sps-glow' aria-hidden='true' />
          <div className='sps-mark-plate'>
            <svg
              className='sps-mark'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='7.3 15.9 254.5 271.2'
              role='img'
              aria-label='Southeastern Packaging Summit'
            >
              <polygon
                fill='#15345e'
                fillRule='evenodd'
                points='255.8 100.62 255.8 211.1 195.18 246.1 134.56 281.1 73.93 246.1 13.31 211.1 13.31 100.62 120.45 162.47 134.56 228.88 148.63 162.49 255.8 100.62 255.8 100.62'
              />
              <path
                fill='#e54926'
                d='M195.85,130.96c-3.08-9.26-3.14-12.68-9.51-22.18-10.74-16.73-30.31-27.09-50.1-27.61h-.04c-.28,0-.56,0-.84-.01-.21,0-.41,0-.62,0h-.26c-.21,0-.41,0-.62,0-.28,0-.56,0-.84.01h-.04c-30.17.79-54.07,22.75-59.45,50.25l-14.54-8.39c3.32-13.11,10.11-25.52,20.37-35.78,30.34-30.34,79.53-30.34,109.88,0,10.26,10.26,17.04,22.67,20.37,35.78l-13.75,7.94ZM213.25,120.91c-3.14-14.71-10.43-28.72-21.86-40.15-31.53-31.53-82.66-31.53-114.2,0-11.43,11.43-18.71,25.44-21.86,40.15l-34.36-19.84c1.32-3.55,2.82-7.06,4.46-10.45.15-.3.3-.6.45-.9.56-1.14,1.52-1.89,2.77-2.15,1.24-.27,2.42.02,3.41.83.19.16.39.32.59.47,7.47,5.66,18.05,4.68,24.34-2.22,4.66-8.07,2.37-18.48-5.27-23.87-.2-.14-.41-.28-.61-.41-1.07-.69-1.7-1.73-1.82-2.99-.12-1.26.3-2.4,1.21-3.28,7.73-7.45,16.42-13.86,25.83-19.03.93-.51,1.87-1.01,2.81-1.49,1.13-.58,2.35-.61,3.5-.09,1.16.52,1.94,1.46,2.25,2.69.06.25.13.49.2.74,2.6,8.86,11.54,14.38,20.59,12.75,8.37-3.87,12.51-13.48,9.54-22.26-.08-.24-.16-.47-.25-.7-.46-1.19-.35-2.4.29-3.5,2.64-4.46,36.13-4.4,38.73,0,.65,1.09.75,2.31.29,3.5-.09.23-.17.46-.25.7-2.97,8.78,1.17,18.38,9.54,22.26,9.05,1.63,17.99-3.89,20.59-12.75.07-.24.14-.49.2-.74.31-1.23,1.09-2.17,2.25-2.69,5.57-2.52,28.62,17.21,32.14,20.61.92.88,1.34,2.02,1.21,3.28-.12,1.27-.75,2.3-1.82,2.99-.21.13-.42.27-.62.41-7.64,5.39-9.93,15.8-5.27,23.87,6.29,6.9,16.87,7.88,24.34,2.22.2-.15.4-.31.59-.47.98-.81,2.16-1.1,3.41-.83,1.24.27,2.2,1.01,2.76,2.15.15.3.3.6.44.91,1.31,2.7,2.52,5.46,3.62,8.25,0,.02.01.03.02.04l.08.19.36.92.28.74-34.88,20.14Z'
              />
              <path
                fill='#ec532f'
                d='M79.36,87.24c-10.26,10.26-17.04,22.67-20.37,35.78l14.54,8.39c5.38-27.5,29.28-49.45,59.45-50.25h.04c.28,0,.56,0,.84-.01.21,0,.41,0,.62,0h.26c.21,0,.41,0,.62,0,.28,0,.56,0,.84.01h.04c19.79.52,39.36,10.88,50.1,27.61,6.37,9.5,6.43,12.92,9.51,22.18l13.75-7.94c-3.32-13.11-10.11-25.52-20.37-35.78-30.34-30.34-79.53-30.34-109.88,0Z'
              />
              <path
                fill='#15345e'
                d='M247.49,99.11l-.08-.19s-.01-.03-.02-.04c-1.1-2.8-2.31-5.55-3.62-8.25-.15-.3-.29-.6-.44-.91-.56-1.14-1.52-1.89-2.76-2.15-1.24-.27-2.42.02-3.41.83-.2.16-.39.32-.59.47-7.47,5.66-18.05,4.68-24.34-2.22-4.66-8.07-2.37-18.48,5.27-23.87.2-.14.41-.28.62-.41,1.06-.69,1.69-1.73,1.82-2.99.12-1.26-.3-2.4-1.21-3.28-3.52-3.39-26.57-23.12-32.14-20.61-1.16.52-1.94,1.46-2.25,2.69-.06.25-.13.49-.2.74-2.6,8.86-11.54,14.38-20.59,12.75-8.37-3.87-12.51-13.48-9.54-22.26.08-.24.16-.47.25-.7.46-1.19.36-2.4-.29-3.5-2.6-4.4-36.09-4.46-38.73,0-.65,1.09-.75,2.31-.29,3.5.09.23.17.46.25.7,2.97,8.78-1.17,18.38-9.54,22.26-9.05,1.63-17.99-3.89-20.59-12.75-.07-.24-.14-.49-.2-.74-.31-1.23-1.09-2.17-2.25-2.69-1.16-.52-2.37-.49-3.5.09-.94.49-1.88.98-2.81,1.49-9.41,5.16-18.1,11.58-25.83,19.03-.91.88-1.33,2.02-1.21,3.28.12,1.27.75,2.3,1.82,2.99.21.13.41.27.61.41,7.64,5.39,9.93,15.8,5.27,23.87-6.29,6.9-16.87,7.88-24.34,2.22-.2-.15-.4-.31-.59-.47-.98-.81-2.16-1.1-3.41-.83-1.24.27-2.2,1.01-2.77,2.15-.15.3-.3.6-.45.9-1.65,3.39-3.14,6.9-4.46,10.45l34.36,19.84c3.14-14.71,10.43-28.72,21.86-40.15,31.53-31.53,82.66-31.53,114.2,0,11.43,11.43,18.71,25.44,21.86,40.15l34.88-20.14-.28-.74-.36-.92Z'
              />
            </svg>
          </div>
          <p className='sps-kicker'>A new industry event</p>
          <h1>Southeastern Packaging Summit</h1>
          <p className='sps-when'>April 19–20, 2027</p>
          <p className='sps-where'>
            Madren Conference Center at Clemson University
          </p>
          <p className='sps-tagline'>
            From the team producing{' '}
            <a href='https://autopacksummit.com'>AutoPackSummit.com</a> — a sold-out
            event for the past 10 years.
          </p>
          <p className='sps-contact'>
            Stay informed on details to sponsor or attend:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>

        <section className='sps-card'>
          {status === 'saved' ? (
            <div>
              <p className='sps-kicker'>You are on the list</p>
              <h2>We will be in touch.</h2>
              <p className='sps-note'>
                Details on attending and sponsoring will come to the email you
                shared.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className='sps-kicker'>Stay informed</p>
              <h2>Tell us how you want to take part.</h2>
              <label>
                Name
                <input
                  required
                  type='text'
                  value={form.name}
                  onChange={update('name')}
                  autoComplete='name'
                />
              </label>
              <label>
                Email
                <input
                  required
                  type='email'
                  value={form.email}
                  onChange={update('email')}
                  autoComplete='email'
                />
              </label>
              <label>
                Company
                <input
                  type='text'
                  value={form.company}
                  onChange={update('company')}
                  autoComplete='organization'
                />
              </label>
              <fieldset>
                <legend>I want to</legend>
                <div className='sps-choices'>
                  {interests.map((item) => (
                    <label key={item.id} className='sps-choice'>
                      <input
                        type='radio'
                        name='interest'
                        value={item.id}
                        checked={form.interest === item.id}
                        onChange={update('interest')}
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              {message ? <p className='sps-error'>{message}</p> : null}
              <button type='submit' disabled={status === 'saving'}>
                {status === 'saving' ? 'Sending...' : 'Keep me informed'}
              </button>
            </form>
          )}
        </section>
        </div>
      </main>
      <style jsx>{`
        .sps-page {
          position: relative;
          min-height: calc(100vh - 80px);
          overflow: hidden;
          background: linear-gradient(165deg, #071e36 0%, #0d3f6e 55%, #103050 100%);
          color: #f7f4ef;
        }
        .sps-copy {
          position: relative;
        }
        .sps-glow {
          position: absolute;
          width: 176px;
          height: 176px;
          left: 50%;
          top: -8px;
          margin-left: -88px;
          background: conic-gradient(
            from 40deg,
            #e05020,
            #f4aa00,
            #3ec6c6,
            #6a8cff,
            #e05020
          );
          filter: blur(42px);
          opacity: 0.75;
          animation: sps-spin 16s linear infinite;
          pointer-events: none;
        }
        .sps-main {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
          padding: 72px 24px 96px;
          text-align: center;
        }
        .sps-mark-plate {
          position: relative;
          z-index: 1;
          width: 136px;
          height: 136px;
          margin: 0 auto 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
        }
        .sps-mark {
          width: 100px;
          height: auto;
          display: block;
        }
        .sps-kicker {
          margin: 0 0 10px;
          color: #f0b27a;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        h1 {
          margin: 0;
          font-size: clamp(40px, 6vw, 68px);
          line-height: 0.95;
          font-weight: 650;
          letter-spacing: -0.03em;
        }
        h2 {
          margin: 0 0 18px;
          font-size: 28px;
          line-height: 1.2;
        }
        .sps-when {
          margin: 26px 0 0;
          color: #fff;
          font-size: 26px;
          font-weight: 650;
          letter-spacing: -0.02em;
        }
        .sps-where {
          margin: 6px auto 0;
          max-width: 560px;
          color: rgba(247, 244, 239, 0.88);
          font-size: 18px;
          font-weight: 500;
          line-height: 1.4;
        }
        .sps-tagline,
        .sps-contact,
        .sps-note {
          margin: 0 auto;
          max-width: 480px;
          color: rgba(247, 244, 239, 0.62);
          font-size: 16px;
          line-height: 1.55;
        }
        .sps-tagline {
          margin-top: 22px;
        }
        .sps-contact {
          margin-top: 8px;
          margin-bottom: 36px;
        }
        a {
          color: #fff;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
        }
        .sps-card {
          text-align: left;
          background: rgba(7, 24, 42, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: 28px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22);
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        label,
        legend {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
          font-weight: 650;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(247, 244, 239, 0.72);
        }
        input[type='text'],
        input[type='email'],
        input:not([type]) {
          height: 46px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.08);
          color: white;
          padding: 0 14px;
          font-size: 16px;
          text-transform: none;
          letter-spacing: 0;
          font-weight: 450;
        }
        fieldset {
          border: 0;
          margin: 0;
          padding: 0;
        }
        .sps-choices {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .sps-choice {
          flex-direction: row;
          align-items: center;
          gap: 8px;
          text-transform: none;
          letter-spacing: 0;
          font-size: 15px;
          font-weight: 550;
          color: white;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          padding: 8px 14px;
        }
        button {
          margin-top: 6px;
          height: 48px;
          border: 0;
          border-radius: 999px;
          background: #e05020;
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.7;
        }
        .sps-error {
          margin: 0;
          color: #ffd0c2;
        }
        @keyframes sps-spin {
          to {
            transform: rotate(360deg);
          }
        }
        @media (min-width: 960px) {
          .sps-main {
            max-width: 1120px;
            padding: 88px 40px 96px;
            text-align: left;
          }
          .sps-layout {
            display: grid;
            grid-template-columns: minmax(0, 1.15fr) minmax(340px, 0.85fr);
            gap: 72px;
            align-items: center;
          }
          .sps-mark-plate {
            margin: 0 0 22px;
          }
          .sps-glow {
            left: 0;
            margin-left: 0;
          }
          .sps-where,
          .sps-tagline,
          .sps-contact,
          .sps-note {
            margin-left: 0;
            margin-right: 0;
          }
          .sps-when {
            font-size: 28px;
          }
          .sps-contact {
            margin-bottom: 0;
          }
          h1 {
            font-size: 64px;
          }
        }
      `}</style>
    </div>
  );
}
