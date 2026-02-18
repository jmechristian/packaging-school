import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      style={{
        scrollBehavior: 'smooth!important',
      }}
      lang='en'
    >
      <Head>
        <link rel='icon' type='image/svg' href='/favicon.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link rel='preconnect' href='https://www.googletagmanager.com' />
        <link rel='preconnect' href='https://static.hotjar.com' crossOrigin='' />
        <link
          rel='preload'
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
          as='style'
          onLoad="this.onload=null;this.rel='stylesheet'"
        />

        <noscript>
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
            rel='stylesheet'
          />
        </noscript>
        <meta
          name='google-site-verification'
          content='0J1SRWS-xIM_nHRIochuPhFVG-Yfa3lPy3Y7qoAsx8Y'
        />
      </Head>
      <body className='flex flex-col' id='home'>
        <Main />
        <NextScript />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5H8KXB9" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
      </body>
    </Html>
  );
}
