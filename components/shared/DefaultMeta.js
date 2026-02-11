import { useRouter } from 'next/router';
import { generateMetadata } from '../../libs/seo/generateMetadata';
import Meta from './Meta';

/**
 * Default Meta rendered in _app.js for every page.
 * Provides pathname-derived title/description fallbacks so non-templated pages
 * always have metadata. Child pages that render their own Meta/Head override these.
 */
export default function DefaultMeta() {
  const router = useRouter();
  const asPath = router?.asPath ?? '';

  const metadata = generateMetadata({
    pageType: 'STATIC',
    pathname: asPath,
    title: undefined,
    description: undefined,
  });

  return (
    <Meta
      title={metadata.title}
      description={metadata.description}
      url={asPath.split('?')[0].split('#')[0] || '/'}
      robots={metadata.robots}
    />
  );
}
